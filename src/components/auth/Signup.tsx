import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TextFieldError } from "@/components/ui/text-field-error";
import useCreateUser from "@/hooks/useCreateUser";
import { auth } from "@/lib/firebase";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

const Signup = () => {
  const [showPassword1, setShowPassword1] = useState<boolean>(false);
  const [showPassword2, setShowPassword2] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const [createUserWithEmailAndPassword, loading, error] = useCreateUser(auth);

  const onSubmit = (values: FieldValues) => {
    createUserWithEmailAndPassword(values.email, values.password);
  };

  return (
    <form
      className="py-2 px-1 space-y-4 my-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-5 w-5" />
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}
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
            type={showPassword1 ? "text" : "password"}
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
            onClick={() => setShowPassword1((prev) => !prev)}
            className="absolute top-0 right-0 flex h-full items-center px-2"
          >
            {showPassword1 ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
        <TextFieldError error={errors.password?.message} />
      </div>
      <div>
        <div className="relative">
          <Input
            placeholder="Confirm your password"
            type={showPassword2 ? "text" : "password"}
            className="pr-12"
            {...register("confirmPassword", {
              required: "Password confirmation is required",
              validate: (value) =>
                value === getValues("password") || "Passwords must match",
            })}
            autoComplete="off"
          />
          <Button
            size={"icon"}
            variant={"ghost"}
            type="button"
            onClick={() => setShowPassword2((prev) => !prev)}
            className="absolute top-0 right-0 flex h-full items-center px-2"
          >
            {showPassword2 ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </Button>
        </div>
        <TextFieldError error={errors.confirmPassword?.message} />
      </div>
      <Button className="w-full" type="submit" isLoading={loading}>
        Continue
      </Button>
    </form>
  );
};

export default Signup;
