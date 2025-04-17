
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import CodeEditor from "@/components/editor/CodeEditor";
import EditorToolbar from "@/components/editor/EditorToolbar";
import ChatInterface from "@/components/chat/ChatInterface";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { toast } from "sonner";
import { useActiveProject } from "@/hooks/use-active-project";

const TangleBlueprintApp = () => {
  const [defaultCode] = useState(`fn main() {
    println!("Welcome to Tangle Blueprint!");
    
    // This is where your infrastructure code will go
    let blueprint = create_blueprint();
    
    // Define your infrastructure components
    blueprint.add_component("web_server", WebServer::new());
    blueprint.add_component("database", Database::new());
    
    // Deploy your infrastructure
    blueprint.deploy();
  }`);

  const activeProject = useActiveProject((state) => state.activeProject);
  const setActiveProject = useActiveProject((state) => state.setActiveProject);

  const handleSendMessage = (message: string) => {
    if (!activeProject) {
      // Create a new project when first message is sent
      const newProject = {
        id: Date.now().toString(),
        name: message.slice(0, 30),
        path: `/projects/${message.slice(0, 30).toLowerCase().replace(/\s+/g, '-')}`
      };
      setActiveProject(newProject);
    }
  };

  const handleSaveCode = () => {
    toast.success("Code saved successfully");
  };

  const handleRunCode = () => {
    toast.info("Running code...");
    setTimeout(() => {
      toast.success("Code executed successfully");
    }, 2000);
  };

  return (
    <MainLayout>
      {activeProject ? (
        <ResizablePanelGroup direction="horizontal" className="h-[calc(100vh-3.5rem)]">
          <ResizablePanel defaultSize={35} minSize={20}>
            <ChatInterface onSendMessage={handleSendMessage} />
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={65} minSize={30}>
            <div className="flex flex-col h-full">
              <EditorToolbar onSave={handleSaveCode} onRun={handleRunCode} />
              <div className="flex-1 overflow-hidden">
                <CodeEditor defaultValue={defaultCode} />
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      ) : (
        <div className="flex items-center justify-center h-[calc(100vh-3.5rem)] bg-card">
          <div className="max-w-2xl w-full px-4">
            <ChatInterface 
              onSendMessage={handleSendMessage}
              welcomeMessage="What Tangle Blueprint do you want to imagine?"
            />
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default TangleBlueprintApp;
