import { Outlet } from "react-router";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

export default function Layout() {
  return (
    <div>
      <Navbar />
      <div className="content min-h-screen  bg-white dark:bg-gray-900">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
