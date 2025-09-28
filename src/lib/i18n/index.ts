import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

const resources = {
  nl: { common: { hello: "Hallo", addTodo: "Taak toevoegen" } },
  en: { common: { hello: "Hello", addTodo: "Add Todo" } },
} as const;

void i18n.use(initReactI18next).init({
  compatibilityJSON: "v4",
  lng: "nl",
  fallbackLng: "en",
  resources,
  ns: ["common"],
  defaultNS: "common",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
