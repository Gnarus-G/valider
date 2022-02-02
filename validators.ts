export type Errors<T> = Partial<Record<keyof T, string | true>>;
export type Validator<T> = (data: T) => Errors<T>;
type Keys<T> = keyof T | Array<keyof T>;
type Predicate = (value: any) => boolean;

export const required = <T>(key: Keys<T>, msg?: string) =>
  validate(key, msg, (value) => !!value);

export const minLength = <T>(key: Keys<T>, min: number, msg: string) =>
  validate(key, msg, (value: string) => value.length >= min);

export const validate =
  <T>(keyOrKeys: Keys<T>, msg: string, predicate: Predicate): Validator<T> =>
  (data) => {
    if (Array.isArray(keyOrKeys))
      return keyOrKeys
        .filter((k) => !predicate(data[k]))
        .reduce((acc, k) => {
          acc[k] = msg || true;
          return acc;
        }, {} as Errors<T>);

    return {
      [keyOrKeys]: predicate(data[keyOrKeys]) || msg || true,
    } as Errors<T>;
  };
