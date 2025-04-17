
import { useState } from "react";
import Editor from "@monaco-editor/react";

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
  
  const handleEditorChange = (value: string | undefined) => {
    setValue(value || "");
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div className="h-full w-full overflow-hidden">
      <Editor
        height="100%"
        width="100%"
        language={language}
        value={value}
        theme="vs-dark"
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
    </div>
  );
};

export default CodeEditor;
