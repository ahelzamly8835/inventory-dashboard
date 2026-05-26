import { Outlet } from "react-router-dom";
import SideBar from "../../components/sidebar/SideBar";
import { useState } from "react";

export default function Layout() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex">
      <SideBar open={open} setOpen={setOpen} />

      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="flex-1 bg-[#EEF2FF] min-h-screen">
        <div className="md:hidden p-4 bg-white shadow flex items-center">
          <button onClick={() => setOpen(true)} className="text-2xl">
            ☰
          </button>
          <h1 className="ml-4 font-semibold">Dashboard</h1>
        </div>

        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
