import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationLightTheme } from '@react-navigation/native';

export const getTheme = (mode) => {
  const basePaperTheme = mode === 'dark' ? MD3DarkTheme : MD3LightTheme;
  const baseNavigationTheme = mode === 'dark' ? NavigationDarkTheme : NavigationLightTheme;

  return {
    ...baseNavigationTheme,
    ...basePaperTheme,
    colors: {
      ...baseNavigationTheme.colors,
      ...basePaperTheme.colors,
      primary: mode === 'dark' ? '#98571B' : '#EF7E1B',
      secondary: '#E6BB93',
      background: mode === 'dark' ? '#121212' : '#FFFFFF',
      surface: mode === 'dark' ? '#1E1E1E' : '#F5F5F5',
      text: mode === 'dark' ? '#FFFBFF' : '#252020',
      footer: mode === 'dark' ? '#1D1D1D' : '#333333',
      navbar: mode === 'dark' ? '#964901' : '#EF7E1B',
    },
  };
};
