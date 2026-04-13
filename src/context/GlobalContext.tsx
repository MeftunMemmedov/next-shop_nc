'use client';
import { GlobalContextType } from '@/types';
import { createContext, useState } from 'react';

export const GlobalContext = createContext<GlobalContextType | undefined>(
  undefined
);

export const GlobalContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [sidebarVisible, setSidebarVisible] = useState<boolean>(false);
  return (
    <GlobalContext value={{ sidebarVisible, setSidebarVisible }}>
      {children}
    </GlobalContext>
  );
};
