export type Todo = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: number;
  dueAt?: number;
  location?: string;
};
