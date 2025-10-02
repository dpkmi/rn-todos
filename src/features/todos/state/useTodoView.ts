import { create } from "zustand";

export type TodoFilter = "all" | "active" | "completed";
export type TodoSort = "newest" | "oldest" | "due-soon" | "due-late";

type State = {
  filter: TodoFilter;
  sort: TodoSort;
  setFilter: (f: TodoFilter) => void;
  setSort: (s: TodoSort) => void;
  reset: () => void;
};

export const useTodoView = create<State>((set) => ({
  filter: "all",
  sort: "newest",
  setFilter: (f) => set({ filter: f }),
  setSort: (s) => set({ sort: s }),
  reset: () => set({ filter: "all", sort: "newest" }),
}));
