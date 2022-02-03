import { collectValidationState, validate } from "./core";

describe("core functions", () => {
  const data = {
    field: "value",
    otherField: new Date(),
  };

  it("injects the right value in the validate function", () => {
    const validateData = collectValidationState(data, {
      field: validate((value) => {
        expect(typeof value).toBe("string");
        expect(value).toBe(data.field);
        return true;
      }, "error message"),
      otherField: validate((value) => {
        expect(value).toBeInstanceOf(Date);
        expect(value).toBe(data.otherField);
        return true;
      }, "a message"),
    });

    validateData();
  });

  it("collects the message string when validation fails", () => {
    const validateData = collectValidationState(data, {
      field: validate((_) => false, "error message"),
    });

    expect(validateData()).toEqual({
      field: "error message",
    });
  });

  it("collects the messages strings when validation fails", () => {
    const validateData = collectValidationState(data, {
      field: [
        validate((_) => false, "error message"),
        validate(() => false, "other msg"),
      ],
    });

    expect(validateData()).toEqual({
      field: ["error message", "other msg"],
    });
  });

  it("collects true's when validation succeed", () => {
    const validateData = collectValidationState(data, {
      field: [
        validate((_) => true, "error message"),
        validate(() => true, "other msg"),
      ],
      otherField: validate(() => true, "yet another message"),
    });

    expect(validateData()).toEqual({
      field: [true, true],
      otherField: true,
    });
  });
});
