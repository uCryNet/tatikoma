import {createContext} from 'react';
import {ThemeContextValue} from './ThemeProvider'

export const ThemeContext = createContext<ThemeContextValue>({
    theme: () => {},
    isDarkTheme: false,
});
