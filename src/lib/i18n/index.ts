import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

// Eén namespace "common" met alle strings
const resources = {
  nl: {
    common: {
      appTitle: "Todos",
      addTodo: "Taak toevoegen",
      new: "Nieuw",
      filters: {
        all: "Alle",
        active: "Actief",
        completed: "Voltooid",
      },
      ok: "OK",
      cancel: "Annuleren",
      delete: "Verwijderen",
      empty: {
        title: "Nog geen taken",
        hint: "Voeg je eerste taak toe om te beginnen.",
        cta: "Nieuwe taak",
      },
      confirmDelete: {
        title: "Verwijderen?",
        message: "Weet je zeker dat je deze taak wilt verwijderen?",
      },
      form: {
        title: "Titel",
        description: "Beschrijving",
        date: "Datum",
        location: "Locatie",
        save: "Opslaan",
        cancel: "Annuleer",
        delete: "Verwijder",
        required: "Titel is verplicht",
        invalidDate: "Ongeldige datum",
        datePlaceholder: "Kies datum",
        titlePlaceholder: "Vul een titel in",
        locationPlaceholder: "Adres of plek…",
        incomplete: "Formulier is niet compleet",
      },
    },
  },
  en: {
    common: {
      appTitle: "Todos",
      addTodo: "Add task",
      new: "New",
      ok: "OK",
      cancel: "Cancel",
      delete: "Delete",
      filters: {
        all: "All",
        active: "Active",
        completed: "Completed",
      },
      empty: {
        title: "No tasks yet",
        hint: "Add your first task to get started.",
        cta: "New task",
      },
      confirmDelete: {
        title: "Delete?",
        message: "Are you sure you want to delete this task?",
      },
      form: {
        title: "Title",
        description: "Description",
        date: "Date",
        location: "Location",
        save: "Save",
        cancel: "Cancel",
        delete: "Delete",
        required: "Title is required",
        invalidDate: "Invalid date",
        datePlaceholder: "Pick date",
        titlePlaceholder: "Enter a title",
        locationPlaceholder: "Address or place…",
        incomplete: "Form is not complete",
      },
    },
  },
} as const;

i18n.use(initReactI18next).init({
  resources,
  // start met device taal, val terug op en
  lng: Localization.getLocales()[0]?.languageCode?.startsWith("nl")
    ? "nl"
    : "en",
  fallbackLng: "en",

  // we gebruiken één namespace "common"
  ns: ["common"],
  defaultNS: "common",

  interpolation: { escapeValue: false },
  // optioneel: toon tijdelijk keys niet terwijl het laadt
  react: { useSuspense: false },
});

export default i18n;
