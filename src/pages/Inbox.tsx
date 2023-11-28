import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
import { useSignOut } from "react-firebase-hooks/auth";

const Inbox = () => {
  const [signOut, loading] = useSignOut(auth);
  return (
    <div>
      <Button isLoading={loading} onClick={signOut}>
        Logout
      </Button>
    </div>
  );
};

export default Inbox;
