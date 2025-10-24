
export enum Label {
  IMPORTANT = 'IMPORTANT',
  PROMOTIONS = 'PROMOTIONS',
  SOCIAL = 'SOCIAL',
  UPDATES = 'UPDATES',
  WORK = 'WORK',
  SPAM = 'SPAM',
}

export interface Email {
  id: string;
  sender: string;
  subject: string;
  body: string;
  label: Label | null;
  summary: string | null;
  timestamp: string;
}

export interface CategorizedEmail {
    label: Label;
    summary: string;
}

export interface User {
    name: string;
    email: string;
}
