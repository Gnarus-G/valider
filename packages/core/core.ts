type ValidationState = string | boolean;
type ValueValidator<T> = (value: T) => ValidationState;
type ValueValidators<T> = ValueValidator<T> | Array<ValueValidator<T>>;
type ValidationStatesCollector<Data> = {
  [Key in keyof Data]?: ValueValidators<Data[Key]>;
};
type Predicate<T = any> = (value: T) => boolean;

export const validate =
  <T>(predicate: Predicate<T>, msg: string): ValueValidator<T> =>
  (value) =>
    predicate(value) || msg;

export const collectValidationState =
  <T>(data: T, errorsCollector: ValidationStatesCollector<T>) =>
  () =>
    Object.entries<any>(errorsCollector)
      .map(([key, validators]) => ({
        [key]: Array.isArray(validators)
          ? validators.map((validate) => validate(data[key as keyof T]))
          : validators(data[key as keyof T]),
      }))
      .reduce((acc, partialError) => {
        Object.assign(acc, partialError);
        return acc;
      }, {});
