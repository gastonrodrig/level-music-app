import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { getTheme } from '../theme/theme';

import { LoginScreen, ChangePasswordScreen, TestConnectionScreen } from '../modules/auth/screens';
import { CarrierDrawer } from '../modules/carrier/router/drawer';
import { WorkerDrawer } from '../modules/worker/router/drawer';

const Stack = createStackNavigator();

export const AppRoutes = () => {
  const { status, role } = useSelector((state) => state.auth);
  const { mode } = useSelector((state) => state.theme);
  const theme = getTheme(mode);

  if (status === 'checking') return null;

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        initialRouteName="TestConnection"
        screenOptions={{ headerShown: false }}
      >
        {status === 'authenticated' ? (
          <Stack.Screen name="Drawer">
            {() => role === 'Transportista' ? <CarrierDrawer /> : <WorkerDrawer />}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="TestConnection" component={TestConnectionScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
