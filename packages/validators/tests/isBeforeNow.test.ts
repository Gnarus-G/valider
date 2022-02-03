import { collectValidationState } from "@valider/core";
import { isBeforeNow } from "..";

describe("isBeforeNow", () => {
  const data = {
    bad: new Date(Date.now() + 1000),
    good: new Date(2020, 1),
  };

  it("validates that string is not less than a given length", () => {
    const validate = collectValidationState(data, {
      bad: isBeforeNow("bad"),
      good: isBeforeNow("bad"),
    });

    expect(validate()).toEqual({
      bad: "bad",
      good: true,
    });
  });
});
