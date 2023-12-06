import { auth, firestore } from "@/lib/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";

interface DeleteMailReturnType {
  deleteMail: (
    mailType: "sent" | "received",
    id: string,
    onSuccess?: () => void
  ) => void;
  loading: boolean;
}

const useDeleteMail = (): DeleteMailReturnType => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user] = useAuthState(auth);

  const deleteMail = async (
    mailType: "sent" | "received",
    id: string,
    onSuccess?: () => void
  ) => {
    if (!user) {
      return toast.error("You are unauthenticated!");
    }

    const docRef = doc(
      firestore,
      "mails",
      auth.currentUser?.email!,
      mailType,
      id
    );
    try {
      setLoading(true);
      await deleteDoc(docRef);
      toast.success("Mail deleted successfully!");

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete mail!");
    } finally {
      setLoading(false);
    }
  };

  return { deleteMail, loading };
};

export default useDeleteMail;
