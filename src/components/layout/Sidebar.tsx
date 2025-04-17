
import { Folder, File } from "lucide-react";
import { cn } from "@/lib/utils";
import CollapsibleSection from "../sidebar/CollapsibleSection";

interface FileItem {
  id: string;
  name: string;
  type: "file" | "folder";
  path: string;
  children?: FileItem[];
}

const Sidebar = () => {
  return (
    <aside className="w-60 border-r border-border bg-card flex flex-col h-full">
      <div className="flex-1 overflow-auto">
        <CollapsibleSection title="Projects" defaultOpen={true}>
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
        </CollapsibleSection>

        <CollapsibleSection title="Files" defaultOpen={true}>
          <div className="space-y-1">
            <div className="project-folder">
              <Folder size={16} />
              <span>src</span>
            </div>
            <div className="ml-4 space-y-1">
              <div className="project-file !bg-transparent hover:!bg-accent/50">
                <File size={16} />
                <span>main.rs</span>
              </div>
              <div className="project-file !bg-transparent hover:!bg-accent/50">
                <File size={16} />
                <span>blueprint.rs</span>
              </div>
            </div>
            <div className="project-file !bg-transparent hover:!bg-accent/50">
              <File size={16} />
              <span>Cargo.toml</span>
            </div>
            <div className="project-file !bg-transparent hover:!bg-accent/50">
              <File size={16} />
              <span>README.md</span>
            </div>
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Chats">
          <div className="space-y-1">
            <div className="project-file !bg-transparent hover:!bg-accent/50">
              <span>Setup Database</span>
            </div>
            <div className="project-file !bg-transparent hover:!bg-accent/50">
              <span>API Integration</span>
            </div>
            <div className="project-file !bg-transparent hover:!bg-accent/50">
              <span>Auth Config</span>
            </div>
          </div>
        </CollapsibleSection>
      </div>
    </aside>
  );
};

export default Sidebar;
