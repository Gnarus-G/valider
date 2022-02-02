import { collectValidationState } from "./core";
import { isBeforeNow, isRequired, minLength } from "./validators";

const data = {
  username: "",
  password: "asdf",
  date: new Date(),
};

const validateData = collectValidationState(data, {
  username: [isRequired("username is required")],
  password: minLength(8, "password should be at least 8 characters"),
  date: [isRequired("date is required"), isBeforeNow("should be before now")],
});

console.log(validateData());
