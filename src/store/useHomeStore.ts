import { create } from 'zustand';

interface HomeState {
  selectedID: string | null;
  setSelectedID: (id: string) => void;
  clearSelectedID: () => void;
}

export const useHomeState = create<HomeState>((set) => ({
  selectedID: null,
  setSelectedID: (id) => set({ selectedID: id }),
  clearSelectedID: () => set({ selectedID: null }),
}));
