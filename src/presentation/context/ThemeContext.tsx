import React, { createContext, PropsWithChildren } from 'react'
import { useColorScheme } from 'react-native';

import {
    NavigationContainer,
    DarkTheme as NavigationDarkTheme,
    DefaultTheme as NavigationDefaultTheme,
  } from '@react-navigation/native';
  import {
    MD3DarkTheme,
    MD3LightTheme,
    PaperProvider,
    adaptNavigationTheme,
  } from 'react-native-paper';
  import merge from 'deepmerge';
  
  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });
  
  const CombinedDefaultTheme = merge(MD3LightTheme, LightTheme);
  const CombinedDarkTheme = merge(MD3DarkTheme, DarkTheme);


export const ThemeContext = createContext({
    isDark: false,
    theme: LightTheme
});


export const ThemeContextProvider = ({ children }: PropsWithChildren) => {
    const colorScheme = useColorScheme();

    const isDarkTheme = colorScheme === 'dark';
    const theme = isDarkTheme ? CombinedDarkTheme : CombinedDefaultTheme;


    return (
        <PaperProvider theme={theme}>
            <NavigationContainer theme={theme as any}>
               <ThemeContext.Provider value={{isDark: isDarkTheme, theme: theme}}>
               {children}
               </ThemeContext.Provider>
            </NavigationContainer>
        </PaperProvider>

    );
}

