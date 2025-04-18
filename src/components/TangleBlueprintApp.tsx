
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

  // Current file being edited
  const [currentFile, setCurrentFile] = useState("main.rs");
  const [currentCode, setCurrentCode] = useState(defaultCode);
  const [editorTheme, setEditorTheme] = useState<"vs-dark" | "light" | "system">("vs-dark");
  const [terminalVisible, setTerminalVisible] = useState(false);
  
  const activeProject = useActiveProject((state) => state.activeProject);
  const setActiveProject = useActiveProject((state) => state.setActiveProject);
  const fileCache = useFileCache();

  // Initialize file cache with default file
  useEffect(() => {
    if (!fileCache.hasFile("main.rs")) {
      fileCache.setFile("main.rs", defaultCode);
    }
    
    // Load from cache if available
    const cachedFile = fileCache.getFile(currentFile);
    if (cachedFile) {
      setCurrentCode(cachedFile.content);
    }
  }, []);

  // Update cache when current file or code changes
  useEffect(() => {
    if (currentFile && currentCode) {
      fileCache.setFile(currentFile, currentCode);
    }
  }, [currentFile, currentCode]);

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
    
    // Simulate AI processing with terminal output
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

  const handleSaveCode = () => {
    // Cache the current file content
    fileCache.setFile(currentFile, currentCode);
    toast.success("Code saved successfully");
    window.addTerminalMessage?.(`File ${currentFile} saved to backend`, "success");
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

  const handleThemeChange = (theme: "vs-dark" | "light" | "system") => {
    setEditorTheme(theme);
    toast.info(`Switched to ${theme} theme`);
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
          <ResizableHandle />
          <ResizablePanel defaultSize={65} minSize={30}>
            <div className="flex flex-col h-full">
              <EditorToolbar 
                onSave={handleSaveCode} 
                onRun={handleRunCode}
                onThemeChange={handleThemeChange}
                isDarkTheme={editorTheme === "vs-dark"}
              />
              <div className="flex-1 overflow-hidden relative">
                <CodeEditor 
                  defaultValue={currentCode}
                  onChange={handleEditorChange}
                  theme={editorTheme === "system" ? 
                    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "vs-dark" : "light") : 
                    editorTheme} 
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
