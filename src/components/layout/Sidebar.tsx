
import {
  Folder,
  File,
  Terminal,
  MessageSquare,
  Settings,
  Code,
  Package
} from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar = () => {
  return (
    <aside className="w-60 border-r border-border bg-card flex flex-col h-full">
      <div className="p-3">
        <div className="text-xs uppercase font-semibold text-muted-foreground mb-3 px-2">
          Projects
        </div>
        <div className="space-y-1">
          <div className={cn("project-file", "bg-secondary")}>
            <Folder size={16} className="text-primary" />
            <span>tangle-example</span>
          </div>
          <div className="project-file">
            <Folder size={16} />
            <span>infra-blueprints</span>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-auto p-3">
        <div className="text-xs uppercase font-semibold text-muted-foreground mb-3 px-2">
          Files
        </div>
        <div className="space-y-1">
          <div className="project-folder">
            <Folder size={16} />
            <span>src</span>
          </div>
          <div className="ml-4 space-y-1">
            <div className="project-file">
              <File size={16} />
              <span>main.rs</span>
            </div>
            <div className="project-file">
              <File size={16} />
              <span>blueprint.rs</span>
            </div>
          </div>
          <div className="project-file">
            <File size={16} />
            <span>Cargo.toml</span>
          </div>
          <div className="project-file">
            <File size={16} />
            <span>README.md</span>
          </div>
        </div>
      </div>
      <div className="p-3 border-t border-border">
        <div className="space-y-1">
          <div className="nav-item">
            <MessageSquare size={16} />
            <span>Chat</span>
          </div>
          <div className="nav-item">
            <Terminal size={16} />
            <span>Terminal</span>
          </div>
          <div className="nav-item">
            <Code size={16} />
            <span>Editor</span>
          </div>
          <div className="nav-item">
            <Package size={16} />
            <span>Packages</span>
          </div>
          <div className="nav-item">
            <Settings size={16} />
            <span>Settings</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
