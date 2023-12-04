export type SentMail = {
  id?: string;
  receiver: string;
  subject: string;
  body: string;
  date: {
    seconds: number;
    nanoseconds: number;
  };
};

export type ReceivedMail = {
  id?: string;
  sender: string;
  subject: string;
  body: string;
  isRead: boolean;
  date: {
    seconds: number;
    nanoseconds: number;
  };
};
