
import { MessageSquare, Split, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

type ViewMode = "chat" | "split" | "editor";

interface ViewModeSelectorProps {
  currentMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
}

const ViewModeSelector = ({ currentMode, onModeChange }: ViewModeSelectorProps) => {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant={currentMode === "chat" ? "default" : "ghost"}
        size="sm"
        onClick={() => onModeChange("chat")}
      >
        <MessageSquare className="h-4 w-4 mr-2" />
        Chat
      </Button>
      <Button
        variant={currentMode === "split" ? "default" : "ghost"}
        size="sm"
        onClick={() => onModeChange("split")}
      >
        <Split className="h-4 w-4 mr-2" />
        Split
      </Button>
      <Button
        variant={currentMode === "editor" ? "default" : "ghost"}
        size="sm"
        onClick={() => onModeChange("editor")}
      >
        <Code className="h-4 w-4 mr-2" />
        Editor
      </Button>
    </div>
  );
};

export default ViewModeSelector;
