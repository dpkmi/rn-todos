import { create } from "zustand";
import { useTodos } from "./useTodos";
import { formatDate, parseDateToMs } from "@/utils/date";
import { id as genId } from "@/utils/ids";
import i18n from "@/lib/i18n";

type Fields = {
  title: string;
  description: string;
  dueRaw: string;
  location: string;
};

type Errors = Partial<Record<keyof Fields, string>>;
type Mode = "create" | "edit";

const empty: Fields = { title: "", description: "", dueRaw: "", location: "" };

export const useTodoForm = create<{
  mode: Mode;
  id?: string;
  fields: Fields;
  errors: Errors;
  initCreate: () => void;
  initEdit: (id: string) => boolean;
  setField: <K extends keyof Fields>(k: K, v: Fields[K]) => void;
  validate: () => boolean;
  submit: () => boolean;
  remove: () => boolean;
  reset: () => void;
}>((set, get) => ({
  mode: "create",
  id: undefined,
  fields: { ...empty },
  errors: {},

  initCreate: () =>
    set({ mode: "create", id: undefined, fields: { ...empty }, errors: {} }),

  initEdit: (id) => {
    const t = useTodos.getState().items[id];
    if (!t) return false;
    set({
      mode: "edit",
      id,
      errors: {},
      fields: {
        title: t.title,
        description: t.description || "",
        dueRaw: t.dueAt ? formatDate(t.dueAt) : "",
        location: t.location || "",
      },
    });
    return true;
  },

  setField: (key, value) =>
    set((s) => ({
      fields: { ...s.fields, [key]: value },
      errors: { ...s.errors, [key]: undefined },
    })),

  validate: () => {
    const { fields } = get();
    const errors: Errors = {};
    if (!fields.title.trim()) errors.title = i18n.t("form.required");
    if (fields.dueRaw.trim() && !parseDateToMs(fields.dueRaw))
      errors.dueRaw = i18n.t("form.invalidDate");
    set({ errors });
    return Object.keys(errors).length === 0;
  },

  submit: () => {
    if (!get().validate()) return false;
    const { mode, id, fields } = get();
    const dueAt = fields.dueRaw.trim()
      ? parseDateToMs(fields.dueRaw)
      : undefined;
    if (mode === "create") {
      const newId = id ?? genId();
      useTodos.getState().addTodo({
        id: newId,
        title: fields.title.trim(),
        description: fields.description.trim() || undefined,
        completed: false,
        createdAt: Date.now(),
        dueAt,
        location: fields.location.trim() || undefined,
      });
      return true;
    }
    if (mode === "edit" && id) {
      useTodos.getState().updateTodo(id, {
        title: fields.title.trim(),
        description: fields.description.trim() || undefined,
        dueAt,
        location: fields.location.trim() || undefined,
      });
      return true;
    }
    return false;
  },

  remove: () => {
    const { mode, id } = get();
    if (mode !== "edit" || !id) return false;
    useTodos.getState().removeTodo(id);
    return true;
  },

  reset: () =>
    set({ mode: "create", id: undefined, fields: { ...empty }, errors: {} }),
}));
