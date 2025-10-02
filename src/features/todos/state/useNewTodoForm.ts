import { create } from "zustand";
import { id as generateId } from "@/utils/ids";
import { useTodos } from "./useTodos";
import { parseDateToMs } from "@/utils/date";
import { useTranslation } from "react-i18next";

const { t } = useTranslation();

type Fields = {
  title: string;
  description: string;
  dueRaw: string;
  location: string;
};

type FormState = {
  fields: Fields;
  errors: Errors;
  setField: <K extends keyof Fields>(key: K, value: Fields[K]) => void;
  validate: () => boolean;
  reset: () => void;
  submit: () => { ok: true } | { ok: false; errors: Errors };
};

type Errors = Partial<Record<keyof Fields, string>>;

const initial: Fields = {
  title: "",
  description: "",
  dueRaw: "",
  location: "",
};

export const useNewTodoForm = create<FormState>((set, get) => ({
  fields: { ...initial },
  errors: {},

  setField: (key, value) =>
    set((s) => ({
      fields: { ...s.fields, [key]: value },
      errors: { ...s.errors, [key]: undefined },
    })),

  validate: () => {
    const { fields } = get();
    const errors: Errors = {};
    if (!fields.title.trim()) errors.title = t("form.requiredTitle");

    if (fields.dueRaw.trim()) {
      const ms = parseDateToMs(fields.dueRaw);
      if (!ms) errors.dueRaw = t("form.invalidDate");
    }
    set({ errors });
    return Object.keys(errors).length === 0;
  },

  reset: () => set({ fields: { ...initial }, errors: {} }),

  submit: () => {
    const isValid = get().validate();
    if (!isValid) return { ok: false, errors: get().errors };

    const { fields } = get();
    const dueAt = parseDateToMs(fields.dueRaw);

    useTodos.getState().addTodo({
      id: generateId(),
      title: fields.title.trim(),
      description: fields.description.trim() || undefined,
      location: fields.location.trim() || undefined,
      dueAt,
      completed: false,
      createdAt: Date.now(),
    });
    get().reset();
    return { ok: true as const };
  },
}));
