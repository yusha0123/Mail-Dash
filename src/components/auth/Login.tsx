import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TextFieldError } from "@/components/ui/text-field-error";
import useSignIn from "@/hooks/useSignIn";
import { auth } from "@/lib/firebase";
import { Eye, EyeOff, AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { Alert, AlertTitle } from "@/components/ui/alert";
import useOverlayStore from "@/hooks/useOverlayStore";

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [signInWithEmailAndPassword, loading, error] = useSignIn(auth);
  const { onOpen } = useOverlayStore();

  const onSubmit = (values: FieldValues) => {
    signInWithEmailAndPassword(values.email, values.password);
  };

  useEffect(() => {
    if (error) {
      resetField("password");
    }
  }, [error]);

  return (
    <>
      <form className="py-2 px-1 space-y-3" onSubmit={handleSubmit(onSubmit)}>
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-5 w-5" />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}
        <div>
          <Input
            placeholder="Enter your email"
            autoComplete="off"
            {...register("email", {
              required: "Email Address is required",
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Please enter a valid email address",
              },
            })}
          />
          <TextFieldError error={errors.email?.message} />
        </div>
        <div>
          <div className="relative">
            <Input
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
              className="pr-12"
              autoComplete="off"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            <Button
              size={"icon"}
              variant={"ghost"}
              onClick={() => setShowPassword((prev) => !prev)}
              type="button"
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
        <Button className="w-full" type="submit" isLoading={loading}>
          Continue
        </Button>
      </form>
      <Button
        variant={"link"}
        className="mx-auto block text-xs"
        onClick={() => onOpen("resetPasswordModal")}
      >
        Forgot password?
      </Button>
    </>
  );
};

export default Login;
