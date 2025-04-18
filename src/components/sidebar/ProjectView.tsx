
import { ArrowLeft, MessageSquare, File, Folder, ChevronRight, ChevronDown } from "lucide-react";
import { useActiveProject } from "@/hooks/use-active-project";
import { Button } from "@/components/ui/button";
import CollapsibleSection from "./CollapsibleSection";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import FileContextMenu from "./FileContextMenu";
import { useState } from "react";

interface ProjectViewProps {
  isCollapsed?: boolean;
}

// Sample directory structure for demonstration
const initialFileStructure = {
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
  const [fileStructure, setFileStructure] = useState(initialFileStructure);
  
  if (!activeProject) return null;

  const toggleDirectory = (path: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    
    const newStructure = JSON.parse(JSON.stringify(fileStructure));
    const pathParts = path.split('/').filter(p => p);
    let current = newStructure;
    
    for (const part of pathParts) {
      if (current[part] && current[part].type === 'directory') {
        current = current[part];
      }
    }
    
    if (current.type === 'directory') {
      current.expanded = !current.expanded;
      setFileStructure(newStructure);
    }
  };

  const renderFileTree = (structure: any, path = "", level = 0) => {
    return Object.entries(structure).map(([name, info]: [string, any]) => {
      const currentPath = `${path}/${name}`;
      const isDir = info.type === "directory";
      const isExpanded = isDir && info.expanded;
      
      // Skip rendering deeply nested files when collapsed
      if (isCollapsed && level > 0) return null;
      
      const fileButton = (
        <Button
          key={currentPath}
          variant="ghost"
          className={`w-full justify-start text-sm h-8 ${isDir ? '' : 'font-mono'} pl-${level * 4 + 2}`}
          onClick={() => isDir && toggleDirectory(currentPath)}
        >
          {isDir ? (
            isExpanded ? 
              <ChevronDown className="mr-2 h-4 w-4" /> : 
              <ChevronRight className="mr-2 h-4 w-4" />
          ) : (
            <File className="mr-2 h-4 w-4" />
          )}
          {!isCollapsed && (
            <span className="flex items-center">
              {isDir && <Folder className="mr-2 h-4 w-4" />}
              {name}
            </span>
          )}
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
        <div key={currentPath}>
          <FileContextMenu path={currentPath} isDirectory={isDir}>
            {wrappedButton}
          </FileContextMenu>
          
          {isDir && info.children && !isCollapsed && isExpanded && 
            <div className="ml-2">
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
          <div className="space-y-1 px-2">
            {!isCollapsed ? (
              ['Setup Database', 'API Integration', 'Auth Config'].map((name, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start text-sm h-8 hover:bg-muted"
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
                      className="w-full justify-center text-sm h-8 hover:bg-muted"
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
          <div className="space-y-1 px-2">
            {renderFileTree(fileStructure)}
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
};

export default ProjectView;
