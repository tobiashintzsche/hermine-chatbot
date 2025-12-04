import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import translations from "./translations";

let initialized = false;

export function initI18n(): typeof i18next {
  if (initialized) {
    return i18next;
  }

  i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      resources: translations,
      fallbackLng: "en",
      supportedLngs: ["de", "en"],
      detection: {
        order: ["navigator", "htmlTag", "localStorage"],
        caches: [],
      },
      interpolation: {
        escapeValue: false,
      },
      debug: process.env.NODE_ENV === "development",
      react: {
        useSuspense: false,
      },
    });

  initialized = true;
  return i18next;
}

initI18n();

export default i18next;
