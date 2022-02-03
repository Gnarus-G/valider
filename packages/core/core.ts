type ValidationState = string | boolean;
type ValueValidator<V, D> = (value: V, data: D) => ValidationState;
type ValueValidators<V, D> = ValueValidator<V, D> | Array<ValueValidator<V, D>>;
type ValidationStatesCollector<D> = {
  [Key in keyof D]?: ValueValidators<D[Key], D>;
};
type Predicate<V, D> = (value: V, data: D) => boolean;

export const validate =
  <V, D>(predicate: Predicate<V, D>, msg: string): ValueValidator<V, D> =>
  (value, data: D) =>
    predicate(value, data) || msg;

export const collectValidationState =
  <T>(data: T, errorsCollector: ValidationStatesCollector<T>) =>
  () =>
    Object.entries<any>(errorsCollector)
      .map(([key, validators]) => ({
        [key]: Array.isArray(validators)
          ? validators.map((validate) => validate(data[key as keyof T], data))
          : validators(data[key as keyof T], data),
      }))
      .reduce((acc, partialError) => {
        Object.assign(acc, partialError);
        return acc;
      }, {});
