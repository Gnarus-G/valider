type ValidationState = string | boolean;
type ValueValidator<T> = (value: T) => ValidationState;
type ValidationStatesCollector<Data> = {
  [Key in keyof Data]:
    | ValueValidator<Data[Key]>
    | Array<ValueValidator<Data[Key]>>;
};
type Predicate<T = any> = (value: T) => boolean;

export const validate =
  <T>(predicate: Predicate<T>, msg?: string): ValueValidator<T> =>
  (value: T) => {
    return predicate(value) || msg;
  };

export const collectValidationState =
  <T>(data: T, errorsCollector: ValidationStatesCollector<T>) =>
  () =>
    Object.entries<any>(errorsCollector)
      .map(([key, validators]) => ({
        [key]: Array.isArray(validators)
          ? validators.map((validate) => validate(data[key]))
          : validators(data[key]),
      }))
      .reduce((acc, partialError) => {
        Object.assign(acc, partialError);
        return acc;
      }, {});
