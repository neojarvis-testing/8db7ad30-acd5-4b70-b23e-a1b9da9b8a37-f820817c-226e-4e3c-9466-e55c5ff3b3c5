import { User } from "./user.model";

export interface Feedback {
  feedbackId: number;
  userId: number;
  user?: User;
  feedbackText: string;
  date: Date;
}