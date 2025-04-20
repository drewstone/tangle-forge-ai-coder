
import { Play, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/hooks/use-theme";
import { toast } from "sonner";

interface EditorToolbarProps {
  onRun?: () => void;
}

const EditorToolbar = ({ onRun }: EditorToolbarProps) => {
  const { theme, setTheme } = useTheme();

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    toast.success(`Switched to ${newTheme} theme`);
  };

  return (
    <div className="flex justify-between items-center px-4 py-2 border-b border-border bg-card">
      <div className="text-sm text-muted-foreground">
        Auto-saving enabled
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onRun}>
          <Play className="h-4 w-4 mr-2" />
          Run
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              {theme === 'dark' ? (
                <Moon className="h-4 w-4 mr-2" />
              ) : (
                <Sun className="h-4 w-4 mr-2" />
              )}
              {theme === 'dark' ? 'Dark' : 'Light'} Theme
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleThemeChange("dark")}>
              <Moon className="h-4 w-4 mr-2" />
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleThemeChange("light")}>
              <Sun className="h-4 w-4 mr-2" />
              Light
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default EditorToolbar;
