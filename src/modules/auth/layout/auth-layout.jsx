import { ScrollView, View, Text, Button, Image } from 'react-native';
import { Card, useTheme } from 'react-native-paper';

export const AuthLayout = ({
  logoUri,
  title,
  subtitle,
  children,
  footerText,
  onSubmit,
  onLogout,
}) => {
  const theme = useTheme();

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
        source={{ uri: logoUri }}
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
          fontSize: 16,
          fontWeight: '500',
          color: theme.colors.text,
          textAlign: 'center',
          marginTop: 10,
          marginBottom: 8,
        }}
      >
        {title}
      </Text>

      {/* Subtítulo */}
      <Text
        style={{
          fontSize: 14,
          color: '#777',
          marginBottom: 38,
          marginHorizontal: 50,
          textAlign: 'center',
        }}
      >
        {subtitle}
      </Text>

      {/* Contenido del Card */}
      <View style={{ marginHorizontal: 20, width: '85%' }}>
        <Card
          style={{
            paddingVertical: 25,
            paddingHorizontal: 20,
            width: '100%',
            borderRadius: 12,
            justifyContent: 'center',
            marginBottom: 40,
            backgroundColor: theme.colors.tableBackgroundColor,
          }}
        >
          {children} 
        </Card>
      </View>

      {/* Footer */}
      <Text
        style={{
          textAlign: 'center',
          color: '#777',
          fontSize: 14,
          width: '80%',
          marginTop: 8,
        }}
      >
        {footerText}
      </Text>
    </ScrollView>
  );
};