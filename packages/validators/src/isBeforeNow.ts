import { validate } from "@valider/core";

const isBeforeNow = (msg: string) =>
  validate((value: Date) => value.getTime() < Date.now(), msg);

export default isBeforeNow;
