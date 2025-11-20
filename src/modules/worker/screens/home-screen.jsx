import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

export const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text variant="headlineMedium">Inicio - Almacenero</Text>
      <Text variant="bodyLarge" style={styles.subtitle}>
        Bienvenido al panel de almacenero
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  subtitle: {
    marginTop: 10,
    textAlign: 'center',
  },
});
