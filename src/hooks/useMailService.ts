import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, firestore } from "@/lib/firebase";
import { collection, orderBy, query } from "firebase/firestore";
import useSentMailStore from "@/hooks/useSentMailStore";
import useReceivedMailStore from "@/hooks/useReceivedMailStore";
import { SentMail, ReceivedMail } from "@/lib/types";

const useMailService = () => {
  const [user] = useAuthState(auth);
  const { isLoading: isSentMailLoading, updateSentMails } = useSentMailStore();
  const { isLoading: isReceivedMailLoading, updateReceivedMails } =
    useReceivedMailStore();

  const [sentMails, loadingSentMails] = useCollection(
    user
      ? query(
          collection(firestore, "mails", auth.currentUser?.email!, "sent"),
          orderBy("date", "desc")
        )
      : null
  );

  const [receivedMails, loadingReceivedMails] = useCollection(
    user
      ? query(
          collection(firestore, "mails", auth.currentUser?.email!, "received"),
          orderBy("date", "desc")
        )
      : null
  );

  useEffect(() => {
    isSentMailLoading(loadingSentMails);
    const mails = sentMails?.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as SentMail[];
    updateSentMails(mails);
  }, [sentMails, loadingSentMails, isSentMailLoading, updateSentMails]);

  useEffect(() => {
    isReceivedMailLoading(loadingReceivedMails);
    const mails = receivedMails?.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ReceivedMail[];
    updateReceivedMails(mails);
  }, [
    receivedMails,
    loadingReceivedMails,
    isReceivedMailLoading,
    updateReceivedMails,
  ]);
};

export default useMailService;
