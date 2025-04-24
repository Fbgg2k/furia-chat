'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

interface LocaleContextProps {
  locale: string;
  changeLocale: (locale: string) => void;
}

const LocaleContext = createContext<LocaleContextProps>({
  locale: 'pt-BR',
  changeLocale: () => {},
});

interface LocaleProviderProps {
  children: ReactNode;
}

export const LocaleProvider: React.FC<LocaleProviderProps> = ({ children }) => {
  const [locale, setLocale] = useState<string>('pt-BR');

  const changeLocale = (locale: string) => {
    setLocale(locale);
  };

  return (
    <LocaleContext.Provider value={{ locale, changeLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};

export const useLocale = () => {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
};