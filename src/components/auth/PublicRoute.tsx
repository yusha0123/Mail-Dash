import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Outlet } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

function PublicRoute() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <ClipLoader size={50} />
      </div>
    );
  }
  if (!user) {
    return <Outlet />;
  }
  return <Navigate to="/inbox" replace />;
}

export default PublicRoute;
