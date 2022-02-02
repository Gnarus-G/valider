import { validate } from "./core";

export const isRequired = validate((value) => !!value, "required");

export const isBeforeNow = validate(
  (value: Date) => value.getTime() < Date.now(),
  "should be before now"
);
