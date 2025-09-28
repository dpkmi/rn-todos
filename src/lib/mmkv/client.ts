import { MMKV } from "react-native-mmkv";

export const mmkv = new MMKV();
export const mmkvStorage = {
  setItem: (key: string, value: string) => mmkv.set(key, value),
  getItem: (key: string) => mmkv.getString(key) ?? null,
  removeItem: (key: string) => mmkv.delete(key),
};
