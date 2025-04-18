
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
  const [cursorPosition, setCursorPosition] = useState(0);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

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

  // Simulate streaming response from server
  const simulateStreamingResponse = (command: string) => {
    // Add user command to terminal
    addMessage(`$ ${command}`, "command");
    
    // Add to command history
    setCommandHistory(prev => [...prev, command]);
    setHistoryIndex(-1);
    
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
      
    } else if (command.includes("clear")) {
      clearTerminal();
    } else if (command.trim() === "") {
      // Just add a new line
    } else {
      // Echo command back with some flair
      setTimeout(() => {
        addMessage(`Executing: ${command}`, "info");
      }, 100);
      
      setTimeout(() => {
        addMessage(`Command '${command}' executed`, "success");
      }, 500);
    }
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() !== "" || inputValue === "") {
      simulateStreamingResponse(inputValue);
      setInputValue("");
      setCursorPosition(0);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setCursorPosition(e.target.selectionStart || 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      // Navigate up through command history
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        if (newIndex >= 0) {
          const command = commandHistory[commandHistory.length - 1 - newIndex];
          setInputValue(command);
          setTimeout(() => {
            if (inputRef.current) {
              inputRef.current.selectionStart = command.length;
              inputRef.current.selectionEnd = command.length;
              setCursorPosition(command.length);
            }
          }, 0);
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      // Navigate down through command history
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        const command = commandHistory[commandHistory.length - 1 - newIndex];
        setInputValue(command);
        setTimeout(() => {
          if (inputRef.current) {
            inputRef.current.selectionStart = command.length;
            inputRef.current.selectionEnd = command.length;
            setCursorPosition(command.length);
          }
        }, 0);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputValue("");
        setCursorPosition(0);
      }
    } else if (e.key === "ArrowLeft") {
      const pos = e.currentTarget.selectionStart || 0;
      setTimeout(() => setCursorPosition(pos - 1 >= 0 ? pos - 1 : 0), 0);
    } else if (e.key === "ArrowRight") {
      const pos = e.currentTarget.selectionStart || 0;
      setTimeout(() => setCursorPosition(pos + 1 <= inputValue.length ? pos + 1 : inputValue.length), 0);
    } else if (e.key === "Home") {
      setTimeout(() => setCursorPosition(0), 0);
    } else if (e.key === "End") {
      setTimeout(() => setCursorPosition(inputValue.length), 0);
    } else {
      // For other keys, update cursor position after a short delay
      setTimeout(() => {
        if (inputRef.current) {
          setCursorPosition(inputRef.current.selectionStart || 0);
        }
      }, 0);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLInputElement>) => {
    setTimeout(() => {
      if (inputRef.current) {
        setCursorPosition(inputRef.current.selectionStart || 0);
      }
    }, 0);
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

  // Update expanded state when isOpen prop changes
  useEffect(() => {
    setExpanded(isOpen);
  }, [isOpen]);

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
      onClick={handleTerminalClick}
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
        className="flex-1 overflow-hidden cursor-text"
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
      
      <form onSubmit={handleInputSubmit} className="px-4 py-2 border-t border-white/10 flex relative">
        <span className="text-green-400 mr-2">$</span>
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onClick={handleClick}
            className="w-full bg-transparent border-none outline-none text-white font-mono caret-transparent"
            placeholder=""
            autoComplete="off"
            autoCapitalize="off"
            spellCheck="false"
          />
          <div 
            className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none font-mono whitespace-pre"
          >
            <span className="opacity-0">{inputValue.substring(0, cursorPosition)}</span>
            <span 
              ref={cursorRef} 
              className="inline-block w-[2px] h-[14px] bg-white animate-blink-fast align-middle"
            ></span>
          </div>
        </div>
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
