import { validate } from "@valider/core";

const isAfterNow = (msg: string) =>
  validate((value: Date) => value.getTime() > Date.now(), msg);

export default isAfterNow;
