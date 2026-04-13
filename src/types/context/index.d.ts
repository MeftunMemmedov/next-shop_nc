import { Dispatch, SetStateAction } from 'react';

export type GlobalContextType = {
  sidebarVisible: boolean;
  setSidebarVisible: Dispatch<SetStateAction<boolean>>;
};
