import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import useOverlayStore from "@/hooks/useOverlayStore";
import { auth } from "@/lib/firebase";
import { LogOut, Menu, User } from "lucide-react";
import { useSignOut } from "react-firebase-hooks/auth";
import SideBar from "./sidebar";
import { Button } from "./ui/button";

const Navbar = () => {
  const [signOut, loading] = useSignOut(auth);
  const { onOpen, type, onClose, isOpen } = useOverlayStore();
  const isSheetOpen = isOpen && type === "mobileSidebar";

  return (
    <div className="h-14 border-b md:border-b-0 flex justify-between md:justify-end px-4 items-center bg-gray-100">
      <div className="md:hidden">
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => onOpen("mobileSidebar")}
        >
          <Menu className="w-5 h-5" />
        </Button>
        <Sheet open={isSheetOpen} onOpenChange={onClose}>
          <SheetContent side={"left"} className="p-0 flex gap-0">
            <SideBar />
          </SheetContent>
        </Sheet>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage
              src={`https://api.multiavatar.com/${
                auth.currentUser?.email
              }.png?apikey=${import.meta.env.MULTI_AVATAR_KEY}`}
            />
            <AvatarFallback>
              {auth.currentUser?.email?.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled={loading} onClick={signOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default Navbar;
