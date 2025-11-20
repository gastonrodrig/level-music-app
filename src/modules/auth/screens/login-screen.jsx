import { useMemo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../../hooks';
import { FormInputText } from '../../../shared/ui/form';
import { AuthLayout } from '../layout/auth-layout';

export const LoginScreen = () => {
  const navigation = useNavigation();
  const theme = useTheme();
  const { loading, startLogin } = useAuthStore();

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    await startLogin(data);
  };

  const isButtonDisabled = useMemo(() => loading, [loading]);

  return (
    <AuthLayout
      logoUri="https://i.postimg.cc/xqxGrXLZ/level-music-logo.png" 
      title="LEVEL MUSIC CORP"
      subtitle="Portal de Trabajadores"
      onSubmit={handleSubmit(onSubmit)}
      isButtonDisabled={isButtonDisabled}
      footerText="Acceso exclusivo para empleados de Level Music Corp"
    >
      {/* Formulario dentro de la Card */}
      <FormInputText
        name="email"
        control={control}
        label="Correo electrónico"
        placeholder={'nombre@levelmusic.com'}
        rules={{ required: 'El correo es obligatorio' }}
        error={errors.email}
      />

      <FormInputText
        name="password"
        control={control}
        label="Contraseña"
        placeholder={"••••••••"}
        rules={{ required: 'La contraseña es obligatoria' }}
        error={errors.password}
        isPasswordInput={true}
      />

      {/* Enlace de olvidar contraseña */}
      <TouchableOpacity
        onPress={() => navigation.navigate('ChangePassword')}
        style={{ marginTop: 2, marginBottom: 12 }}
      >
        <Text style={{ color: theme.colors.primary, textAlign: 'right', fontSize: 13 }}>
          ¿Olvidaste tu contraseña?
        </Text>
      </TouchableOpacity>

      {/* Botón de iniciar sesión */}
      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={{
          borderRadius: 10,
          marginTop: 6,
        }}
        buttonColor={'#e38532ff'}
        textColor="#fff"
        disabled={isButtonDisabled}
      >
        Iniciar Sesión
      </Button>
    </AuthLayout>
  );
};
