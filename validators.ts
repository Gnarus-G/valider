type ValidationState = string | boolean;
export type ValidatedValues<T> = Partial<Record<keyof T, ValidationState>>;
export type DataValidator<T> = (data: T) => ValidatedValues<T>;
export type ValueValidator<T> = (value: T) => ValidationState;
export type ErrorsCollectors<Data> = {
  [Key in keyof Data]:
    | ValueValidator<Data[Key]>
    | Array<ValueValidator<Data[Key]>>;
};
type Keys<T> = keyof T | Array<keyof T>;
type Predicate<T = any> = (value: T) => boolean;

export const required = <T>(key: Keys<T>, msg?: string) =>
  validate(key, msg, (value) => !!value);

export const minLength = <T>(key: Keys<T>, min: number, msg: string) =>
  validate(key, msg, (value: string) => value.length >= min);

export const validate =
  <T>(
    keyOrKeys: Keys<T>,
    msg: string,
    predicate: Predicate
  ): DataValidator<T> =>
  (data) => {
    if (Array.isArray(keyOrKeys))
      return keyOrKeys
        .filter((k) => !predicate(data[k]))
        .reduce((acc, k) => {
          acc[k] = msg || true;
          return acc;
        }, {} as ValidatedValues<T>);

    return {
      [keyOrKeys]: predicate(data[keyOrKeys]) || msg || true,
    } as ValidatedValues<T>;
  };

export const validateValue =
  <T>(predicate: Predicate<T>, msg?: string) =>
  (value: T) => {
    return predicate(value) || msg;
  };
