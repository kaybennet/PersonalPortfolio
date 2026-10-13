import { Outlet } from "react-router";
import Topbar from "./Topbar";
import Footer from "./Footer";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col text-foreground">
      <Topbar title="Personal Portfolio" />
      <main className="mx-auto w-full max-w-screen-3xl flex-1 px-4 py-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
