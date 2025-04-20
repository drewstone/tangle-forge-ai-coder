
import { ArrowLeft, MessageSquare, File, Folder, ChevronRight, ChevronDown } from "lucide-react";
import { useActiveProject } from "@/hooks/use-active-project";
import { Button } from "@/components/ui/button";
import CollapsibleSection from "./CollapsibleSection";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import FileContextMenu from "./FileContextMenu";
import { useFileTree, type FileNode } from "@/hooks/use-file-tree";

interface ProjectViewProps {
  isCollapsed?: boolean;
}

const initialFileStructure: Record<string, FileNode> = {
  "src": {
    type: "directory",
    expanded: true,
    children: {
      "main.rs": { type: "file" },
      "lib.rs": { type: "file" },
      "models": {
        type: "directory",
        expanded: false,
        children: {
          "user.rs": { type: "file" },
          "product.rs": { type: "file" }
        }
      }
    }
  },
  "Cargo.toml": { type: "file" },
  "README.md": { type: "file" }
};

const ProjectView = ({ isCollapsed = false }: ProjectViewProps) => {
  const { activeProject, setActiveProject } = useActiveProject();
  const { structure, toggleDirectory } = useFileTree(initialFileStructure);
  
  if (!activeProject) return null;

  const renderFileTree = (structure: Record<string, FileNode>, basePath = "", level = 0) => {
    return Object.entries(structure).map(([name, info]) => {
      const currentPath = basePath ? `${basePath}/${name}` : name;
      const isDir = info.type === "directory";
      const isExpanded = isDir && info.expanded;
      
      const fileButton = (
        <Button
          key={currentPath}
          variant="ghost"
          className={`w-full justify-start text-left text-sm h-9 px-2 ${isDir ? 'font-medium' : 'font-mono'}`}
          style={{ paddingLeft: `${level * 12 + 8}px` }}
          onClick={(e) => {
            e.stopPropagation();
            if (isDir) toggleDirectory(currentPath);
          }}
        >
          <div className="flex items-center w-full overflow-hidden">
            {isDir && (isExpanded ? 
              <ChevronDown className="mr-1 h-4 w-4 flex-shrink-0" /> : 
              <ChevronRight className="mr-1 h-4 w-4 flex-shrink-0" />
            )}
            {isDir ? 
              <Folder className="mr-2 h-4 w-4 flex-shrink-0 text-blue-500" /> : 
              <File className="mr-2 h-4 w-4 flex-shrink-0 text-gray-400" />
            }
            <span className="truncate">{name}</span>
          </div>
        </Button>
      );
      
      const wrappedButton = isCollapsed ? (
        <Tooltip key={currentPath}>
          <TooltipTrigger asChild>
            {fileButton}
          </TooltipTrigger>
          <TooltipContent side="right">
            {name}
          </TooltipContent>
        </Tooltip>
      ) : fileButton;

      return (
        <div key={currentPath} className="w-full">
          <FileContextMenu path={currentPath} isDirectory={isDir}>
            {wrappedButton}
          </FileContextMenu>
          
          {isDir && info.children && isExpanded && 
            <div className="w-full">
              {renderFileTree(info.children, currentPath, level + 1)}
            </div>
          }
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col h-full bg-card">
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
            <h2 className="font-semibold truncate">{activeProject.name}</h2>
          </>
        )}
      </div>
      
      <div className="flex-1 overflow-auto">
        <CollapsibleSection 
          title="Chats" 
          defaultOpen={true}
          isCollapsed={isCollapsed}
        >
          <div className="space-y-1 px-3">
            {!isCollapsed ? (
              ['Setup Database', 'API Integration', 'Auth Config'].map((name, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start text-base h-9 hover:bg-muted"
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
                      className="w-full justify-center text-base h-9 hover:bg-muted"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-[200px]">
                    {name}
                  </TooltipContent>
                </Tooltip>
              ))
            )}
          </div>
        </CollapsibleSection>

        <CollapsibleSection 
          title="Files" 
          defaultOpen={true}
          isCollapsed={isCollapsed}
        >
          <div className="space-y-1 px-1">
            {renderFileTree(structure)}
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
};

export default ProjectView;
