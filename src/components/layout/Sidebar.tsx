
import { useActiveProject } from "@/hooks/use-active-project";
import ProjectList from "../sidebar/ProjectList";
import ProjectView from "../sidebar/ProjectView";

const Sidebar = () => {
  const activeProject = useActiveProject((state) => state.activeProject);

  return (
    <aside className="w-60 border-r border-border bg-card flex flex-col h-full">
      {activeProject ? <ProjectView /> : <ProjectList />}
    </aside>
  );
};

export default Sidebar;
