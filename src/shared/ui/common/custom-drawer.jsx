import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { useState } from "react";
import { Switch } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { useAuthStore, useUsersStore } from "../../../hooks"; 

export const CustomDrawer = (props) => {
  const { onLogout } = useAuthStore(); 
  const { firstName, lastName, role, photoURL, updatedAt, createdAt } = useUsersStore(); 
  const [isSwitchOn, setIsSwitchOn] = useState(false);

  const onToggleSwitch = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  const handleLogout = async () => {
    await onLogout();
  };

  const fullName = `${firstName} ${lastName}`;

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <ImageBackground
          style={{
            margin: 0,
            paddingStart: 10,
            paddingBottom: 10,
            backgroundColor: "#e38532", // Ajusta el color de fondo
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            {/* Foto de perfil del usuario */}
            <Image
              style={{
                marginBottom: 10,
                height: 80,
                width: 80,
                borderRadius: 40,
                borderWidth: 3,
                borderColor: "#fff",
              }}
              source={{
                uri:
                  photoURL ||
                  "https://i.postimg.cc/C5Kd3m7W/user-profile-light.png",
              }} // Usa la foto del usuario o una predeterminada
            />
            <View style={{ marginLeft: 15 }}>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
              >
                {fullName || "Nombre de Usuario"}{" "}
                {/* Muestra el nombre completo del usuario */}
              </Text>
              <Text style={{ color: "white", fontSize: 14 }}>
                {role || "Trabajador"} {/* Muestra el rol del usuario */}
                {updatedAt} - {createdAt}
              </Text>
              <Text style={{ color: "white", fontSize: 14, marginTop: 10 }}>
                {isSwitchOn ? "Tema: Claro" : "Tema: Oscuro"}
              </Text>
              <Switch
                color="#fff"
                value={isSwitchOn}
                onValueChange={onToggleSwitch}
              />
            </View>
          </View>
        </ImageBackground>

        <View style={{ paddingBottom: 5 }}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>

      <View
        style={{
          marginBottom: 15,
          padding: 20,
          borderTopWidth: 1,
          borderTopColor: "#ccc",
        }}
      >
        <TouchableOpacity onPress={handleLogout}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              name="log-out-outline"
              size={22}
              color="#e38532ff"
              style={{ marginRight: 15 }}
            />
            <Text style={{ fontSize: 16, fontWeight: "bold", lineHeight: 22 }}>
              Cerrar Sesión
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
