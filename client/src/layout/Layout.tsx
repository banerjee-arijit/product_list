import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useThemeStore } from "../store/themeStore";

const Layout = () => {
  const { theme } = useThemeStore();

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-sky-50 text-black"
      }`}
    >
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
