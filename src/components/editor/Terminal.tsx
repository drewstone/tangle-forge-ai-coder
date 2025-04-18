
import { useState, useRef, useEffect } from "react";
import { ChevronUp, ChevronDown, X, Terminal as TerminalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TerminalProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

interface TerminalMessage {
  id: string;
  text: string;
  type: "info" | "error" | "success" | "command";
  timestamp: Date;
}

const Terminal = ({ isOpen = false, onToggle }: TerminalProps) => {
  const [expanded, setExpanded] = useState(isOpen);
  const [messages, setMessages] = useState<TerminalMessage[]>([
    {
      id: "welcome",
      text: "Welcome to Tangle Blueprint Terminal",
      type: "info",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const toggleExpanded = () => {
    const newState = !expanded;
    setExpanded(newState);
    if (onToggle) onToggle();
    
    // Focus input when expanding
    if (newState && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  const clearTerminal = () => {
    setMessages([
      {
        id: "cleared",
        text: "Terminal cleared",
        type: "info",
        timestamp: new Date()
      }
    ]);
  };

  // Example function to add messages to terminal (can be exposed as API)
  const addMessage = (text: string, type: TerminalMessage["type"] = "info") => {
    const newMessage = {
      id: Date.now().toString(),
      text,
      type,
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, newMessage]);
  };

  // Simulate streaming response
  const simulateStreamingResponse = (command: string) => {
    // Add user command to terminal
    addMessage(`$ ${command}`, "command");
    
    // For demonstration purposes - will be replaced with actual server calls
    if (command.includes("build") || command.includes("make")) {
      const steps = ["Compiling...", "Linking...", "Optimizing...", "Build successful"];
      let i = 0;
      
      const interval = setInterval(() => {
        addMessage(steps[i], i === steps.length - 1 ? "success" : "info");
        i++;
        
        if (i >= steps.length) {
          clearInterval(interval);
        }
      }, 500);
      
    } else {
      addMessage(`Command '${command}' executed`, "info");
    }
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    
    simulateStreamingResponse(inputValue);
    setInputValue("");
  };

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Expose the addMessage function to parent components
  useEffect(() => {
    // This makes the function available on the window object for demonstration
    // In a real app, you would use context, props, or a state management system
    window.addTerminalMessage = addMessage;
    
    return () => {
      // Clean up
      delete window.addTerminalMessage;
    };
  }, []);

  // Handle click anywhere in terminal to focus input
  const handleTerminalClick = () => {
    if (expanded && inputRef.current) {
      inputRef.current.focus();
    }
  };

  if (!expanded) {
    return (
      <div className="absolute bottom-0 left-0 right-0 flex justify-between items-center px-4 py-1 bg-card border-t border-border">
        <div className="flex items-center gap-2">
          <TerminalIcon className="h-4 w-4" />
          <span className="text-sm">Terminal</span>
        </div>
        <Button variant="ghost" size="sm" onClick={toggleExpanded}>
          <ChevronUp className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div 
      className="absolute bottom-0 left-0 right-0 flex flex-col bg-black text-white border-t border-border"
      style={{ height: "30vh", minHeight: "150px" }}
    >
      <div className="flex justify-between items-center px-4 py-1 bg-card text-card-foreground border-b border-border">
        <div className="flex items-center gap-2">
          <TerminalIcon className="h-4 w-4" />
          <span className="text-sm">Terminal</span>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" size="sm" onClick={clearTerminal}>
            <X className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={toggleExpanded}>
            <ChevronDown className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div 
        ref={terminalRef}
        className="flex-1 overflow-hidden"
        onClick={handleTerminalClick}
      >
        <ScrollArea className="h-full">
          <div className="p-4 font-mono text-sm">
            {messages.map((msg) => (
              <div key={msg.id} className={`mb-1 ${getMessageClass(msg.type)}`}>
                <span className="text-muted-foreground mr-2 opacity-60">
                  [{msg.timestamp.toLocaleTimeString()}]
                </span>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>
      
      <form onSubmit={handleInputSubmit} className="px-4 py-2 border-t border-white/10 flex">
        <span className="text-green-400 mr-2">$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-white font-mono"
          placeholder="Type command and press Enter..."
        />
      </form>
    </div>
  );
};

// Helper function to get styling based on message type
function getMessageClass(type: TerminalMessage["type"]): string {
  switch (type) {
    case "error":
      return "text-red-400";
    case "success":
      return "text-green-400";
    case "command":
      return "text-yellow-400";
    case "info":
    default:
      return "text-blue-400";
  }
}

// Extend window interface for TypeScript
declare global {
  interface Window {
    addTerminalMessage?: (text: string, type?: "info" | "error" | "success" | "command") => void;
  }
}

export default Terminal;
