import { Outlet } from "react-router";
import Topbar from "./Topbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Topbar title="Personal Portfolio" />
      <main className="mx-auto max-w-screen-2xl px-4 py-4 sm:px-6 lg:px-10">
        <Outlet />
      </main>
    </div>
  );
}
