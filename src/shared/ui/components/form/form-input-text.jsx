import { useState } from 'react';
import { TextInput, useTheme } from 'react-native-paper';
import { View, Text } from 'react-native';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

export const FormInputText = ({
  name,
  control,
  label,
  error,
  rules = {},
  isPasswordInput = false,
}) => {
  const theme = useTheme();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <View style={{ marginBottom: 20 }}>
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="outlined"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            secureTextEntry={isPasswordInput && !showPassword} 
            label={label}
            placeholder={label}
            style={{
              backgroundColor: theme.colors.surface,
              borderRadius: 8,
              fontSize: 16,
            }}
            error={!!error}
            right={
              isPasswordInput && (
                <TextInput.Icon
                  icon={showPassword ? 'eye-off' : 'eye'}
                  onPress={handleClickShowPassword}
                />
              )
            }
          />
        )}
      />

      {error && <Text style={{ color: theme.colors.error, marginTop: 4 }}>{error.message}</Text>}
    </View>
  );
};

FormInputText.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired, 
  label: PropTypes.string,
  error: PropTypes.object,
  isPasswordInput: PropTypes.bool,
  rules: PropTypes.object, 
};