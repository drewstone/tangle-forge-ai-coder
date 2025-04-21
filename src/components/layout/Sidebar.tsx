
import { useState, useEffect } from "react";
import { useActiveProject } from "@/hooks/use-active-project";
import ProjectList from "../sidebar/ProjectList";
import ProjectView from "../sidebar/ProjectView";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";
import { ResizablePanel } from "@/components/ui/resizable";

const Sidebar = () => {
  const activeProject = useActiveProject((state) => state.activeProject);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme } = useTheme();

  return (
    <ResizablePanel 
      defaultSize={isCollapsed ? 5 : 20} 
      minSize={isCollapsed ? 5 : 15} 
      maxSize={isCollapsed ? 5 : 40}
      className={`border-r border-border h-[calc(100vh-3.5rem)] bg-sidebar transition-all duration-300 ${isCollapsed ? 'w-16' : ''}`}
    >
      <div className="relative h-full flex flex-col">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-[-12px] z-50 h-6 w-6 rounded-full border bg-background shadow-md hover:bg-accent/50"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <ChevronLeft className={`h-4 w-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
        </Button>
        
        <div className="flex-1 overflow-hidden h-full">
          {activeProject ? 
            <ProjectView isCollapsed={isCollapsed} /> : 
            <ProjectList isCollapsed={isCollapsed} />
          }
        </div>
      </div>
    </ResizablePanel>
  );
};

export default Sidebar;
