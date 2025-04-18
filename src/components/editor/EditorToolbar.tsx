
import { Save, Play, Settings, Monitor, Moon, Sun, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface EditorToolbarProps {
  onSave?: () => void;
  onRun?: () => void;
  onThemeChange?: (theme: "vs-dark" | "light" | "system") => void;
  isDarkTheme?: boolean;
}

const EditorToolbar = ({ onSave, onRun, onThemeChange, isDarkTheme = true }: EditorToolbarProps) => {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  
  // Auto-save functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (onSave) {
        onSave();
        setLastSaved(new Date());
      }
    }, 30000); // Auto-save every 30 seconds
    
    return () => clearInterval(interval);
  }, [onSave]);

  const handleThemeChange = (theme: "vs-dark" | "light" | "system") => {
    if (onThemeChange) {
      onThemeChange(theme);
      toast.info(`Switched to ${theme} theme`);
    }
  };

  return (
    <div className="flex justify-between items-center px-4 py-2 border-b border-border bg-card">
      <div className="flex items-center gap-2">
        {lastSaved && (
          <span className="text-xs text-muted-foreground">
            Last saved: {lastSaved.toLocaleTimeString()}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onSave}>
          <Save className="h-4 w-4 mr-2" />
          Save
        </Button>
        <Button variant="ghost" size="sm" onClick={onRun}>
          <Play className="h-4 w-4 mr-2" />
          Run
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <Monitor className="h-4 w-4 mr-2" />
              Theme
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleThemeChange("vs-dark")}>
              <Moon className="h-4 w-4 mr-2" />
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleThemeChange("light")}>
              <Sun className="h-4 w-4 mr-2" />
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleThemeChange("system")}>
              <Laptop className="h-4 w-4 mr-2" />
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        
        <Button variant="ghost" size="icon" className="ml-2">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default EditorToolbar;
