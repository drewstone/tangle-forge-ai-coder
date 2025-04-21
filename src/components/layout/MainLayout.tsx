
import { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useTheme, ThemeInitializer } from "@/hooks/use-theme";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";

interface MainLayoutProps {
  children: React.ReactNode;
}

type ViewMode = "chat" | "split" | "editor";

const MainLayout = ({ children }: MainLayoutProps) => {
  const { theme } = useTheme();
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  
  // Listen for view mode changes
  useEffect(() => {
    const handleViewModeChange = (event: CustomEvent<ViewMode>) => {
      setViewMode(event.detail);
    };

    window.addEventListener("viewModeChange", handleViewModeChange as EventListener);

    return () => {
      window.removeEventListener("viewModeChange", handleViewModeChange as EventListener);
    };
  }, []);

  return (
    <>
      <ThemeInitializer />
      <div className="min-h-screen flex flex-col">
        <Header />
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          <Sidebar />
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={80} minSize={60}>
            <main className="h-[calc(100vh-3.5rem)] overflow-auto">
              {children}
            </main>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </>
  );
};

export default MainLayout;
