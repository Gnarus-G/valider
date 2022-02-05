import { validate } from "@valider/core";
import isEmailValidator from "validator/lib/isEmail";

export default function isEmail(msg: string) {
  return validate((value: string) => isEmailValidator(value), msg);
}
