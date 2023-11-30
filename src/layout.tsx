import Navbar from "./components/navbar";
import SideBar from "./components/sidebar";

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
        <section className="bg-gray-100 w-full h-[calc(100dvh-60px)] mt-auto mx-auto md:p-5">
          {children}
        </section>
      </main>
    </div>
  );
};

export default Layout;
