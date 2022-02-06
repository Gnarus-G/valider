export type Errors<T> = Partial<Record<keyof T, string | string[]>>;

type ValueValidationResult = true | string;
type ValueValidator<V, D> = (value: V, data: D) => ValueValidationResult;
type ValueValidators<V, D> = ValueValidator<V, D> | Array<ValueValidator<V, D>>;
type ValidationStatesCollector<D> = {
  [Key in keyof D]?: ValueValidators<D[Key], D>;
};
type Predicate<V, D> = (value: V, data: D) => boolean;

export const validate = <V, D>(
  predicate: Predicate<V, D>,
  msg: string
): ValueValidator<V, D> => (value, data: D) => predicate(value, data) || msg;

export const valider = <T>(
  data: T,
  errorsCollector: ValidationStatesCollector<T>
) => (callbacks?: Callbacks<T>): Errors<T> =>
  withCallbacks(
    Object.entries<any>(errorsCollector)
      .map<[string, ValueValidationResult | ValueValidationResult[]]>(
        ([key, validators]) => [
          key,
          Array.isArray(validators)
            ? validators
                .map((validate) => validate(data[key as keyof T], data))
                .filter((msg) => msg !== true)
            : validators(data[key as keyof T], data),
        ]
      )
      .filter(([, result]) => !isValid(result))
      .map<object>(([key, value]) => ({
        [key]: value,
      }))
      .reduce((acc, partialError) => {
        Object.assign(acc, partialError);
        return acc;
      }, {}),
    callbacks
  );

const isValid = (results: ValueValidationResult | ValueValidationResult[]) => {
  if (Array.isArray(results)) return results.length === 0;
  return results === true;
};

type Callbacks<T> = {
  onSuccess(): void;
  onErrors(errors: Errors<T>): void;
};

const withCallbacks = <T>(
  errors: Errors<T>,
  callbacks?: Callbacks<T>
): Errors<T> => {
  if (Object.keys(errors).length === 0) callbacks?.onSuccess();
  else callbacks?.onErrors(errors);
  return errors;
};
