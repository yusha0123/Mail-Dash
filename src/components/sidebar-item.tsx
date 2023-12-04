import { auth } from "@/lib/firebase";
import { cn } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { ReactElement } from "react";
import { useSignOut } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import useOverlayStore from "@/hooks/useOverlayStore";

type SideBarItem = {
  icon: ReactElement;
  name: string;
  count?: number;
  active?: boolean;
  href: string;
};

export function SidebarItem({ icon, name, active, href, count }: SideBarItem) {
  const { onClose } = useOverlayStore();

  const handleSheetClose = () => {
    if (window.innerWidth <= 768) {
      onClose();
    }
  };

  return (
    <Link
      to={href}
      onClick={handleSheetClose}
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group focus:outline-none
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span className="overflow-hidden transition-all ml-3 flex-1">{name}</span>
      {count !== undefined && count > 0 && (
        <span className=" bg-red-500 text-white py-1 px-2 rounded-full text-xs">
          {count}
        </span>
      )}
    </Link>
  );
}

export const LogoutBtn = () => {
  const [signOut, loading] = useSignOut(auth);
  return (
    <div
      className={cn(
        "relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group hover:bg-indigo-50 text-gray-600",
        loading && "cursor-not-allowed"
      )}
      onClick={signOut}
    >
      <LogOut className="w-5 h-5" />
      <span className="overflow-hidden transition-all flex-1 ml-3">Logout</span>
    </div>
  );
};
