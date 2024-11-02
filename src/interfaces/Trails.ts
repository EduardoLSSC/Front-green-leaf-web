import { User } from "./User";

interface Path {
  type: "LineString";
  coordinates: [number, number][];
}

export interface Trail {
  id: string;
  name: string;
  difficulty: string;
  distance: number;
  description: string;
  location: string;
  rating: number;
  photo: string;
  path: Path;
  createdBy: User;
  author?: string;
}
