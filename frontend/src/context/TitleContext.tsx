import React, { createContext, useState, ReactNode } from 'react';

interface TitleContextProps {
  title: string;
  setTitle: (title: string) => void;
}

export const TitleContext = createContext<TitleContextProps>({
  title: '',
  setTitle: () => {},
});

interface TitleProviderProps {
  children: ReactNode;
}

export const TitleProvider = ({ children }: TitleProviderProps) => {
  const [title, setTitle] = useState('');

  return (
    <TitleContext.Provider value={{ title, setTitle }}>
      {children}
    </TitleContext.Provider>
  );
};
