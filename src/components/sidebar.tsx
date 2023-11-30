import { Inbox, Pencil, SendHorizontal, Star, Trash2 } from "lucide-react";
import { ReactElement } from "react";
import { useLocation } from "react-router-dom";
import MailIcon from "./mail-icon";
import { SidebarItem, LogoutBtn } from "./sidebar-item";
import { Button } from "./ui/button";

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
      icon: <Inbox className="w-5 h-5" />,
      id: 0,
    },
    {
      name: "Starred",
      href: "/starred",
      icon: <Star className="w-5 h-5" />,
      id: 1,
    },
    {
      name: "Sent",
      href: "/sent",
      icon: <SendHorizontal className="w-5 h-5" />,
      id: 2,
    },
    {
      name: "Trash",
      href: "/trash",
      icon: <Trash2 className="w-5 h-5" />,
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
        <Button
          className="flex items-center gap-1 w-2/3 mx-auto mb-3"
          variant={"custum"}
        >
          <Pencil className="h-4 w-4" />
          Compose
        </Button>
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
          <LogoutBtn />
        </div>
      </nav>
    </aside>
  );
};

export default SideBar;
