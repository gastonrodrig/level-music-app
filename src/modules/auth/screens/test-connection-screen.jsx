import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, ActivityIndicator } from 'react-native-paper';
import { apiClient } from '../../shared/utils/api-client';

export const TestConnectionScreen = () => {
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  const testConnection = async () => {
    setStatus('loading');
    setMessage('Probando conexión...');
    
    try {
      const response = await apiClient.get('/user/find/gpdiogo70@gmail.com');
      setStatus('success');
      setMessage(`✅ Conexión exitosa!\nData: ${JSON.stringify(response.data, null, 2)}`);
    } catch (error) {
      setStatus('error');
      if (error.message === 'Network Error') {
        setMessage('🔴 Network Error\n\nEsto generalmente significa:\n\n1. El backend rechazó CORS\n2. El backend no está corriendo\n3. La URL es incorrecta\n\n⚠️ SOLUCIÓN: Configura CORS en tu backend NestJS para permitir:\n- exp://\n- http://192.168.*\n- Tu IP actual del emulador');
      } else {
        setMessage(`❌ Error: ${error.message}\n\nStatus: ${error.response?.status}\nData: ${JSON.stringify(error.response?.data, null, 2)}`);
      }
    }
  };

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>
        Test de Conexión Backend
      </Text>
      
      {status === 'loading' && <ActivityIndicator size="large" style={styles.loader} />}
      
      <Text style={styles.message}>{message}</Text>
      
      <Button 
        mode="contained" 
        onPress={testConnection}
        style={styles.button}
      >
        Reintentar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  message: {
    marginVertical: 20,
    fontFamily: 'monospace',
  },
  button: {
    marginTop: 20,
  },
  loader: {
    marginVertical: 20,
  },
});
