import { Outlet } from "react-router-dom";
import { MySidebar } from "../components";

export function Layout() {
  return (
    <main className="flex h-screen">
      <div className="w-64 border-r">
        <MySidebar />
      </div>
      <section className="flex-1 p-4 overflow-auto">
        <Outlet />
      </section>
    </main>
  );
}
