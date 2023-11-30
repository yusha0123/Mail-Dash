import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { auth } from "@/lib/firebase";
import { LogOut, Menu, User } from "lucide-react";
import { useSignOut } from "react-firebase-hooks/auth";
import SideBar from "./sidebar";
import { Button } from "./ui/button";

const Navbar = () => {
  const [signOut, loading] = useSignOut(auth);
  return (
    <div className="h-14 border-b shadow-sm flex justify-between md:justify-end px-4 items-center">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <Menu className="w-5 h-5" />
            </Button>
          </SheetTrigger>
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
