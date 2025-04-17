
import { Folder } from "lucide-react";
import { useActiveProject } from "@/hooks/use-active-project";
import { Button } from "@/components/ui/button";

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

const ProjectList = () => {
  const setActiveProject = useActiveProject((state) => state.setActiveProject);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-semibold mb-4">Projects</h2>
      <div className="space-y-2">
        {projects.map((project) => (
          <Button
            key={project.id}
            variant="ghost"
            className="w-full justify-start"
            onClick={() => setActiveProject(project)}
          >
            <Folder className="mr-2 h-4 w-4" />
            {project.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ProjectList;
