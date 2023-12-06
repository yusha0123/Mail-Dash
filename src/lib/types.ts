export interface FirebaseTimestamp {
  seconds: number;
  nanoseconds: number;
}

export type SentMail = {
  id?: string;
  receiver: string;
  subject: string;
  body: string;
  date: FirebaseTimestamp | Date;
};

export type ReceivedMail = {
  id?: string;
  sender: string;
  subject: string;
  body: string;
  isRead: boolean;
  date: FirebaseTimestamp | Date;
};
