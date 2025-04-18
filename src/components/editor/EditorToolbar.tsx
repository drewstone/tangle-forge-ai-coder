
import { Save, Play, Share2, Settings, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface EditorToolbarProps {
  onSave?: () => void;
  onRun?: () => void;
  onThemeToggle?: () => void;
  isDarkTheme?: boolean;
}

const EditorToolbar = ({ onSave, onRun, onThemeToggle, isDarkTheme = true }: EditorToolbarProps) => {
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  
  // Auto-save functionality (simulated)
  useEffect(() => {
    const interval = setInterval(() => {
      if (onSave) {
        onSave();
        setLastSaved(new Date());
      }
    }, 30000); // Auto-save every 30 seconds
    
    return () => clearInterval(interval);
  }, [onSave]);

  return (
    <div className="flex justify-between items-center px-4 py-2 border-b border-border bg-card">
      <div className="flex items-center gap-2">
        <Select defaultValue="main.rs">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select file" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="main.rs">main.rs</SelectItem>
            <SelectItem value="blueprint.rs">blueprint.rs</SelectItem>
            <SelectItem value="Cargo.toml">Cargo.toml</SelectItem>
          </SelectContent>
        </Select>
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
        <Button variant="ghost" size="sm" onClick={onThemeToggle}>
          <Monitor className="h-4 w-4 mr-2" />
          Theme
        </Button>
        <Button variant="ghost" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
        <Button variant="ghost" size="icon" className="ml-2">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default EditorToolbar;
