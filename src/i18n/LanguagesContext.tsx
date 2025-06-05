import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import translations from "./translations";

type Lang = "en" | "he";

interface LanguageContextProps {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: typeof translations["en"];
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
}