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
) => () =>
  Object.entries<any>(errorsCollector)
    .map(([key, validators]) => [
      key,
      Array.isArray(validators)
        ? validators.map((validate) => validate(data[key as keyof T], data))
        : validators(data[key as keyof T], data),
    ])
    .filter(([, result]) => !isValid(result))
    .map(([key, value]) => ({
      [key]: value,
    }))
    .reduce((acc, partialError) => {
      Object.assign(acc, partialError);
      return acc;
    }, {});

const isValid = (results: ValueValidationResult | ValueValidationResult[]) => {
  if (Array.isArray(results))
    return results.filter((msg) => msg !== true).length === 0;
  return results === true;
};
