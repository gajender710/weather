import { Outlet } from "react-router-dom";
import Navbar from "./navbar";

const Layout = () => {
  return (
    <div className="flex flex-col lg:flex-row w-full overflow-x-hidden  min-h-screen bg-slate-600">
      <Navbar />

      <div className="flex flex-col justify-between w-full overflow-x-hidden  min-h-screen ">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
