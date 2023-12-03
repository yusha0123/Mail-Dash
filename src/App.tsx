import { useEffect } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { auth, firestore } from "@/lib/firebase";
import { collection, query } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import PrivateRoute from "./components/auth/PrivateRoute";
import PublicRoute from "./components/auth/PublicRoute";
import Compose from "./pages/Compose";
import Inbox from "./pages/Inbox";
import Root from "./pages/Root";
import useSentMailStore from "./hooks/useSentMailStore";
import { SentMail, ReceivedMail } from "./lib/types";
import useReceivedMailStore from "./hooks/useReceivedMailStore";

const App = () => {
  const [user] = useAuthState(auth);
  const { isLoading: isSentMailLoading, updateSentMails } = useSentMailStore();
  const { isLoading: isReceivedMailLoading, updateReceivedMails } =
    useReceivedMailStore();

  const [sentMails, loadingSentMails] = useCollection(
    user
      ? query(collection(firestore, "mails", auth.currentUser?.email!, "sent"))
      : null
  );

  const [receivedMails, loadingReceivedMails] = useCollection(
    user
      ? query(
          collection(firestore, "mails", auth.currentUser?.email!, "received")
        )
      : null
  );

  useEffect(() => {
    isSentMailLoading(loadingSentMails);
    const mails = sentMails?.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    }) as SentMail[];
    updateSentMails(mails);
  }, [sentMails, loadingSentMails]);

  useEffect(() => {
    isReceivedMailLoading(loadingReceivedMails);
    const mails = receivedMails?.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    }) as ReceivedMail[];
    updateReceivedMails(mails);
  }, [receivedMails, loadingReceivedMails]);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Root />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="inbox" element={<Inbox />} />
          <Route path="compose" element={<Compose />} />
        </Route>
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
