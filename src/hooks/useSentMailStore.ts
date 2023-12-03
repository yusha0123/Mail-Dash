import { SentMail } from "@/lib/types";
import { create } from "zustand";

interface MailStore {
  mails: SentMail[];
  loading: boolean;
  isLoading: (loading: boolean) => void;
  updateSentMails: (updatedMails: SentMail[]) => void;
}

const useSentMailStore = create<MailStore>((set) => ({
  mails: [],
  loading: false,
  isLoading: (loading) => set({ loading }),
  updateSentMails: (updatedMails) => set({ mails: updatedMails }),
}));

export default useSentMailStore;
