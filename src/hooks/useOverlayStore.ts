import { create } from "zustand";

export type overlayType =
  | "mobileSidebar"
  | "profileModal"
  | "deleteModal"
  | "resetPasswordModal";

interface AdditionalData {
  mailType?: "sent" | "received";
  id?: string;
}

interface overlayStore {
  type: overlayType | null;
  isOpen: boolean;
  additionalData: AdditionalData;
  onOpen: (type: overlayType, data?: AdditionalData) => void;
  onClose: () => void;
}

const useOverlayStore = create<overlayStore>((set) => ({
  type: null,
  isOpen: false,
  additionalData: {},
  onOpen: (type, data) => {
    set({ isOpen: true, type, additionalData: { ...data } });
  },
  onClose: () => set({ type: null, isOpen: false, additionalData: {} }),
}));

export default useOverlayStore;
