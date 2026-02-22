"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, LABELS } from './types';

interface I18nContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (typeof LABELS)['en'];
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = LABELS[language];

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error('useI18n must be used within an I18nProvider');
  }
  return context;
}
