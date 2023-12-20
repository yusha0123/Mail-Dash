import {
  ActionCodeSettings,
  Auth,
  sendPasswordResetEmail as fbSendPasswordResetEmail,
} from "firebase/auth";
import { useCallback, useState } from "react";
import useOverlayStore from "./useOverlayStore";
import toast from "react-hot-toast";

export type SendPasswordResetEmailHook = [
  (email: string, actionCodeSettings?: ActionCodeSettings) => Promise<boolean>,
  boolean
];

export default (auth: Auth): SendPasswordResetEmailHook => {
  const [loading, setLoading] = useState<boolean>(false);
  const { onClose } = useOverlayStore();

  const sendPasswordResetEmail = useCallback(
    async (email: string, actionCodeSettings?: ActionCodeSettings) => {
      setLoading(true);
      try {
        await fbSendPasswordResetEmail(auth, email, actionCodeSettings);
        onClose();
        toast.success("Mail sent successfully!");
        return true;
      } catch (err: any) {
        if (err.code === "auth/user-not-found") {
          toast.error("User doesn't exist!");
        } else {
          toast.error(err.code);
        }
        return false;
      } finally {
        setLoading(false);
      }
    },
    [auth]
  );

  return [sendPasswordResetEmail, loading];
};
