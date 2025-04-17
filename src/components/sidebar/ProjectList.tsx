
import { Folder } from "lucide-react";
import { useActiveProject } from "@/hooks/use-active-project";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface ProjectListProps {
  isCollapsed: boolean;
}

const projects = [
  {
    id: "1",
    name: "tangle-example",
    path: "/projects/tangle-example"
  },
  {
    id: "2",
    name: "infra-blueprints",
    path: "/projects/infra-blueprints"
  }
];

const ProjectList = ({ isCollapsed }: ProjectListProps) => {
  const setActiveProject = useActiveProject((state) => state.setActiveProject);

  const ProjectButton = ({ project }) => (
    <Button
      key={project.id}
      variant="ghost"
      className="w-full justify-start"
      onClick={() => setActiveProject(project)}
    >
      <Folder className="mr-2 h-4 w-4" />
      {!isCollapsed && project.name}
    </Button>
  );

  return (
    <div className="p-4 space-y-4">
      {!isCollapsed && <h2 className="text-lg font-semibold mb-4">Projects</h2>}
      <div className="space-y-2">
        {projects.map((project) => (
          isCollapsed ? (
            <Tooltip key={project.id}>
              <TooltipTrigger asChild>
                <div>
                  <ProjectButton project={project} />
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                {project.name}
              </TooltipContent>
            </Tooltip>
          ) : (
            <ProjectButton key={project.id} project={project} />
          )
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
