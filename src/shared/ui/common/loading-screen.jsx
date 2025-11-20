import { View, Text, ActivityIndicator } from 'react-native';

export const LoadingScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color="#E08438" />
    <Text>Cargando...</Text>
  </View>
);
