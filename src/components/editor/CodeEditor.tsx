
import { useEffect } from "react";
import Editor from "@monaco-editor/react";
import { useTheme } from "@/hooks/use-theme";

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
  const { theme } = useTheme();

  return (
    <div className="h-full w-full overflow-hidden relative">
      <Editor
        height="100%"
        width="100%"
        language={language}
        defaultValue={defaultValue}
        theme={theme === "dark" ? "vs-dark" : "light"}
        onChange={onChange}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: 'on',
          automaticLayout: true,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          folding: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default CodeEditor;
