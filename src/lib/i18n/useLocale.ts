import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { MMKV } from "react-native-mmkv";

const storage = new MMKV();

type LocaleState = {
  locale: string;
  setLocale: (l: "nl" | "en") => void;
};

export const useLocale = create<LocaleState>()(
  persist(
    (set) => ({
      locale: "nl",
      setLocale: (l) => set({ locale: l }),
    }),
    {
      name: "locale",
      storage: createJSONStorage(() => ({
        getItem: (k) => storage.getString(k) ?? null,
        setItem: (k, v) => storage.set(k, v),
        removeItem: (k) => storage.delete(k),
      })),
    }
  )
);
