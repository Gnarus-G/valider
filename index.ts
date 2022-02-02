import { collectErrors, validate } from "./core";
import { isBeforeNow, isRequired } from "./validators";

const data = {
  username: "",
  password: "asdasdasdfasdffs",
  date: new Date(),
};

const validateData = collectErrors(data, {
  username: [isRequired],
  password: isRequired,
  date: [
    isRequired,
    validate((date) => date.getTime() > Date.now(), "should be after now"),
    isBeforeNow,
  ],
});

console.log(validateData());
