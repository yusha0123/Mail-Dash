import { useForm, FieldValues } from "react-hook-form";
import useOverlayStore from "@/hooks/useOverlayStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { TextFieldError } from "@/components/ui/text-field-error";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { Mail } from "lucide-react";
import useSendPasswordResetEmail from "@/hooks/useSendPasswordResetEmail.ts";

const ResetPasswordModal = () => {
  const { type, onClose, isOpen } = useOverlayStore();
  const isModalOpen = isOpen && type === "resetPasswordModal";
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);

  const onSubmit = async (data: FieldValues) => {
    await sendPasswordResetEmail(data.email);
    reset();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl pb-3 md:text-2xl border-b mb-5 text-center font-semibold">
            Reset your password
          </DialogTitle>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
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
            <Button
              size={"sm"}
              className="max-w-xs mx-auto"
              type="submit"
              isLoading={sending}
            >
              Send mail
              <Mail className="w-4 h-4 ml-2" />
            </Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPasswordModal;
