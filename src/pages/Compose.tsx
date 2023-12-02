import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TextFieldError } from "@/components/ui/text-field-error";
import useSendEmail from "@/hooks/useSendEmail";
import { auth } from "@/lib/firebase";
import JoditEditor from "jodit-react";
import { SendHorizonal } from "lucide-react";
import { useEffect, useRef } from "react";
import { FieldValues, useForm } from "react-hook-form";

const Compose = () => {
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    setError,
    formState: { errors },
  } = useForm();
  const editor = useRef(null);
  const { sendEmail, loading, success } = useSendEmail();

  const onSubmit = (data: FieldValues) => {
    if (!data.body) {
      setError("body", {
        type: "required",
        message: "Message can't be empty",
      });
      return;
    }
    sendEmail(data.recipent, data.subject, data.body);
  };

  const config = {
    height: 300,
    placeholder: "Enter your message...",
  };

  const handleJoditChange = (newContent: any) => {
    setValue("body", newContent);
  };

  const validateEmail = (value: string) => {
    if (value === auth.currentUser?.email) {
      return "Please don't enter your own email";
    }
    return true;
  };

  useEffect(() => {
    if (success) {
      reset();
    }
  }, [success]);

  return (
    <div className="bg-white rounded-lg w-full h-full px-4 md:px-8 py-4 md:py-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
        <div className="grid md:grid-cols-2 gap-4 md:gap-6">
          <div>
            <Input
              placeholder="Enter recipent's email"
              {...register("recipent", {
                required: "Recipent's email is required",
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: "Please enter a valid email address",
                },
                validate: validateEmail,
              })}
            />
            <TextFieldError error={errors.recipent?.message} />
          </div>
          <div>
            <Input
              placeholder="Enter subject"
              {...register("subject", {
                required: "Subject is required",
              })}
            />
            <TextFieldError error={errors.subject?.message} />
          </div>
        </div>
        <ScrollArea>
          <JoditEditor
            ref={editor}
            value=""
            config={config}
            onChange={handleJoditChange}
          />
          <TextFieldError error={errors.body?.message} />
        </ScrollArea>
        <div className="flex justify-center">
          <Button type="submit" isLoading={loading}>
            {!loading && <SendHorizonal className="mr-2 h-4 w-4" />}
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Compose;