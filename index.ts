import {
  DataValidator,
  ErrorsCollectors,
  minLength,
  required,
  validate,
  validateValue,
} from "./validators";

const data = {
  username: "",
  password: "asdasdasdfasdffs",
  date: new Date(),
};

const withValidators =
  <T>(data: T, validators: Array<DataValidator<T>>) =>
  () =>
    validators
      .map((validate) => validate(data))
      .reduce((acc, partialError) => {
        Object.assign(acc, partialError);
        return acc;
      }, {});

const collectErrors =
  <T>(data: T, errorsCollector: ErrorsCollectors<T>) =>
  () =>
    Object.entries<any>(errorsCollector)
      .map(([key, validators]) => ({
        [key]: Array.isArray(validators)
          ? validators.map((validate) => validate(data[key]))
          : validators(data[key]),
      }))
      .reduce((acc, partialError) => {
        Object.assign(acc, partialError);
        return acc;
      }, {});

let validateData = withValidators(data, [
  required(["username", "password", "date"], "needed"),
  minLength(["username", "password", "date"], 8, "at least 8 characters"),
  validate(
    "date",
    "should be before now",
    (date: Date) => date.getTime() < Date.now()
  ),
]);

console.log(validateData());

const isRequired = validateValue((value) => !!value, "required");
const isBeforeNow = validateValue(
  (value: Date) => value.getTime() < Date.now(),
  "should be before now"
);

validateData = collectErrors(data, {
  username: [isRequired],
  password: isRequired,
  date: [
    isRequired,
    validateValue((date) => date.getTime() > Date.now(), "should be after now"),
    isBeforeNow,
  ],
});

console.log(validateData());
