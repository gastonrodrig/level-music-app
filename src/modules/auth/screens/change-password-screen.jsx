import React, { useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { TextInput, Button, useTheme } from 'react-native-paper';

export const ChangePasswordScreen = () => {
  const theme = useTheme();
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.background,
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
        Cambiar Contraseña
      </Text>

      {/* Contenedor blanco */}
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
          {/* Contraseña actual */}
          <Text
            style={{
              fontSize: 13,
              color: theme.colors.text,
              marginBottom: 6,
            }}
          >
            Contraseña actual
          </Text>
          <TextInput
            mode="outlined"
            value={oldPass}
            onChangeText={setOldPass}
            placeholder="••••••••"
            secureTextEntry={!showOld}
            outlineColor={theme.colors.outline}
            activeOutlineColor={theme.colors.primary}
            style={{ backgroundColor: theme.colors.surface, marginBottom: 14 }}
            outlineStyle={{ borderRadius: 8 }}
            contentStyle={{ fontSize: 14 }}
            right={
              <TextInput.Icon
                icon={showOld ? 'eye-off' : 'eye'}
                onPress={() => setShowOld(!showOld)}
              />
            }
          />

          {/* Nueva contraseña */}
          <Text
            style={{
              fontSize: 13,
              color: theme.colors.text,
              marginBottom: 6,
            }}
          >
            Nueva contraseña
          </Text>
          <TextInput
            mode="outlined"
            value={newPass}
            onChangeText={setNewPass}
            placeholder="••••••••"
            secureTextEntry={!showNew}
            outlineColor={theme.colors.outline}
            activeOutlineColor={theme.colors.primary}
            style={{ backgroundColor: theme.colors.surface, marginBottom: 14 }}
            outlineStyle={{ borderRadius: 8 }}
            contentStyle={{ fontSize: 14 }}
            right={
              <TextInput.Icon
                icon={showNew ? 'eye-off' : 'eye'}
                onPress={() => setShowNew(!showNew)}
              />
            }
          />

          {/* Confirmar contraseña */}
          <Text
            style={{
              fontSize: 13,
              color: theme.colors.text,
              marginBottom: 6,
            }}
          >
            Confirmar nueva contraseña
          </Text>
          <TextInput
            mode="outlined"
            value={confirmPass}
            onChangeText={setConfirmPass}
            placeholder="••••••••"
            secureTextEntry={!showConfirm}
            outlineColor={theme.colors.outline}
            activeOutlineColor={theme.colors.primary}
            style={{ backgroundColor: theme.colors.surface }}
            outlineStyle={{ borderRadius: 8 }}
            contentStyle={{ fontSize: 14 }}
            right={
              <TextInput.Icon
                icon={showConfirm ? 'eye-off' : 'eye'}
                onPress={() => setShowConfirm(!showConfirm)}
              />
            }
          />

          {/* Botón de guardar */}
          <Button
            mode="contained"
            onPress={() => console.log('Cambiar contraseña')}
            style={{
              borderRadius: 10,
              marginTop: 25,
              paddingVertical: 5,
            }}
            buttonColor={theme.colors.primary}
            textColor="#fff"
          >
            Guardar nueva contraseña
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
