
import { create } from 'zustand';

interface FileContent {
  content: string;
  lastModified: number;
}

interface FileCacheStore {
  files: Record<string, FileContent>;
  getFile: (path: string) => FileContent | undefined;
  setFile: (path: string, content: string) => void;
  hasFile: (path: string) => boolean;
}

export const useFileCache = create<FileCacheStore>((set, get) => ({
  files: {},
  
  getFile: (path: string) => {
    return get().files[path];
  },
  
  setFile: (path: string, content: string) => {
    set((state) => ({
      files: {
        ...state.files,
        [path]: {
          content,
          lastModified: Date.now()
        }
      }
    }));
  },
  
  hasFile: (path: string) => {
    return path in get().files;
  }
}));
