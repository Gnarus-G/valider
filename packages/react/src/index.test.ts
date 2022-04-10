import { act, renderHook } from "@testing-library/react-hooks";
import { validate } from "@valider/core";
import useValider from ".";

describe("useValider", () => {
  const data = {
    field: "value",
    otherField: new Date(),
    ignored: null,
  };

  const onSuccess = jest.fn();

  it("captures errors and doesn't call onSuccess callback", () => {
    const { result } = renderHook(() =>
      useValider(data, {
        field: validate(() => false, "message"),
        otherField: validate(() => false, "other message"),
      })
    );

    let [errors, validateData] = result.current;

    expect(errors).toEqual({});

    act(() => validateData(onSuccess));

    [errors] = result.current;

    expect(errors).toEqual({
      field: "message",
      otherField: "other message",
    });

    expect(onSuccess).not.toHaveBeenCalled();
  });

  it("calls a callback on success", () => {
    const { result } = renderHook(() =>
      useValider(data, {
        field: validate(() => true, "message"),
        otherField: validate(() => true, "other message"),
      })
    );

    const [, validateData] = result.current;

    act(() => validateData(onSuccess));

    expect(onSuccess).toHaveBeenCalled();
  });
});
