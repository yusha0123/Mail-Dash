import { ReactElement } from "react";
import { Link } from "react-router-dom";

type SideBarItem = {
  icon: ReactElement;
  name: string;
  active?: boolean;
  alert?: boolean;
  href: string;
};

export default function SidebarItem({
  icon,
  name,
  active,
  alert,
  href,
}: SideBarItem) {
  return (
    <Link
      to={href}
      className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          active
            ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-indigo-50 text-gray-600"
        }
    `}
    >
      {icon}
      <span className="overflow-hidden transition-all w-52 ml-3">{name}</span>
      {alert && (
        <div className="absolute right-2 w-2 h-2 rounded bg-indigo-400 top-2" />
      )}
    </Link>
  );
}
