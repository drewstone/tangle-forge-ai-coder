
import { ArrowLeft, MessageSquare, File } from "lucide-react";
import { useActiveProject } from "@/hooks/use-active-project";
import { Button } from "@/components/ui/button";
import CollapsibleSection from "./CollapsibleSection";

const chats = [
  { id: "1", name: "Setup Database" },
  { id: "2", name: "API Integration" },
  { id: "3", name: "Auth Config" }
];

const files = [
  {
    id: "1",
    name: "main.rs",
    type: "file"
  },
  {
    id: "2",
    name: "blueprint.rs",
    type: "file"
  },
  {
    id: "3",
    name: "Cargo.toml",
    type: "file"
  }
];

const ProjectView = () => {
  const { activeProject, setActiveProject } = useActiveProject();

  if (!activeProject) return null;

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0"
          onClick={() => setActiveProject(null)}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h2 className="font-semibold">{activeProject.name}</h2>
      </div>
      
      <div className="flex-1 overflow-auto">
        <CollapsibleSection title="Chats" defaultOpen={true}>
          <div className="space-y-1 px-2">
            {chats.map((chat) => (
              <Button
                key={chat.id}
                variant="ghost"
                className="w-full justify-start text-sm h-8"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                {chat.name}
              </Button>
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Files" defaultOpen={true}>
          <div className="space-y-1 px-2">
            {files.map((file) => (
              <Button
                key={file.id}
                variant="ghost"
                className="w-full justify-start text-sm h-8 font-mono"
              >
                <File className="mr-2 h-4 w-4" />
                {file.name}
              </Button>
            ))}
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
};

export default ProjectView;
