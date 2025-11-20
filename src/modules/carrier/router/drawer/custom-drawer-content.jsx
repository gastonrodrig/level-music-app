import React from 'react';
import { View, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Text, Divider, Button } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../../store';
import { FirebaseAuth } from '../../../auth/firebase/config';

export const CustomDrawerContent = (props) => {
  const { firstName, lastName, email } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await FirebaseAuth.signOut();
    dispatch(logout());
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.header}>
        <Text variant="titleLarge">{firstName} {lastName}</Text>
        <Text variant="bodyMedium" style={styles.email}>{email}</Text>
      </View>
      <Divider />
      <DrawerItemList {...props} />
      <Divider style={styles.divider} />
      <View style={styles.footer}>
        <Button
          mode="outlined"
          onPress={handleLogout}
          icon="logout"
        >
          Cerrar Sesión
        </Button>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    paddingBottom: 15,
  },
  email: {
    marginTop: 5,
    opacity: 0.7,
  },
  divider: {
    marginVertical: 10,
  },
  footer: {
    padding: 15,
  },
});
