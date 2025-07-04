import React, { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

interface LanguageSelectorProps {
  language: 'en' | 'fr';
  onChange: (language: 'en' | 'fr') => void;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({ language, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' }
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  const handleLanguageSelect = (langCode: 'en' | 'fr') => {
    onChange(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors min-w-[140px]"
      >
        <Globe className="w-4 h-4 text-gray-500" />
        <div className="flex items-center gap-2 flex-1">
          <span className="text-lg">{currentLanguage?.flag}</span>
          <span className="text-sm font-medium text-gray-700">
            {currentLanguage?.label}
          </span>
        </div>
        <ChevronDown 
          className={`w-4 h-4 text-gray-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code as 'en' | 'fr')}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                  language === lang.code 
                    ? 'bg-brand-50 text-brand-700 border-r-2 border-brand-500' 
                    : 'text-gray-700'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="text-sm font-medium">{lang.label}</span>
                {language === lang.code && (
                  <div className="ml-auto w-2 h-2 bg-brand-500 rounded-full" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};