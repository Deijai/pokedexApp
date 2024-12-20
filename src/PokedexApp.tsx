// Only import react-native-gesture-handler on native platforms
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { StackNavigator } from './presentation/navigator/StackNavigator';
import { PaperProvider } from 'react-native-paper';
import { ThemeContextProvider } from './presentation/context/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient()

export const PokedexApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <ThemeContextProvider>
        <StackNavigator />
    </ThemeContextProvider>
    </QueryClientProvider>
  )
}
