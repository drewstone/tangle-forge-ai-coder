
import { create } from 'zustand'

interface Project {
  id: string;
  name: string;
  path: string;
}

interface ActiveProjectStore {
  activeProject: Project | null;
  setActiveProject: (project: Project | null) => void;
}

export const useActiveProject = create<ActiveProjectStore>((set) => ({
  activeProject: null,
  setActiveProject: (project) => set({ activeProject: project }),
}))
