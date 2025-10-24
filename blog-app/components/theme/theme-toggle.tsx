import { useThemeStore } from "@/app/store/theme-store";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import { fa } from "zod/v4/locales";

const ThemeToggle = () => {
  const { isDarkMode, toggleMode } = useThemeStore();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (theme === "dark" && !isDarkMode) {
      useThemeStore.setState({ isDarkMode: false });
    } else if (theme === "light" && isDarkMode) {
      useThemeStore.setState({ isDarkMode: true });
    }
  }, [theme, isDarkMode]);

  const updateTheme = () => {
    toggleMode();
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <div>
      <button onClick={updateTheme}>{!isDarkMode ? <Moon /> : <Sun />}</button>
    </div>
  );
};

export default ThemeToggle;
