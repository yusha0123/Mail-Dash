import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export const TextFieldError = ({
  error,
}: {
  error?: string | FieldError | Merge<FieldError, FieldErrorsImpl> | undefined;
}) => {
  return (
    error && (
      <p className="text-red-500 my-2 text-center text-xs">
        {error.toString()}
      </p>
    )
  );
};
