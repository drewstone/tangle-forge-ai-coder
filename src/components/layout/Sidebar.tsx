
import { useState } from "react";
import { useActiveProject } from "@/hooks/use-active-project";
import ProjectList from "../sidebar/ProjectList";
import ProjectView from "../sidebar/ProjectView";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/use-theme";

const Sidebar = () => {
  const activeProject = useActiveProject((state) => state.activeProject);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme } = useTheme();

  return (
    <aside 
      className={`border-r border-border flex flex-col h-screen relative transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-12' : 'w-60'
      } ${theme === 'dark' ? 'bg-zinc-900' : 'bg-zinc-50'}`}
    >
      <Button
        variant="ghost"
        size="icon"
        className={`absolute top-4 z-50 shadow-md bg-background border border-border rounded-full transition-all duration-300 ${
          isCollapsed ? '-right-3' : '-right-3'
        }`}
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <ChevronLeft className={`h-4 w-4 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
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
