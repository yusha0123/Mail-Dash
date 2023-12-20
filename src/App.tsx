import { Suspense, lazy } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import PrivateRoute from "./components/auth/PrivateRoute";
import PublicRoute from "./components/auth/PublicRoute";
import Loader from "./components/loader";
import useMailService from "./hooks/useMailService";

const App = () => {
  useMailService();

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
