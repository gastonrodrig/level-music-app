import { useState } from 'react';
import { TextInput, View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import { Controller } from 'react-hook-form';

export const FormInputText = ({
  name,
  control,
  label,
  placeholder,
  error,
  rules = {},
  isPasswordInput = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <View style={{ marginBottom: 20 }}>
      <Text
        style={{
          fontSize: 13,
          color: '#333',
          marginBottom: 5,
        }}
      >
        {label}
      </Text>

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            secureTextEntry={isPasswordInput && !showPassword}
            placeholder={placeholder}
            style={{
              backgroundColor: '#f1f1f1',
              borderRadius: 12,
              fontSize: 14,
              height: 40,
              paddingVertical: 6,
              paddingHorizontal: 10,
              borderWidth: 0,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 2,
            }}
            placeholderTextColor="#aaa"
            selectionColor={'#e38532ff'}
          />
        )}
      />

      {isPasswordInput && (
        <TouchableOpacity
          onPress={handleClickShowPassword}
          style={{ position: 'absolute', right: 10, top: 32 }}
        >
          <Ionicons
            name={showPassword ? 'eye-off' : 'eye'}
            size={20}
            color="#777"
          />
        </TouchableOpacity>
      )}

      {error && (
        <Text style={{ color: '#f44336', marginTop: 4 }}>
          {error.message}
        </Text>
      )}
    </View>
  );
};

FormInputText.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.object,
  rules: PropTypes.object,
  isPasswordInput: PropTypes.bool,
};
