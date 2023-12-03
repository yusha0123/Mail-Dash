import { create } from "zustand";

export type overlayType = "mobileSidebar";

interface overlayStore {
  type: overlayType | null;
  isOpen: boolean;
  onOpen: (type: overlayType) => void;
  onClose: () => void;
}

const useOverlayStore = create<overlayStore>((set) => ({
  type: null,
  isOpen: false,
  onOpen: (type) => set({ isOpen: true, type }),
  onClose: () => set({ type: null, isOpen: false }),
}));

export default useOverlayStore;
