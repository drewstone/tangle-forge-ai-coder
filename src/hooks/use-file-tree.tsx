
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
      const newStructure = JSON.parse(JSON.stringify(prev)); // Deep clone to avoid mutation issues
      const parts = path.split('/');
      let current = newStructure;
      let parentPath = '';
      
      // Navigate to the target directory
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        const currentPath = parentPath ? `${parentPath}/${part}` : part;
        
        if (!current[part]) {
          return prev; // Path doesn't exist
        }
        
        if (i === parts.length - 1) {
          // Toggle only the target directory
          current[part] = {
            ...current[part],
            expanded: !current[part].expanded
          };
          return newStructure;
        }
        
        // Continue navigating down the path
        if (current[part].type === 'directory') {
          current = current[part].children || {};
          parentPath = currentPath;
        } else {
          return prev; // Not a directory, can't continue
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
