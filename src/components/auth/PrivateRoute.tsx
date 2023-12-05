import Layout from "@/layout";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Outlet } from "react-router-dom";
import Loader from "@/components/loader";

function PrivateRoute() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <Loader style="h-screen" />;
  }
  if (user) {
    return (
      <Layout>
        <Outlet />
      </Layout>
    );
  }
  return <Navigate to="/" replace />;
}

export default PrivateRoute;
