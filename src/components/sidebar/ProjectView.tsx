
import { ArrowLeft, MessageSquare, File } from "lucide-react";
import { useActiveProject } from "@/hooks/use-active-project";
import { Button } from "@/components/ui/button";
import CollapsibleSection from "./CollapsibleSection";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ProjectViewProps {
  isCollapsed?: boolean;
}

const ProjectView = ({ isCollapsed = false }: ProjectViewProps) => {
  const { activeProject, setActiveProject } = useActiveProject();

  if (!activeProject) return null;

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b flex items-center gap-2">
        {isCollapsed ? (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 w-8 p-0"
                onClick={() => setActiveProject(null)}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              Back to projects
            </TooltipContent>
          </Tooltip>
        ) : (
          <>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={() => setActiveProject(null)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h2 className="font-semibold">{activeProject.name}</h2>
          </>
        )}
      </div>
      
      <div className="flex-1 overflow-auto">
        <CollapsibleSection title="Chats" defaultOpen={true}>
          <div className="space-y-1 px-2">
            {!isCollapsed ? (
              ['Setup Database', 'API Integration', 'Auth Config'].map((name, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start text-sm h-8"
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  {name}
                </Button>
              ))
            ) : (
              ['Setup Database', 'API Integration', 'Auth Config'].map((name, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-center text-sm h-8"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {name}
                  </TooltipContent>
                </Tooltip>
              ))
            )}
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Files" defaultOpen={true}>
          <div className="space-y-1 px-2">
            {!isCollapsed ? (
              ["main.rs", "blueprint.rs", "Cargo.toml"].map((name, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start text-sm h-8 font-mono"
                >
                  <File className="mr-2 h-4 w-4" />
                  {name}
                </Button>
              ))
            ) : (
              ["main.rs", "blueprint.rs", "Cargo.toml"].map((name, index) => (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-full justify-center text-sm h-8"
                    >
                      <File className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {name}
                  </TooltipContent>
                </Tooltip>
              ))
            )}
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
};

export default ProjectView;
