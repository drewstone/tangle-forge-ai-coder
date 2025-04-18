
import { useState } from "react";
import { useActiveProject } from "@/hooks/use-active-project";
import ProjectList from "../sidebar/ProjectList";
import ProjectView from "../sidebar/ProjectView";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const Sidebar = () => {
  const activeProject = useActiveProject((state) => state.activeProject);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`border-r border-border bg-card flex flex-col h-screen relative transition-all duration-200 ${isCollapsed ? 'w-12' : 'w-60'}`}>
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-4 z-50"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <ChevronLeft className={`h-4 w-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} />
      </Button>
      <div className="flex-1 overflow-hidden">
        {activeProject ? 
          <ProjectView isCollapsed={isCollapsed} /> : 
          <ProjectList isCollapsed={isCollapsed} />
        }
      </div>
    </aside>
  );
};

export default Sidebar;
