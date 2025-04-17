
import { useState } from "react";
import { Folder, FolderPlus, RefreshCw, File, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Project {
  id: string;
  name: string;
  path: string;
}

interface ProjectFile {
  id: string;
  name: string;
  type: "file" | "folder";
  path: string;
  children?: ProjectFile[];
}

const ProjectManager = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      name: "tangle-example",
      path: "/projects/tangle-example"
    }
  ]);
  
  const [files, setFiles] = useState<ProjectFile[]>([
    {
      id: "1",
      name: "src",
      type: "folder",
      path: "/src",
      children: [
        {
          id: "2",
          name: "main.rs",
          type: "file",
          path: "/src/main.rs"
        },
        {
          id: "3",
          name: "blueprint.rs",
          type: "file",
          path: "/src/blueprint.rs"
        }
      ]
    },
    {
      id: "4",
      name: "Cargo.toml",
      type: "file",
      path: "/Cargo.toml"
    },
    {
      id: "5",
      name: "README.md",
      type: "file",
      path: "/README.md"
    }
  ]);
  
  const [projectName, setProjectName] = useState("");

  const handleCreateProject = () => {
    if (projectName) {
      const newProject: Project = {
        id: Date.now().toString(),
        name: projectName,
        path: `/projects/${projectName}`
      };
      
      setProjects([...projects, newProject]);
      setProjectName("");
    }
  };

  const renderFiles = (files: ProjectFile[], depth = 0) => {
    return files.map(file => (
      <div key={file.id}>
        <div className="project-file" style={{ paddingLeft: `${depth * 12 + 8}px` }}>
          {file.type === "folder" ? (
            <Folder size={16} className="text-primary" />
          ) : (
            <File size={16} />
          )}
          <span>{file.name}</span>
        </div>
        {file.children && renderFiles(file.children, depth + 1)}
      </div>
    ));
  };

  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Projects</h2>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <FolderPlus size={16} className="mr-2" />
                New
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Project Name
                  </label>
                  <Input
                    id="name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="my-tangle-project"
                  />
                </div>
                <Button onClick={handleCreateProject} className="w-full">
                  Create Project
                </Button>
              </div>
            </DialogContent>
          </Dialog>
          <Button size="sm" variant="outline">
            <RefreshCw size={16} />
          </Button>
        </div>
      </div>
      
      <div className="border rounded-md mb-4">
        <div className="p-3 border-b bg-secondary/30 flex items-center gap-2">
          <Package size={16} />
          <span className="font-medium">tangle-example</span>
        </div>
        <div className="p-2 max-h-[300px] overflow-y-auto">
          {renderFiles(files)}
        </div>
      </div>
    </div>
  );
};

export default ProjectManager;
