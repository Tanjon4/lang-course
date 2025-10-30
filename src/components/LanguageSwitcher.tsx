'use client';

import { useLanguage } from '@/lib/hooks/useLanguage';

export default function LanguageSwitcher() {
  const { lang, setLang, currentLanguage, languages } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      {/* Sélecteur déroulant */}
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.flag} {language.name}
          </option>
        ))}
      </select>

      {/* Ou boutons individuels */}
      {/* <div className="flex bg-gray-100 rounded-lg p-1 space-x-1">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => setLang(language.code)}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
              lang === language.code 
                ? 'bg-white text-gray-900 shadow-sm' 
                : 'text-gray-600 hover:text-gray-900'
            }`}
            title={language.name}
          >
            <span className="text-base mr-1">{language.flag}</span>
            <span className="hidden sm:inline">{language.code.toUpperCase()}</span>
          </button>
        ))}
      </div> */}

      {/* Bouton toggle cyclique */}
      {/* <button
        onClick={() => {
          const currentIndex = languages.findIndex(l => l.code === lang);
          const nextIndex = (currentIndex + 1) % languages.length;
          setLang(languages[nextIndex].code);
        }}
        className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
        title="Changer de langue"
      >
        {currentLanguage.flag} →
      </button> */}
    </div>
  );
}