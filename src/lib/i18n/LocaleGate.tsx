import { useEffect } from "react";
import i18n from "@/lib/i18n";
import { useLocale } from "./useLocale";

export function LocaleGate({ children }: { children: React.ReactNode }) {
  const locale = useLocale((s) => s.locale);

  useEffect(() => {
    i18n.changeLanguage(locale).catch(() => {});
  }, [locale]);

  return <>{children}</>;
}
