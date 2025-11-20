import { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../../hooks';
import { FormInputText } from '../../../shared/ui/components/form/form-input-text';

export const LoginScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const { startLogin } = useAuthStore();

  const [showPass, setShowPass] = useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    await startLogin(data);
  };

  return (
    <View style={{ flex: 1 }}>
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

        {/* Formulario */}
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
            <FormInputText
              name="email"
              control={control}
              label="Correo electrónico"
              rules={{ required: 'Este campo es obligatorio' }}
              error={errors.email}
            />

            {/* Campo contraseña */}
            <FormInputText
              name="password"
              control={control}
              label="Contraseña"
              rules={{ required: 'Este campo es obligatorio' }}
              error={errors.password}
              isPasswordInput={true}
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
              onPress={handleSubmit(onSubmit)} // Asocia la función de envío
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
    </View>
  );
};
