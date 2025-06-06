import { useState, useEffect } from "react";
import { useLanguage } from "./i18n/LanguagesContext";
import "./App.css";
import { Link } from "react-router-dom";

import Profile from "./features/Profile/Profile";
import Services from "./features/Services/Services";
import Projects from "./features/Projects/Projects";
import Contact from "./features/Contact/Contact";

export default function App({ routeLang }: { routeLang?: string }) {
  const [expanded, setExpanded] = useState(false);
  const [navVisible, setNavVisible] = useState(false);
  const [activeContent, setActiveContent] = useState("");
  const { lang, setLang, t } = useLanguage();

  useEffect(() => {
    if (routeLang) setLang(routeLang as typeof lang);
  }, [routeLang, setLang]);

  const handleCardClick = () => {
    setExpanded(true);
    setTimeout(() => setNavVisible(true), 600);
  };

  const renderContent = () => {
    switch (activeContent) {
      case "profile":
        return <Profile />;
      case "services":
        return <Services onContact={() => setActiveContent('contact')} />;
      case "projects":
        return <Projects />;
      case "contact":
        return <Contact />;
      default:
        return null;
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-white text-blue-brand-color-800 relative overflow-hidden"
      dir={lang === "he" ? "rtl" : "ltr"}
      lang={lang}
    >
      <Link
        to={`/${lang === "en" ? "he" : "en"}${window.location.pathname.replace(/^\/(en|he)/, "")}`}
        className="absolute top-4 right-4 px-2 py-1 rounded"
        onClick={() => {
          const newLang = lang === "en" ? "he" : "en";
          setLang(newLang);
        }}
      >
        {t.toggle}
      </Link>
      <div
        className={`relative flex items-center justify-${lang === "he" ? "right" : "left"} bg-white overflow-hidden cursor-pointer transition-all duration-500 ${expanded ? "w-[500px] border-b border-[#324681]" : "w-[50px]"} h-[50px] top-mobile`}
        onClick={handleCardClick}
      >
        <img
          src="../logo.png"
          alt="Logo"
          className={`w-[40px] object-cover transition-opacity duration-500`}
        />
        <div
          className={`absolute ${lang === "he" ? "left-4" : "right-4"} text-lg text-[#324681] font-bold transition-opacity duration-500 uppercase ${expanded ? "opacity-100" : "opacity-0"}`}
        >
          {t.expert}
        </div>
      </div>

      {navVisible && (
      <div className="flex gap-5 mt-5 opacity-100 transition-opacity duration-500">
        {Object.keys(t.nav).map((key) => (
        <button
          key={key}
          className="text-[#324681] font-bold hover:underline p-2 capitalize font-normal text-[#324681] transition-colors duration-300"
          onClick={() => setActiveContent(key)}
        >
          {t.nav[key as keyof typeof t.nav]}
        </button>
        ))}
      </div>
      )}

      <div
        className={`mt-8 bg-white border border-[#324681] flex flex-col items-center justify-start text-center text-base transition-all duration-500 overflow-hidden ${
          activeContent ? "w-[500px] h-[500px] content-mobile" : "w-0 h-0"
        }`}
      >
      <div className="w-full h-full overflow-y-auto p-6 relative custom-scrollbar">
        {renderContent()}
      </div>
      </div>
    </div>
  );
}