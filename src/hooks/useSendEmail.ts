import { auth, firestore } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";

interface SendEmailReturnType {
  sendEmail: (receiver: string, subject: string, body: string) => void;
  loading: boolean;
  success: boolean;
}

type receiverDocT = {
  sender: string;
  subject: string;
  body: string;
  date: Date;
  isTrashed: boolean;
  isRead: boolean;
};

type senderDocT = {
  receiver: string;
  subject: string;
  body: string;
  date: Date;
};

const useSendEmail = (): SendEmailReturnType => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [user] = useAuthState(auth);

  const sendEmail = async (receiver: string, subject: string, body: string) => {
    if (!user) {
      return toast.error("Your are unauthenticated!");
    }
    const currentUserEmail = auth.currentUser?.email;

    const senderDoc: senderDocT = {
      receiver,
      subject,
      body,
      date: new Date(),
    };
    const receiverDoc: receiverDocT = {
      sender: currentUserEmail!,
      subject,
      body,
      date: new Date(),
      isTrashed: false,
      isRead: false,
    };

    try {
      setLoading(true);

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

      setSuccess(true);
      toast.success("Mail sent successfully!");
    } catch (error) {
      console.log(error);
      toast.error("Failed to send mail!");
    } finally {
      setLoading(false);
      setSuccess(false);
    }
  };

  return { sendEmail, loading, success };
};

export default useSendEmail;
