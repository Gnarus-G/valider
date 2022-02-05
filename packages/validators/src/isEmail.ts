import { validate } from "@valider/core";
import isEmailValidator from "validator/es/lib/isEmail";

export default function isEmail(msg: string) {
  return validate((value: string) => isEmailValidator(value), msg);
}
