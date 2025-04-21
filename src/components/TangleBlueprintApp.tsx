import { useState, useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import CodeEditor from "@/components/editor/CodeEditor";
import EditorToolbar from "@/components/editor/EditorToolbar";
import Terminal from "@/components/editor/Terminal";
import ChatInterface from "@/components/chat/ChatInterface";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { toast } from "sonner";
import { useActiveProject } from "@/hooks/use-active-project";
import { useFileCache } from "@/hooks/use-file-cache";
import { useTheme } from "@/hooks/use-theme";
import { Code, Sparkles } from "lucide-react";

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

  const [currentFile, setCurrentFile] = useState("main.rs");
  const [currentCode, setCurrentCode] = useState(defaultCode);
  const [terminalVisible, setTerminalVisible] = useState(false);
  
  const { theme } = useTheme();
  
  const activeProject = useActiveProject((state) => state.activeProject);
  const setActiveProject = useActiveProject((state) => state.setActiveProject);
  const fileCache = useFileCache();

  useEffect(() => {
    if (!fileCache.hasFile("main.rs")) {
      fileCache.setFile("main.rs", defaultCode);
    }
    
    const cachedFile = fileCache.getFile(currentFile);
    if (cachedFile) {
      setCurrentCode(cachedFile.content);
    }
  }, []);

  useEffect(() => {
    let autoSaveInterval: NodeJS.Timeout;
    
    if (currentFile && currentCode) {
      autoSaveInterval = setInterval(() => {
        fileCache.setFile(currentFile, currentCode);
        console.log(`Auto-saving... ${currentCode.slice(0, 40)}...`);
      }, 10000);
    }
    
    return () => {
      if (autoSaveInterval) {
        clearInterval(autoSaveInterval);
      }
    };
  }, [currentFile, currentCode, fileCache]);
  
  useEffect(() => {
    if (currentFile && currentCode) {
      fileCache.setFile(currentFile, currentCode);
    }
  }, [currentFile, currentCode]);

  const handleSendMessage = (message: string) => {
    if (!activeProject) {
      const newProject = {
        id: Date.now().toString(),
        name: message.slice(0, 30),
        path: `/projects/${message.slice(0, 30).toLowerCase().replace(/\s+/g, '-')}`
      };
      setActiveProject(newProject);
    }
    
    window.addTerminalMessage?.(`Processing: ${message}`, "info");
    setTerminalVisible(true);
    
    setTimeout(() => {
      window.addTerminalMessage?.("Thinking...", "info");
    }, 500);
    
    setTimeout(() => {
      window.addTerminalMessage?.("Generating blueprint...", "info");
    }, 1500);
    
    setTimeout(() => {
      window.addTerminalMessage?.("Blueprint generated successfully!", "success");
    }, 3000);
  };

  const handleRunCode = () => {
    toast.info("Running code...");
    window.addTerminalMessage?.("Executing code on backend server...", "command");
    setTerminalVisible(true);
    
    setTimeout(() => {
      window.addTerminalMessage?.("Build successful", "success");
      toast.success("Code executed successfully");
    }, 2000);
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCurrentCode(value);
    }
  };

  return (
    <MainLayout>
      {activeProject ? (
        <ResizablePanelGroup direction="horizontal" className="h-[calc(100vh-3.5rem)]">
          <ResizablePanel defaultSize={35} minSize={20}>
            <ChatInterface onSendMessage={handleSendMessage} />
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={65} minSize={30}>
            <div className="flex flex-col h-full">
              <EditorToolbar onRun={handleRunCode} />
              <div className="flex-1 overflow-hidden relative">
                <CodeEditor 
                  defaultValue={currentCode}
                  onChange={handleEditorChange}
                />
                <Terminal 
                  isOpen={terminalVisible}
                  onToggle={() => setTerminalVisible(!terminalVisible)} 
                />
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      ) : (
        <div className="flex items-center justify-center h-[calc(100vh-3.5rem)] bg-background overflow-y-auto">
          <div className="max-w-4xl w-full px-6 py-12">
            <div className="mb-16 text-center space-y-6">
              <div className="flex items-center justify-center gap-3 mb-8">
                <Code className="h-12 w-12 text-primary" />
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h1 className="text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
                Tangle Blueprint
              </h1>
              <p className="text-3xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Design, deploy and manage your infrastructure with AI assistance.
              </p>
            </div>
            
            <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl shadow-2xl">
              <div className="p-6">
                <ChatInterface 
                  onSendMessage={handleSendMessage}
                  welcomeMessage="What infrastructure blueprint would you like to create today? I can help you design and implement your infrastructure using best practices."
                />
              </div>
            </div>
            
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-xl bg-card/40 border border-border hover:bg-card/60 transition-colors">
                <h3 className="text-xl font-semibold mb-3">Infrastructure as Code</h3>
                <p className="text-muted-foreground text-lg">Define your entire infrastructure stack using simple, readable code.</p>
              </div>
              
              <div className="p-8 rounded-xl bg-card/40 border border-border hover:bg-card/60 transition-colors">
                <h3 className="text-xl font-semibold mb-3">AI-Powered</h3>
                <p className="text-muted-foreground text-lg">Let the AI suggest optimizations and best practices for your deployments.</p>
              </div>
              
              <div className="p-8 rounded-xl bg-card/40 border border-border hover:bg-card/60 transition-colors">
                <h3 className="text-xl font-semibold mb-3">Multi-Cloud</h3>
                <p className="text-muted-foreground text-lg">Deploy to any cloud provider with a unified workflow and experience.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default TangleBlueprintApp;
