import { useState, useRef, useEffect } from "react";
import { Send, User, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CodeBlock from "@/components/chat/CodeBlock";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  timestamp: Date;
  code?: string;
}

interface ChatInterfaceProps {
  onSendMessage?: (message: string) => void;
  welcomeMessage?: string;
}

const aiResponses = {
  "create": "I can help you create a new Tangle Blueprint! Let's start by defining the basic structure. Here's a template to get you started:\n\n```rust\nfn main() {\n  let mut blueprint = Blueprint::new(\"my-service\");\n  \n  // Add your components here\n  \n  blueprint.deploy();\n}\n```\n\nWould you like me to add specific infrastructure components?",
  
  "components": "Tangle Blueprint supports several infrastructure components including:\n\n1. **Compute** - VMs, containers, serverless functions\n2. **Storage** - Object storage, block storage, databases\n3. **Networking** - VPCs, load balancers, CDNs\n4. **Security** - IAM policies, encryption, firewalls\n\nWhich components would you like to add to your blueprint?",
  
  "help": "I can help you with several aspects of Tangle Blueprint:\n\n- Creating new blueprints\n- Adding infrastructure components\n- Debugging configuration issues\n- Optimizing for cost or performance\n- Explaining concepts and best practices\n\nWhat specific aspect are you interested in?",
  
  "deploy": "To deploy your Tangle Blueprint, you'll need to make sure your code is valid and that you have proper credentials configured. The deployment process involves:\n\n1. Validating the blueprint\n2. Planning the changes\n3. Applying the infrastructure changes\n\nWould you like me to help you set up the deployment process?",
  
  "debug": "I notice there might be an issue with your blueprint configuration. The error suggests that the `WebServer` component is missing required parameters. Try adding the following to fix it:\n\n```rust\nblueprint.add_component(\"web_server\", WebServer::new()\n  .with_instance_type(\"t3.medium\")\n  .with_capacity(2)\n);\n```\n\nThis sets the instance type and capacity for proper scaling."
};

const getAIResponse = (message: string): string => {
  const lowercaseMsg = message.toLowerCase();
  
  if (lowercaseMsg.includes("create") || lowercaseMsg.includes("new blueprint")) {
    return aiResponses.create;
  } else if (lowercaseMsg.includes("components") || lowercaseMsg.includes("infrastructure")) {
    return aiResponses.components;
  } else if (lowercaseMsg.includes("help") || lowercaseMsg.includes("how to")) {
    return aiResponses.help;
  } else if (lowercaseMsg.includes("deploy") || lowercaseMsg.includes("publish")) {
    return aiResponses.deploy;
  } else if (lowercaseMsg.includes("error") || lowercaseMsg.includes("debug") || lowercaseMsg.includes("fix")) {
    return aiResponses.debug;
  } else {
    return "I understand you're asking about Tangle Blueprint. Could you provide more details about what you need help with? I can assist with creating components, debugging, or explaining concepts.";
  }
};

const ChatInterface = ({ onSendMessage, welcomeMessage }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: welcomeMessage || "Hello! I'm your AI assistant for Tangle Blueprint. I can help you create and modify infrastructure-as-code templates. How can I assist you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newUserMessage: Message = {
        id: Date.now().toString(),
        text: inputValue,
        sender: "user",
        timestamp: new Date(),
      };
      
      setMessages((prevMessages) => [...prevMessages, newUserMessage]);
      
      if (onSendMessage) {
        onSendMessage(inputValue);
      }
      
      // Simulate AI response with more context-aware responses
      setTimeout(() => {
        const aiResponse: Message = {
          id: `ai-${Date.now()}`,
          text: getAIResponse(inputValue),
          sender: "ai",
          timestamp: new Date(),
        };
        setMessages((prevMessages) => [...prevMessages, aiResponse]);
      }, 1000);
      
      setInputValue("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-card">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`chat-message ${message.sender === "user" ? "user" : "ai"} flex`}
            >
              <div className="flex-shrink-0 mr-3 mt-1">
                {message.sender === "user" ? (
                  <div className="bg-primary h-8 w-8 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-primary-foreground" />
                  </div>
                ) : (
                  <div className="bg-muted h-8 w-8 rounded-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                {message.text.includes("```") ? (
                  <>
                    <p className="text-sm whitespace-pre-wrap">
                      {message.text.split("```")[0]}
                    </p>
                    {message.text.split("```").length > 1 && 
                     message.text.split("```")[1] && (
                      <CodeBlock 
                        code={message.text.split("```")[1].replace(/^(rust|js|javascript|typescript)\n/, '')} 
                        language={
                          message.text.match(/```(rust|js|javascript|typescript)/) 
                            ? message.text.match(/```(rust|js|javascript|typescript)/)?.[1] || "rust"
                            : "rust"
                        }
                      />
                    )}
                    {message.text.split("```").length > 2 && (
                      <p className="text-sm whitespace-pre-wrap">
                        {message.text.split("```").slice(2).join("```")}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                )}
                <span className="text-xs text-muted-foreground">
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="border-t border-border p-4">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button onClick={handleSendMessage} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
