import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuthStore, useUsersStore } from "../../../hooks";

export const CustomDrawer = (props) => {
  const { onLogout } = useAuthStore();
  const { firstName, lastName, workerTypeName, photoURL } = useUsersStore();
  const insets = useSafeAreaInsets();

  const fullName = `${firstName} ${lastName}`;

  const handleLogout = async () => {
    await onLogout();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#ffffff"}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ paddingTop: 0, paddingHorizontal: 0}}
        style= {{ paddingHorizontal: 0 }}
      >
        {/* HEADER NARANJA CON DEGRADADO */}
        <LinearGradient
          colors={["#d86a20", "#f8ad4f"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ 
            paddingTop: insets.top + 16,
            paddingBottom: 20,
            paddingHorizontal: 16,
            marginHorizontal: -12,
            borderRadius: 3,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={{
                height: 75,
                width: 75,
                borderRadius: 37.5,
                borderWidth: 3,
                borderColor: "#fff",
              }}
              source={{
                uri:
                  photoURL ||
                  "https://i.postimg.cc/C5Kd3m7W/user-profile-light.png",
              }}
            />

            <View style={{ marginLeft: 15 }}>
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 18,
                }}
                numberOfLines={1}
              >
                {fullName}
              </Text>

              <Text style={{ color: "white", fontSize: 14 }}>
                {workerTypeName}
              </Text>
            </View>
          </View>
        </LinearGradient>

        {/* RESTO DEL DRAWER BLANCO */}
        <View
          style={{
            backgroundColor: "#ffffff",
            paddingTop: 10,
            paddingHorizontal: 10,
            flexGrow: 1,
          }}
        >
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      {/* BOTÓN CERRAR SESIÓN */}
      <View
        style={{
          backgroundColor: "#ffffff",
          marginBottom: 70,
          paddingHorizontal: 20,
          borderTopWidth: 1,
          paddingTop: 12,
          borderTopWidth: 1.2,
          borderTopColor: "#e2e2e2",
        }}
      >
        <TouchableOpacity onPress={handleLogout}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="log-out-outline"
              size={22}
              color="#e38532"
              style={{ marginRight: 15 }}
            />
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              Cerrar Sesión
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
