import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { getTheme } from '../theme/theme';

import { LoginScreen, PruebaScreen } from '../modules/auth/screens';

const Stack = createStackNavigator();

export const AppRoutes = () => {
  const { status, user } = useSelector((state) => state.auth);
  const { mode } = useSelector((state) => state.theme);
  const theme = getTheme(mode);

  if (status === 'checking') {
    return null; // puedes poner un SplashScreen aquí
  }

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        initialRouteName={status === 'authenticated' ? 'Drawer' : 'Login'}
        screenOptions={{ headerShown: false }}
      >
        {status !== 'authenticated' ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <Stack.Screen name="Drawer">
            {() => {
              return <PruebaScreen />;
            }}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};