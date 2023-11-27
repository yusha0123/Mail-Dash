import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <div className="py-2 px-1 space-y-5 my-4">
      <Input placeholder="Enter your email" />
      <div className="relative">
        <Input
          placeholder="Choose a password"
          type={showPassword ? "text" : "password"}
          className="pr-12"
        />
        <Button
          size={"icon"}
          variant={"ghost"}
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
      <Button className="w-full">Continue</Button>
    </div>
  );
};

export default Login;
