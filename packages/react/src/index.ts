import { Errors, ValidationStatesCollector, valider } from "@valider/core";
import { useCallback, useState } from "react";

export default function useValider<T>(
  input: T,
  errorsCollector: ValidationStatesCollector<T>
) {
  const [errors, setErrors] = useState<Errors<T>>({});
  return [
    errors,
    useCallback(
      (onSuccess: () => void) => {
        const runValidation = valider(input, errorsCollector);
        runValidation({ onErrors: setErrors, onSuccess });
      },
      [input]
    ),
  ] as const;
}
