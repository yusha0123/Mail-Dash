import { Suspense } from "react";
import Navbar from "@/components/navbar";
import SideBar from "@/components/sidebar";
import Loader from "@/components/loader";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="hidden md:flex h-full inset-y-0 z-10 flex-col fixed w-60">
        <SideBar />
      </div>
      <main className="md:ml-60 h-full">
        <div className="sticky top-0">
          <Navbar />
        </div>
        <section className="bg-gray-100 w-full h-[calc(100dvh-60px)] mt-auto md:p-5">
          <Suspense fallback={<Loader style="h-full" />}>{children}</Suspense>
        </section>
      </main>
    </div>
  );
};

export default Layout;
