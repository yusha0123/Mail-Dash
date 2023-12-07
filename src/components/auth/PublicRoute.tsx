import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "@/components/loader";
import { Suspense } from "react";

function PublicRoute() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <Loader style="h-screen" />;
  }
  if (!user) {
    return (
      <Suspense fallback={<Loader style="h-screen" />}>
        <Outlet />
      </Suspense>
    );
  }
  return <Navigate to="/inbox" replace />;
}

export default PublicRoute;
