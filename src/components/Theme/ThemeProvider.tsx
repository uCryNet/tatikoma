import React, {useCallback, useEffect, useMemo, useState} from 'react'
import {ThemeContext} from "./ThemeContext";

export type ThemeContextValue = {
    theme: () => void;
    isDarkTheme: boolean;
};

export const ThemeProvider: React.FC = ({children}) => {
    const [isDarkTheme, setDarkTheme] = useState<boolean>(
        localStorage.getItem('theme')
            ? !!Number(localStorage.getItem('theme'))
            : !!Number(localStorage.setItem('theme', '0'))
    );

    useEffect(() => {
        isDarkTheme
            ? localStorage.setItem('theme', '1')
            : localStorage.setItem('theme', '0')
    }, [isDarkTheme])

    const theme = useCallback(() => setDarkTheme(isDarkTheme => !isDarkTheme), []);

    const value = useMemo<ThemeContextValue>(() => ({
            isDarkTheme,
            theme
        }),
        [isDarkTheme, theme]
    );

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};