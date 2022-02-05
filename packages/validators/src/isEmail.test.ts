import isEmail from "./isEmail";

jest.mock("validator/es/lib/isEmail", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("isEmail", () => {
  it("calls the validator from validator.js", () => {
    isEmail("must be an email")("asdf@asdf.com", null);

    expect(require("validator/es/lib/isEmail").default).toHaveBeenCalled();
  });
});
