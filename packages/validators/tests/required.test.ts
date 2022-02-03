import { collectValidationState } from "@valider/core";
import { required } from "..";

describe("required", () => {
  const data = {
    field: "",
    field1: null,
    field2: undefined,
    field3: false,
    field4: "asdf",
  };

  it("validates that a value is truthy", () => {
    const validate = collectValidationState(data, {
      field: required("is required"),
      field1: required("is required"),
      field2: required("is required"),
      field3: required("is required"),
      field4: required("is required"),
    });

    expect(validate()).toEqual({
      field: "is required",
      field1: "is required",
      field2: "is required",
      field3: "is required",
      field4: true,
    });
  });
});
