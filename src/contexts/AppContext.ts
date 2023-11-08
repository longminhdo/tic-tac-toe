import { createContext } from 'react';
import { Theme } from '@/constants/app';
import { App } from '@/types/app';

export const AppContext = createContext<App>({
  windowWidth: window.innerWidth,
  theme: Theme.LIGHT,
  setTheme: () => undefined,
});
