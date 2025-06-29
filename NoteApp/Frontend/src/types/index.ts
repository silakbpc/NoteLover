export interface User {
  _id: string;
  username: string;
}

export interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
  type: string;
  userId: string;
}

export interface NoteType {
  _id: string;
  name: string;
}