import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import {
  FieldValues,
  useForm,
  Merge,
  FieldError,
  FieldErrorsImpl,
} from "react-hook-form";

const Signup = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const TextFieldError = ({
    error,
  }: {
    error?:
      | string
      | FieldError
      | Merge<FieldError, FieldErrorsImpl>
      | undefined;
  }) => {
    return (
      error && (
        <p className="text-red-500 my-2 text-center text-xs">
          {error.toString()}
        </p>
      )
    );
  };

  const onSubmit = (values: FieldValues) => {
    console.log(values);
  };

  return (
    <form
      className="py-2 px-1 space-y-5 my-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <Input
          placeholder="Enter your name"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Please enter a valid name",
            },
          })}
          autoComplete="off"
        />
        <TextFieldError error={errors.name?.message} />
      </div>
      <div>
        <Input
          placeholder="Enter your email"
          {...register("email", {
            required: "Email Address is required",
            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Please enter a valid email address",
            },
          })}
          autoComplete="off"
        />
        <TextFieldError error={errors.email?.message} />
      </div>
      <div>
        <div className="relative">
          <Input
            placeholder="Choose a password"
            type={showPassword ? "text" : "password"}
            className="pr-12"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
            autoComplete="off"
          />
          <Button
            size={"icon"}
            variant={"ghost"}
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute top-0 right-0 flex h-full items-center px-2"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
        <TextFieldError error={errors.password?.message} />
      </div>
      <Button className="w-full" type="submit">
        Continue
      </Button>
    </form>
  );
};

export default Signup;
