import { auth, firestore } from "@/lib/firebase";
import { ReceivedMail, SentMail } from "@/lib/types";
import { checkIfUserExists } from "@/lib/utils";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";

interface SendEmailReturnType {
  sendEmail: (
    receiver: string,
    subject: string,
    body: string,
    onSuccess?: () => void,
    onInvalidEmail?: () => void
  ) => void;
  loading: boolean;
}

const useSendEmail = (): SendEmailReturnType => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user] = useAuthState(auth);

  const sendEmail = async (
    receiver: string,
    subject: string,
    body: string,
    onSuccess?: () => void,
    onInvalidEmail?: () => void
  ) => {
    if (!user) {
      return toast.error("You are unauthenticated!");
    }
    const currentUserEmail = auth.currentUser?.email;

    const senderDoc: SentMail = {
      receiver,
      subject,
      body,
      date: new Date(),
    };
    const receiverDoc: ReceivedMail = {
      sender: currentUserEmail!,
      subject,
      body,
      date: new Date(),
      isRead: false,
    };

    try {
      setLoading(true);

      const userExists = await checkIfUserExists(receiver);

      if (!userExists) {
        if (onInvalidEmail) {
          onInvalidEmail();
        }
        return toast.error("User doesn't exist!");
      }

      await Promise.all([
        addDoc(
          collection(firestore, "mails", currentUserEmail!, "sent"),
          senderDoc
        ),
        addDoc(
          collection(firestore, "mails", receiver, "received"),
          receiverDoc
        ),
      ]);

      toast.success("Mail sent successfully!");

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to send mail!");
    } finally {
      setLoading(false);
    }
  };

  return { sendEmail, loading };
};

export default useSendEmail;
