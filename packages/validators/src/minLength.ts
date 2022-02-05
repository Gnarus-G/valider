import { validate } from "@valider/core";

const minLength = (min: number, msg: string) =>
  validate((value: string) => value.length >= min, msg);

export default minLength;
