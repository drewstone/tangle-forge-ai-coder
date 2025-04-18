
import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import Terminal from "./Terminal";

interface CodeEditorProps {
  defaultValue?: string;
  language?: string;
  onChange?: (value: string | undefined) => void;
}

const CodeEditor = ({
  defaultValue = "// Start coding here...",
  language = "rust",
  onChange,
}: CodeEditorProps) => {
  const [value, setValue] = useState(defaultValue);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  
  const handleEditorChange = (value: string | undefined) => {
    setValue(value || "");
    if (onChange) {
      onChange(value);
    }
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  // Auto-save functionality
  useEffect(() => {
    const interval = setInterval(() => {
      // This is where we would send the value to the backend
      console.log("Auto-saving...", value.substring(0, 50) + (value.length > 50 ? "..." : ""));
      // In a real app, this would call an API endpoint
    }, 10000); // Every 10 seconds

    return () => clearInterval(interval);
  }, [value]);

  // Simulate saving to backend
  const handleSave = () => {
    // In a real app, this would call an API endpoint
    window.addTerminalMessage?.("Saving file...", "info");
    setTimeout(() => {
      window.addTerminalMessage?.("File saved successfully", "success");
    }, 500);
  };

  // Simulate running code on backend
  const handleRun = () => {
    window.addTerminalMessage?.("Building project...", "command");
    setIsTerminalOpen(true);
    
    setTimeout(() => {
      window.addTerminalMessage?.("Compiling main.rs...", "info");
    }, 500);
    
    setTimeout(() => {
      window.addTerminalMessage?.("Build successful", "success");
    }, 2000);
    
    setTimeout(() => {
      window.addTerminalMessage?.("Running program...", "command");
    }, 2500);
    
    setTimeout(() => {
      window.addTerminalMessage?.("Welcome to Tangle Blueprint!", "success");
      window.addTerminalMessage?.("Infrastructure components initialized", "info");
      window.addTerminalMessage?.("Deployment successful", "success");
    }, 3500);
  };

  return (
    <div className="h-full w-full overflow-hidden relative">
      <Editor
        height="100%"
        width="100%"
        language={language}
        value={value}
        theme={isDarkTheme ? "vs-dark" : "light"}
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          wordWrap: 'on',
          automaticLayout: true,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          folding: true,
          tabSize: 2,
        }}
      />
      <Terminal 
        isOpen={isTerminalOpen} 
        onToggle={() => setIsTerminalOpen(!isTerminalOpen)} 
      />
    </div>
  );
};

export default CodeEditor;
