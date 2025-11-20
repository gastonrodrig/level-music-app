import { useForm } from 'react-hook-form';
import { useAuthStore } from '../../../hooks';
import { FormInputText } from '../../../shared/ui';
import { AuthLayout } from '../layout/auth-layout';
import { Button, Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

export const ChangePasswordScreen = () => {
  const { onLogout, startChangePasswordFirstLogin } = useAuthStore();
  const { control, handleSubmit, formState: { errors }, setError } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data) => {
    const { password, confirmPassword } = data;

    if (password !== confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'Las contraseñas no coinciden',
      });
      return;
    }

    await startChangePasswordFirstLogin(data);
  };

  const onCloseSession = async () => {
    await onLogout();
  };

  return (
    <AuthLayout
      logoUri="https://i.postimg.cc/N0rDzYsx/seguridad.png"
      title="Cambio de Contraseña Requerido"
      subtitle="Por seguridad, debes cambiar tu contraseña temporal"
      onSubmit={handleSubmit(onSubmit)}
      onLogout={onCloseSession}
      footerText="Esta contraseña será utilizada para futuros inicios de sesión."
    >
      <FormInputText
        name="password"
        control={control}
        label="Nueva Contraseña"
        placeholder={"••••••••"}
        rules={{
          required: 'Este campo es obligatorio',
        }}
        error={errors.password}
        isPasswordInput={true}
      />

      <FormInputText
        name="confirmPassword"
        control={control}
        label="Confirmar Nueva Contraseña"
        placeholder={"••••••••"}
        rules={{
          required: 'Este campo es obligatorio',
        }}
        error={errors.confirmPassword}
        isPasswordInput={true}
      />

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={{
          borderRadius: 10,
          marginTop: 6,
        }}
        buttonColor={'#e38532ff'}
        textColor="#fff"
      >
        Cambiar Contraseña
      </Button>

      <Button
        icon={() => <Ionicons name="exit" size={20} color={"#333"} />}
        onPress={onLogout}
        style={{
          borderRadius: 10,
          marginTop: 5,
          paddingVertical: 5,
        }}
        textColor={"#333"}
      >
        Cerrar sesión
      </Button>
    </AuthLayout>
  );
};
