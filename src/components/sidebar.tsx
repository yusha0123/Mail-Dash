import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/lib/firebase";
import {
  Inbox,
  MoreVertical,
  SendHorizontal,
  Star,
  Trash2,
} from "lucide-react";
import { ReactElement } from "react";
import { useLocation } from "react-router-dom";
import MailIcon from "./mail-icon";
import SidebarItem from "./sidebar-item";

type SideBarItem = {
  name: string;
  href: string;
  icon: ReactElement;
  id: number;
};

const SideBar = () => {
  const sideBarItems: SideBarItem[] = [
    {
      name: "Inbox",
      href: "/inbox",
      icon: <Inbox />,
      id: 0,
    },
    {
      name: "Starred",
      href: "/starred",
      icon: <Star />,
      id: 1,
    },
    {
      name: "Sent",
      href: "/sent",
      icon: <SendHorizontal />,
      id: 2,
    },
    {
      name: "Trash",
      href: "/trash",
      icon: <Trash2 />,
      id: 3,
    },
  ];

  const location = useLocation();

  return (
    <aside className="h-full w-full">
      <nav className="h-full flex flex-col bg-white border-r shadow-sm">
        <h1 className="p-4 mb-3 text-lg md:text-2xl font-bold text-primary flex items-center mx-auto gap-1">
          <MailIcon className="h-8 w-8" />
          Mail Dash
        </h1>

        <div className="flex-1 px-3">
          {sideBarItems.map((item: SideBarItem) => (
            <SidebarItem
              icon={item.icon}
              href={item.href}
              name={item.name}
              key={item.id}
              active={location.pathname === item.href}
            />
          ))}
        </div>

        <div className="border-t flex p-3">
          <Avatar>
            <AvatarImage
              src={`https://api.multiavatar.com/Starcrasher.png?apikey=${
                import.meta.env.MULTI_AVATAR_KEY
              }`}
            />
            <AvatarFallback>
              {auth.currentUser?.email?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div
            className="flex justify-between items-center
              overflow-hidden transition-all w-52 ml-3"
          >
            <div className="text-xs font-semibold">
              {auth.currentUser?.email}
            </div>
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default SideBar;
