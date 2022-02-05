import isBeforeNow from "./isBeforeNow";

describe("isBeforeNow", () => {
  const bad = new Date(Date.now() + 1000);

  const good = new Date(2020, 1);
  it("validates that string is not less than a given length", () => {
    expect(isBeforeNow("bad")(bad, null)).toBe("bad");
    expect(isBeforeNow("bad")(good, null)).toBe(true);
  });
});
