import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { getTheme } from "../theme/theme";
import {
  LoginScreen,
  PruebaScreen,
  ChangePasswordScreen,
} from "../modules/auth/screens";
import {
  LoadingScreen
} from '../shared/ui'
import { useCheckAuth } from "../hooks";

const Stack = createStackNavigator();

export const AppRoutes = () => {
  const { status } = useSelector((state) => state.auth);
  const { mode } = useSelector((state) => state.theme);
  const theme = getTheme(mode);

  useCheckAuth();

  console.log(status);

  // Mostrar pantalla de carga si el estado es "checking"
  if (status === "checking") {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        initialRouteName={
          status === "authenticated"
            ? "Drawer"
            : status === "first-login-password"
            ? "ChangePassword"
            : "Login"
        }
        screenOptions={{ headerShown: false }}
      >
        {status === "not-authenticated" ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : status === "first-login-password" ? (
          <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
        ) : status === "authenticated" ? (
          <Stack.Screen name="Drawer">
            {() => <PruebaScreen />}
          </Stack.Screen>
        ) : null}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
