// import React from "react";
// import { useLangStore } from "../store/languageStore.jsx";
// import { useTranslation } from "react-i18next";

// export default function LanguageSwitcher() {
//   const { lang, setLang } = useLangStore();
//   const { i18n } = useTranslation();
  
//   const toggleLang = (event) => { 
//     const newLang = event.target.value;
//     setLang(newLang);
//     i18n.changeLanguage(newLang);
//   }
//   return (
//     <>
//     <select onChange={toggleLang} className="  border border-gray-300 rounded-md px-2 py-1 text-sm  shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ">
//       <option className="text-black" value="fr">Français</option>
//       <option className="text-black" value="en">English</option>
//       <option className="text-black" value="mg">Malagasy</option>
//     </select>
//     </>
//   );

// }

import React from "react";
import { useLangStore } from "../store/languageStore";
import { useTranslation } from "react-i18next";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLangStore();
  const { i18n } = useTranslation();

  // ✅ Typage du paramètre 'event' pour éviter l'erreur TS
  const toggleLang = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = event.target.value;
    setLang(newLang);
    i18n.changeLanguage(newLang);
  };

  return (
    <select
      value={lang}
      onChange={toggleLang}
      className="border border-gray-300 rounded-md px-2 py-1 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      <option className="text-black" value="fr">Français</option>
      <option className="text-black" value="en">English</option>
      <option className="text-black" value="mg">Malagasy</option>
    </select>
  );
}
