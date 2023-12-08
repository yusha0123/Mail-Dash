import { buttonVariants } from "@/components/ui/button";
import { Home } from "lucide-react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex h-[100dvh] z-10 gap-2 flex-col justify-center items-center bg-gray-50">
      <h2 className="text-2xl md:text-4xl font-bold">404</h2>
      <p className="text-xl md:text-2xl">Page not Found</p>
      <Link to={"/"} className={buttonVariants()}>
        <Home className="h-4 w-4 mr-2" />
        Back to Home Page
      </Link>
    </div>
  );
};

export default NotFound;
