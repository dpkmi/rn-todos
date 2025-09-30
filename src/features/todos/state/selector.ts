import { useMemo } from "react";
import { useTodos } from "./useTodos";
import { useTodoView, TodoFilter, TodoSort } from "./useTodoView";
import type { Todo } from "../model/types";

function applyFilter(arr: Todo[], filter: TodoFilter): Todo[] {
  if (filter === "active") return arr.filter((t) => !t.completed);
  if (filter === "completed") return arr.filter((t) => t.completed);
  return arr;
}

function applySort(arr: Todo[], sort: TodoSort): Todo[] {
  const a = [...arr];
  switch (sort) {
    case "newest":
      return a.sort((x, y) => x.createdAt - y.createdAt);
    case "oldest":
      return a.sort((x, y) => (x.dueAt ?? Infinity) - (y.dueAt ?? Infinity));
    case "due-soon":
      return a.sort((x, y) => x.title.localeCompare(y.title));
    default: // "created-desc"
      return a.sort((x, y) => y.createdAt - x.createdAt);
  }
}

export function useVisibleTodos() {
  const items = useTodos((s) => s.items);
  const filter = useTodoView((s) => s.filter);
  const sort = useTodoView((s) => s.sort);

  return useMemo(() => {
    const arr = Object.values(items);
    const filtered =
      filter === "active"
        ? arr.filter((t) => !t.completed)
        : filter === "completed"
        ? arr.filter((t) => t.completed)
        : arr;

    // sorteer zoals jij wilt
    return filtered.sort((a, b) => b.createdAt - a.createdAt);
  }, [items, filter, sort]);
}

export function useTodoCounts() {
  return useTodos((s) => {
    const arr = Object.values(s.items);
    const completed = arr.filter((t) => t.completed).length;
    return { all: arr.length, active: arr.length - completed, completed };
  });
}
