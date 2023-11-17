import { Outlet, ScrollRestoration } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Root() {
  return (
    <>
      <Navbar />
      <div className="lg:border-r-[1px] lg:border-l-[1px] lg:border-b-[1px] border-slate-400 lg:mx-32 lg:mb-8">
        <Outlet />
      </div>
      <ScrollRestoration />
    </>
  );
}
