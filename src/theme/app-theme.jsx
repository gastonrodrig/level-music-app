import React, { useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { StatusBar, Platform, Appearance } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { getTheme } from './theme';
import { setTheme } from '../store';

export const AppTheme = ({ children }) => {
  const { mode } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  // Detectar cambios del sistema (modo oscuro/claro)
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      dispatch(setTheme(colorScheme ?? 'light'));
    });

    dispatch(setTheme(Appearance.getColorScheme() ?? 'light'));
    return () => subscription.remove();
  }, [dispatch]);

  const theme = getTheme(mode);

  const barStyle =
    Platform.OS === 'ios'
      ? 'light-content'
      : mode === 'dark'
      ? 'light-content'
      : 'dark-content';

  return (
    <PaperProvider theme={theme}>
      <StatusBar
        barStyle={barStyle}
        backgroundColor={theme.colors.background}
      />
      {children}
    </PaperProvider>
  );
};
