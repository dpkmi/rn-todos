import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { mmkvStorage } from "@lib/mmkv/client";
import { Todo } from "../../../types/types";

type TodoState = {
  items: Record<string, Todo>;
  addTodo: (todo: Todo) => void;
  removeTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  updateTodo: (
    id: string,
    patch: Partial<Omit<Todo, "id" | "createdAt">>
  ) => void;
  list: () => Todo[];
};

export const useTodos = create<TodoState>()(
  persist(
    (set, get, _store): TodoState => ({
      items: {},
      addTodo: (todo: Todo) => {
        set((s: TodoState) => ({ items: { ...s.items, [todo.id]: todo } }));
      },
      removeTodo: (id: string) =>
        set((s: TodoState) => {
          const { [id]: _, ...rest } = s.items;
          return { items: rest };
        }),
      toggleTodo: (id: string) =>
        set((s: TodoState) => {
          const t = s.items[id];
          if (!t) return {};
          return {
            items: { ...s.items, [id]: { ...t, completed: !t.completed } },
          };
        }),
      updateTodo: (
        id: string,
        patch: Partial<Omit<Todo, "id" | "createdAt">>
      ) =>
        set((s: TodoState) => {
          const t = s.items[id];
          if (!t) return {};
          return { items: { ...s.items, [id]: { ...t, ...patch } } };
        }),
      list: () =>
        Object.values(get().items).sort((a, b) => b.createdAt - a.createdAt),
    }),
    {
      name: "todos",
      storage: createJSONStorage(() => mmkvStorage),
      partialize: (s: TodoState) => ({ items: s.items }),
    }
  )
);
