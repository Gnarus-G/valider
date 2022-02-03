import { collectValidationState } from "@valider/core";
import { isAfterNow } from "..";

describe("isAfterNow", () => {
  const data = {
    bad: new Date(),
    good: new Date(Date.now() + 1000 * 10),
  };

  it("validates that string is not less than a given length", () => {
    const validate = collectValidationState(data, {
      bad: isAfterNow("bad"),
      good: isAfterNow("bad"),
    });

    expect(validate()).toEqual({
      bad: "bad",
      good: true,
    });
  });
});
