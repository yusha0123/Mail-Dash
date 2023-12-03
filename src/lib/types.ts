export type SentMail = {
  id?: string;
  receiver: string;
  subject: string;
  body: string;
  date: Date;
};

export type ReceivedMail = {
  id?: string;
  sender: string;
  subject: string;
  body: string;
  isRead: boolean;
  date: Date;
};
