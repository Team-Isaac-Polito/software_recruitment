import { Outlet } from "react-router-dom";
import { MySidebar } from "../components";

export function Layout() {
  return (
    <main className="flex h-screen">
      <div className="ml-4 mt-4">
        <MySidebar />
      </div>
      <section className="flex-1 p-4 overflow-auto">
        <Outlet />
      </section>
    </main>
  );
}
