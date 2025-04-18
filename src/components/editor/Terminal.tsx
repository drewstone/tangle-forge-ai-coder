
import { useState, useRef, useEffect } from "react";
import { ChevronUp, ChevronDown, X, Terminal as TerminalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const terminalRef = useRef<HTMLDivElement>(null);

  const toggleExpanded = () => {
    const newState = !expanded;
    setExpanded(newState);
    if (onToggle) onToggle();
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

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
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
        className="flex-1 overflow-auto p-4 font-mono text-sm"
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`mb-1 ${getMessageClass(msg.type)}`}>
            <span className="text-muted-foreground mr-2 opacity-60">
              [{msg.timestamp.toLocaleTimeString()}]
            </span>
            {msg.text}
          </div>
        ))}
      </div>
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
