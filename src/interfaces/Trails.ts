import { User } from "./User"

export interface Trail {
    id: string;
    name: string;
    difficulty: string;
    distance: number;
    rating: number;
    photo: string;
    createdBy: User;
    author?: string;
  }

