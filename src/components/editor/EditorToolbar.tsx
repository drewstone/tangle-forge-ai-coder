
import { Play, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/hooks/use-theme";

interface EditorToolbarProps {
  onRun?: () => void;
}

const EditorToolbar = ({ onRun }: EditorToolbarProps) => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex justify-between items-center px-4 py-2 border-b border-border bg-card">
      <div className="text-sm text-muted-foreground">
        Last saved: {new Date().toLocaleTimeString()}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onRun}>
          <Play className="h-4 w-4 mr-2" />
          Run
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <Monitor className="h-4 w-4 mr-2" />
              {theme === 'dark' ? 'Dark' : 'Light'} Theme
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default EditorToolbar;
