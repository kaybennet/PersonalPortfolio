import { Outlet } from "react-router";
import Topbar from "./Topbar";

export default function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Topbar title="My App" />
      <main className="mx-auto max-w-6xl p-4">
        <Outlet />
      </main>
    </div>
  );
}
