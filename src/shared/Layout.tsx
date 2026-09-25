import { Outlet } from "react-router";
import Topbar from "./Topbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Topbar title="Personal Portfolio" />
      <main className="mx-auto max-w-screen-3xl px-4 py-4">
        <Outlet />
      </main>
    </div>
  );
}
