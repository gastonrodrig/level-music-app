import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';

export const ProfileScreen = () => {
  const { firstName, lastName, email, role } = useSelector((state) => state.auth);

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Mi Perfil</Text>
      <View style={styles.infoContainer}>
        <Text variant="bodyLarge">Nombre: {firstName} {lastName}</Text>
        <Text variant="bodyMedium">Email: {email}</Text>
        <Text variant="bodyMedium">Rol: {role}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  infoContainer: {
    marginTop: 20,
    gap: 10,
  },
});
