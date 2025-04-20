import { useState } from 'react';

interface FileNode {
  type: "file" | "directory";
  expanded?: boolean;
  children?: Record<string, FileNode>;
}

export const useFileTree = (initialStructure: Record<string, FileNode>) => {
  const [structure, setStructure] = useState(initialStructure);

  const toggleDirectory = (path: string) => {
    setStructure(prev => {
      const newStructure = { ...prev };
      let current = newStructure;
      const parts = path.split('/');

      // Navigate to the target directory
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (current[part] && current[part].type === 'directory') {
          if (i === parts.length - 1) {
            // Toggle only the target directory
            current[part] = {
              ...current[part],
              expanded: !current[part].expanded
            };
          } else {
            // Keep parent directories expanded
            current[part] = {
              ...current[part],
              expanded: true
            };
            current = current[part].children || {};
          }
        }
      }

      return newStructure;
    });
  };

  return {
    structure,
    setStructure,
    toggleDirectory
  };
};

export type { FileNode };
