import { SunMedium, Moon } from "lucide-react";
import { useThemeStore } from "../store/themeStore";
import { BaggageClaim } from "lucide-react";

const Navbar = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <div className="max-w-full flex justify-between items-center p-6 border-b border-sky-900">
      <h2 className="text-xl font-semibold flex items-center gap-2">
        PRODUCT STORE{" "}
        <span>
          <BaggageClaim />
        </span>
      </h2>
      <div
        className="p-2 bg-gray-600/30 rounded-md cursor-pointer"
        onClick={toggleTheme}
      >
        {theme === "light" ? (
          <Moon size={24} className="text-yellow-400" />
        ) : (
          <SunMedium size={24} className="text-yellow-400" />
        )}
      </div>
    </div>
  );
};

export default Navbar;
