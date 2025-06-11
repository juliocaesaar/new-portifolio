import { useState, useEffect } from 'react';
import { useLanguage } from '@/context/LanguageContext';

// Import translations
import pt from '@/translations/pt.json';
import en from '@/translations/en.json';

const translations: { [key: string]: any } = {
  pt,
  en,
};

export const useTranslation = () => {
  const { language } = useLanguage();

  const t = (key: string): string => {
    const keys = key.split('.');
    let currentTranslation = translations[language];

    for (const k of keys) {
      if (currentTranslation && typeof currentTranslation === 'object' && k in currentTranslation) {
        currentTranslation = currentTranslation[k];
      } else {
        // Fallback or error handling for missing keys
        return key; // Return the key itself or a default message
      }
    }

    return typeof currentTranslation === 'string' ? currentTranslation : key;
  };

  const currentTranslations = translations[language];

  return { t, language, currentTranslations };
};
