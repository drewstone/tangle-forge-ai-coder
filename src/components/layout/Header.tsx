
import { Moon, Sun, Code, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ViewModeSelector from "./ViewModeSelector";
import { useState } from "react";
import { useActiveProject } from "@/hooks/use-active-project";
import { useTheme } from "@/hooks/use-theme";

const Header = () => {
  const [viewMode, setViewMode] = useState<"chat" | "split" | "editor">("split");
  const activeProject = useActiveProject((state) => state.activeProject);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleViewModeChange = (mode: "chat" | "split" | "editor") => {
    setViewMode(mode);
    // In a real app, we would update the layout based on the selected mode
    console.log(`View mode changed to: ${mode}`);
  };

  return (
    <header className="border-b border-border bg-card">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-2">
          <Code className="h-6 w-6 text-primary" />
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="font-semibold text-lg">Tangle Blueprint</span>
        </div>
        {activeProject && (
          <div className="flex-1 flex justify-center">
            <ViewModeSelector currentMode={viewMode} onModeChange={handleViewModeChange} />
          </div>
        )}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
