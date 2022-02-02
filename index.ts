import { Errors, minLength, required, validate } from "./validators";

const data = {
  username: "",
  password: "asdasdasdfasdffs",
  date: new Date(),
};

const withValidators =
  <T>(data: T, validators: Array<(data: T) => Errors<T>>) =>
  () =>
    validators
      .map((validate) => validate(data))
      .reduce((acc, partialError) => {
        Object.assign(acc, partialError);
        return acc;
      }, {});

let validateData = withValidators(data, [
  required(["username", "password", "date"], "needed"),
  minLength(["username", "password", "date"], 8, "at least 8 characters"),
  validate("date", "before now", (date: Date) => date.getTime() < Date.now() + 1),
]);

console.log(validateData());
