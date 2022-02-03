import { collectValidationState } from "@valider/core";
import { minLength } from "..";

describe("minLength", () => {
  const data = {
    bad: "",
    good: "alsdkfjasdkl",
  };

  it("validates that string is not less than a given length", () => {
    const validate = collectValidationState(data, {
      bad: minLength(8, "at least 8"),
      good: minLength(8, "at least 8"),
    });

    expect(validate()).toEqual({
      bad: "at least 8",
      good: true,
    });
  });
});
