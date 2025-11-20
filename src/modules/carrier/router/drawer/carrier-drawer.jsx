import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeScreen, ProfileScreen } from '../../screens';
import { MaterialIcons } from '@expo/vector-icons';
import { CustomDrawerContent } from './custom-drawer-content';

const Drawer = createDrawerNavigator();

export const CarrierDrawer = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        drawerStyle: {
          width: 280,
        },
        drawerActiveTintColor: '#6200ee',
        drawerInactiveTintColor: '#666',
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Inicio',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Mi Perfil',
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
