
import React from 'react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator
} from "@/components/ui/context-menu";
import { FilePlus, FolderPlus } from "lucide-react";
import { toast } from "sonner";

interface FileContextMenuProps {
  children: React.ReactNode;
  path: string;
  isDirectory?: boolean;
}

const FileContextMenu = ({ children, path, isDirectory = false }: FileContextMenuProps) => {
  const handleCreateFile = () => {
    const fileName = prompt("Enter file name:");
    if (fileName) {
      // Will be connected to backend later
      toast.success(`Created file ${fileName} in ${path}`);
    }
  };

  const handleCreateFolder = () => {
    const folderName = prompt("Enter folder name:");
    if (folderName) {
      // Will be connected to backend later
      toast.success(`Created folder ${folderName} in ${path}`);
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        {isDirectory && (
          <>
            <ContextMenuItem onClick={handleCreateFile}>
              <FilePlus className="mr-2 h-4 w-4" />
              New File
            </ContextMenuItem>
            <ContextMenuItem onClick={handleCreateFolder}>
              <FolderPlus className="mr-2 h-4 w-4" />
              New Folder
            </ContextMenuItem>
            <ContextMenuSeparator />
          </>
        )}
        <ContextMenuItem>Rename</ContextMenuItem>
        <ContextMenuItem className="text-destructive">Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default FileContextMenu;
