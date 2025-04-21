import { Moon, Sun, Code, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ViewModeSelector from "./ViewModeSelector";
import { useState, useEffect } from "react";
import { useActiveProject } from "@/hooks/use-active-project";
import { useTheme } from "@/hooks/use-theme";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

type ViewMode = "chat" | "split" | "editor";

const Header = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("split");
  const activeProject = useActiveProject((state) => state.activeProject);
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    
    const event = new CustomEvent("viewModeChange", { detail: mode });
    window.dispatchEvent(event);
    
    console.log(`View mode changed to: ${mode}`);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
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
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
