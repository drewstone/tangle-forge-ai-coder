
import { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { cn } from "@/lib/utils";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  useEffect(() => {
    // Set dark mode as default
    document.documentElement.classList.add('dark');
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className={cn(
      "min-h-screen flex flex-col",
      isDarkMode ? "dark" : ""
    )}>
      <Header toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-0">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
