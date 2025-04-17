
import { Save, Play, Download, Share2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface EditorToolbarProps {
  onSave?: () => void;
  onRun?: () => void;
}

const EditorToolbar = ({ onSave, onRun }: EditorToolbarProps) => {
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
        <Select defaultValue="rust">
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rust">Rust</SelectItem>
            <SelectItem value="toml">TOML</SelectItem>
            <SelectItem value="markdown">Markdown</SelectItem>
          </SelectContent>
        </Select>
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
        <Button variant="ghost" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export
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
