import { auth, firestore } from "@/lib/firebase";
import { collection, orderBy, query } from "firebase/firestore";
import { Suspense, lazy, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import PrivateRoute from "./components/auth/PrivateRoute";
import PublicRoute from "./components/auth/PublicRoute";
import useReceivedMailStore from "./hooks/useReceivedMailStore";
import useSentMailStore from "./hooks/useSentMailStore";
import { ReceivedMail, SentMail as Sent_Mail } from "./lib/types";
import Loader from "./components/loader";

const App = () => {
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
    const mails = sentMails?.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    }) as Sent_Mail[];
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

  const Root = lazy(() => import("./pages/Root"));
  const Inbox = lazy(() => import("./pages/Inbox"));
  const InboxMail = lazy(() => import("./pages/InboxMail"));
  const Sent = lazy(() => import("./pages/Sent"));
  const SentMail = lazy(() => import("./pages/SentMail"));
  const Compose = lazy(() => import("./pages/Compose"));
  const NotFound = lazy(() => import("./pages/NotFound"));

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<Root />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="inbox" element={<Inbox />} />
          <Route path="inbox/:id" element={<InboxMail />} />
          <Route path="compose" element={<Compose />} />
          <Route path="sent" element={<Sent />} />
          <Route path="sent/:id" element={<SentMail />} />
        </Route>
        <Route
          path="*"
          element={
            <Suspense fallback={<Loader style="h-screen" />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
