import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationLightTheme,
} from '@react-navigation/native';

export const getTheme = (mode) => {
  const basePaperTheme = mode === 'dark' ? MD3DarkTheme : MD3LightTheme;
  const baseNavigationTheme =
    mode === 'dark' ? NavigationDarkTheme : NavigationLightTheme;

  const isDark = mode === 'dark';

  return {
    ...baseNavigationTheme,
    ...basePaperTheme,
    colors: {
      ...baseNavigationTheme.colors,
      ...basePaperTheme.colors,

      /** Colores principales */
      primary: isDark ? '#98571B' : '#EF7E1B', // tu color institucional
      secondary: '#E6BB93',

      /** Fondos y superficies */
      background: isDark ? '#121212' : '#FFF8F3', // crema claro para login
      surface: isDark ? '#1E1E1E' : '#FFFFFF',
      tableBackgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',

      /** Texto y bordes */
      text: isDark ? '#FFFBFF' : '#252020',
      outline: isDark ? 'rgba(255,255,255,0.25)' : 'rgb(192,192,192)',

      /** Elementos estructurales */
      footer: isDark ? '#1D1D1D' : '#333333',
      navbar: isDark ? '#964901' : '#EF7E1B',
    },
  };
};
