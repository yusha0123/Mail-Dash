import { ReceivedMail } from "@/lib/types";
import { create } from "zustand";

interface MailStore {
  mails: ReceivedMail[];
  loading: boolean;
  isLoading: (loading: boolean) => void;
  updateReceivedMails: (updatedMails: ReceivedMail[]) => void;
}

const useReceivedMailStore = create<MailStore>((set) => ({
  mails: [],
  loading: false,
  isLoading: (loading) => set({ loading }),
  updateReceivedMails: (updatedMails) => set({ mails: updatedMails }),
}));

export default useReceivedMailStore;
