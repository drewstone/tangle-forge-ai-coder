
import { useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useTheme, ThemeInitializer } from "@/hooks/use-theme";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { theme } = useTheme();

  // Initialize theme from saved preferences
  useEffect(() => {
    // This is just to ensure the component re-renders when theme changes
  }, [theme]);

  return (
    <>
      <ThemeInitializer />
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex overflow-hidden">
          <Sidebar />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
