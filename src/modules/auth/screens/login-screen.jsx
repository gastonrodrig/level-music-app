import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { TextInput, Button, useTheme } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

export const LoginScreen = () => {
  const navigation = useNavigation(); 
  const theme = useTheme(); // Accede a los colores definidos en theme.js
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [showPass, setShowPass] = useState(false);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background, // Fondo crema claro
        paddingVertical: 40,
      }}
    >
      {/* Logo */}
      <Image
        source={require('../../../../assets/logo.png')}
        style={{
          width: 140,
          height: 140,
          resizeMode: 'contain',
          marginBottom: 16,
        }}
      />

      {/* Títulos */}
      <Text
        style={{
          fontSize: 18,
          fontWeight: '700',
          color: theme.colors.text,
          textAlign: 'center',
        }}
      >
        LEVEL MUSIC CORP
      </Text>

      <Text
        style={{
          fontSize: 14,
          color: '#777',
          marginBottom: 28,
          textAlign: 'center',
        }}
      >
        Portal de Trabajadores
      </Text>

      {/* Tarjeta del formulario */}
      <View style={{ marginHorizontal: 20, width: '85%' }}>
        <View
          style={{
            width: '100%',
            borderWidth: 1,
            borderColor: theme.colors.outline,
            borderRadius: 12,
            justifyContent: 'center',
            marginBottom: 40,
            backgroundColor: theme.colors.tableBackgroundColor,
            paddingHorizontal: 18,
            paddingVertical: 25,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 4 },
            elevation: 5,
          }}
        >
          {/* Campo correo */}
          <Text
            style={{
              fontSize: 13,
              color: theme.colors.text,
              marginBottom: 6,
            }}
          >
            Correo electrónico
          </Text>
          <TextInput
            mode="outlined"
            value={email}
            onChangeText={setEmail}
            placeholder="nombre@levelmusiccorp.com"
            placeholderTextColor="#999"
            outlineColor={theme.colors.outline}
            activeOutlineColor={theme.colors.primary}
            style={{
              backgroundColor: theme.colors.surface,
              marginBottom: 14,
            }}
            outlineStyle={{ borderRadius: 8 }}
            contentStyle={{ fontSize: 14 }}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {/* Campo contraseña */}
          <Text
            style={{
              fontSize: 13,
              color: theme.colors.text,
              marginBottom: 6,
            }}
          >
            Contraseña
          </Text>
          <TextInput
            mode="outlined"
            value={pass}
            onChangeText={setPass}
            placeholder="••••••••"
            secureTextEntry={!showPass}
            outlineColor={theme.colors.outline}
            activeOutlineColor={theme.colors.primary}
            style={{
              backgroundColor: theme.colors.surface,
            }}
            outlineStyle={{ borderRadius: 8 }}
            contentStyle={{ fontSize: 14 }}
            right={
              <TextInput.Icon
                icon={showPass ? 'eye-off' : 'eye'}
                onPress={() => setShowPass(!showPass)}
              />
            }
          />

          {/* Enlace de olvidar contraseña */}
          <TouchableOpacity
            onPress={() => navigation.navigate('ChangePassword')} 
            style={{ marginTop: 10 }}
          >
            <Text style={{ color: theme.colors.primary, textAlign: 'right', fontSize: 13 }}>
              ¿Olvidaste tu contraseña?
            </Text>
          </TouchableOpacity>

          {/* Botón de iniciar sesión */}
          <Button
            mode="contained"
            onPress={() => console.log('Iniciar sesión')}
            style={{
              borderRadius: 10,
              marginTop: 25,
              paddingVertical: 5,
            }}
            buttonColor={theme.colors.primary}
            textColor="#fff"
          >
            Iniciar sesión
          </Button>
        </View>
      </View>

      {/* Footer */}
      <Text
        style={{
          textAlign: 'center',
          color: '#555',
          fontSize: 12,
          width: '80%',
        }}
      >
        Acceso exclusivo para empleados de Level Music Corp
      </Text>
    </ScrollView>
  );
};
