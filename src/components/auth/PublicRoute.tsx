import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "@/components/loader";

function PublicRoute() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <Loader />;
  }
  if (!user) {
    return <Outlet />;
  }
  return <Navigate to="/inbox" replace />;
}

export default PublicRoute;
