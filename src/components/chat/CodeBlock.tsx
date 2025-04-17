
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

const CodeBlock = ({ code, language = "rust", className }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn("relative my-3 bg-code rounded-md overflow-hidden", className)}>
      <div className="flex items-center justify-between px-4 py-1.5 bg-secondary text-secondary-foreground text-xs">
        <span>{language}</span>
        <button
          onClick={copyToClipboard}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm font-mono text-code-foreground">
        {code}
      </pre>
    </div>
  );
};

export default CodeBlock;
