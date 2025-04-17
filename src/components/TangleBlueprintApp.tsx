
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import CodeEditor from "@/components/editor/CodeEditor";
import EditorToolbar from "@/components/editor/EditorToolbar";
import ChatInterface from "@/components/chat/ChatInterface";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProjectManager from "@/components/project/ProjectManager";
import { toast } from "sonner";

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
}

fn create_blueprint() -> Blueprint {
  Blueprint::new("my-infrastructure")
}`);

  const handleSendMessage = (message: string) => {
    console.log("Sending message:", message);
    // Here you would integrate with your AI service
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
      <ResizablePanelGroup direction="horizontal" className="h-[calc(100vh-3.5rem)]">
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30} className="bg-card">
          <Tabs defaultValue="files">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="files">Files</TabsTrigger>
              <TabsTrigger value="blueprint">Blueprint</TabsTrigger>
            </TabsList>
            <TabsContent value="files" className="h-[calc(100vh-6rem)]">
              <ProjectManager />
            </TabsContent>
            <TabsContent value="blueprint" className="h-[calc(100vh-6rem)] p-4">
              <div className="text-sm text-muted-foreground">
                <h3 className="font-medium text-foreground mb-2">Blueprint Components</h3>
                <p>Your blueprint configuration and components will appear here.</p>
                <div className="mt-4 p-3 border rounded-md">
                  <div className="font-medium">Infrastructure</div>
                  <ul className="mt-2 space-y-2 text-xs">
                    <li className="flex items-center justify-between">
                      <span>Web Server</span>
                      <span className="text-green-500">Active</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Database</span>
                      <span className="text-green-500">Active</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Storage</span>
                      <span className="text-muted-foreground">Not Configured</span>
                    </li>
                  </ul>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={45} minSize={30}>
          <div className="flex flex-col h-full">
            <EditorToolbar onSave={handleSaveCode} onRun={handleRunCode} />
            <div className="flex-1 overflow-hidden">
              <CodeEditor defaultValue={defaultCode} language="rust" />
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={35} minSize={25}>
          <ChatInterface onSendMessage={handleSendMessage} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </MainLayout>
  );
};

export default TangleBlueprintApp;
