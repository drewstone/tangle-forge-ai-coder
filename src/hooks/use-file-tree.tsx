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
      // Create a deep clone to avoid mutation issues
      const newStructure = JSON.parse(JSON.stringify(prev));
      
      // Navigate to the target directory using path segments
      const parts = path.split('/');
      let current = newStructure;
      
      // Navigate through the path segments
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        
        if (!current[part]) {
          return prev; // Path doesn't exist
        }
        
        if (i === parts.length - 1) {
          // Toggle only the target directory's expanded state
          current[part].expanded = !current[part].expanded;
        } else {
          // Keep navigating through the path
          current = current[part].children || {};
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
