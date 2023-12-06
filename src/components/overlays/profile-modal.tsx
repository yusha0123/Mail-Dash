import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import useOverlayStore from "@/hooks/useOverlayStore";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/button";
import { useSignOut } from "react-firebase-hooks/auth";
import { LogOut } from "lucide-react";

const ProfileModal = () => {
  const { type, onClose, isOpen } = useOverlayStore();
  const isModalOpen = isOpen && type === "profileModal";
  const [signOut, loading] = useSignOut(auth);

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-xl pb-3 md:text-2xl border-b mb-5 text-center font-semibold">
            Your Profile
          </DialogTitle>
          <div className="flex flex-col items-center gap-3">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={`https://api.multiavatar.com/${
                  auth.currentUser?.email
                }.png?apikey=${import.meta.env.MULTI_AVATAR_KEY}`}
              />
              <AvatarFallback>
                {auth.currentUser?.email?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <h3 className="font-semibold text-gray-500">
              {auth.currentUser?.email}
            </h3>
            <Button
              variant={"destructive"}
              onClick={signOut}
              isLoading={loading}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
