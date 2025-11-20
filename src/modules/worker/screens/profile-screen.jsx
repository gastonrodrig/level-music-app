import React from "react";
import { View, Image, ScrollView } from "react-native";
import { Text } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { formatDate } from "../../../shared/utils";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useSelector } from "react-redux";

export const ProfileScreen = () => {
  const authState = useSelector((state) => state.auth);

  const {
    firstName,
    lastName,
    email,
    role,
    userStatus,
    documentNumber,
    phone,
    createdAt,
    updatedAt,
  } = authState;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#f5f5f5" }}
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
    >
      {/* HEADER PERFIL */}
      <LinearGradient
        colors={["#d86a20", "#f8ad4f"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          width: "100%",
          paddingVertical: 25,
          borderRadius: 18,
          alignItems: "center",
          marginBottom: 25,
          elevation: 3,
        }}
      >
        <Image
          source={{
            uri: "https://i.postimg.cc/C5Kd3m7W/user-profile-light.png",
          }}
          style={{
            width: 95,
            height: 95,
            borderRadius: 47.5,
            borderWidth: 3,
            borderColor: "#fff",
            marginBottom: 10,
          }}
        />

        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {firstName} {lastName}
        </Text>

        <Text
          style={{
            color: "white",
            fontSize: 14,
            marginTop: 2,
          }}
        >
          {role || "Sonidista"}
        </Text>
      </LinearGradient>

      {/* INFORMACIÓN PERSONAL */}
      <View
        style={{
          backgroundColor: "#fff",
          padding: 18,
          borderRadius: 16,
          marginBottom: 18,
          elevation: 2,
        }}
      >
        {/* Título sección */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <MaterialCommunityIcons
            name="account-outline"
            size={22}
            color="#d86a20"
          />
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              marginLeft: 10,
              color: "#333",
            }}
          >
            Información Personal
          </Text>
        </View>

        {/* Dni */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#fff3e6",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialCommunityIcons
              name="card-account-details-outline"
              size={22}
              color="#d86a20"
            />
          </View>

          <View style={{ marginLeft: 12 }}>
            <Text
              style={{
                fontSize: 14,
                color: "#828282",
              }}
            >
              Dni
            </Text>
            <Text
              style={{
                fontSize: 15,
                marginTop: 2,
                color: "#333",
              }}
            >
              {documentNumber || "-"}
            </Text>
          </View>
        </View>

        <View
          style={{
            height: 1,
            backgroundColor: "#e6e6e6",
            marginVertical: 8,
          }}
        />

        {/* Email */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#fff3e6",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialCommunityIcons
              name="email-outline"
              size={22}
              color="#d86a20"
            />
          </View>

          <View style={{ marginLeft: 12 }}>
            <Text
              style={{
                fontSize: 14,
                color: "#828282",
              }}
            >
              Email
            </Text>
            <Text
              style={{
                fontSize: 15,
                marginTop: 2,
                color: "#333",
              }}
            >
              {email}
            </Text>
          </View>
        </View>

        <View
          style={{
            height: 1,
            backgroundColor: "#e6e6e6",
            marginVertical: 8,
          }}
        />

        {/* Teléfono */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 4,
          }}
        >
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: "#fff3e6",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <MaterialCommunityIcons
              name="phone-outline"
              size={22}
              color="#d86a20"
            />
          </View>

          <View style={{ marginLeft: 12 }}>
            <Text
              style={{
                fontSize: 14,
                color: "#828282",
              }}
            >
              Teléfono
            </Text>
            <Text
              style={{
                fontSize: 15,
                marginTop: 2,
                color: "#333",
              }}
            >
              {phone || "-"}
            </Text>
          </View>
        </View>
      </View>

      {/* INFORMACIÓN DE CUENTA */}
      {(createdAt || updatedAt) && (
        <View
          style={{
            backgroundColor: "#fff",
            padding: 18,
            borderRadius: 16,
            marginBottom: 18,
            elevation: 2,
          }}
        >
          {/* Título sección */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <MaterialCommunityIcons
              name="calendar-range-outline"
              size={22}
              color="#d86a20"
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                marginLeft: 10,
                color: "#333",
              }}
            >
              Información de Cuenta
            </Text>
          </View>

          {/* Fecha de Registro */}
          {createdAt && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "#828282",
                }}
              >
                Fecha de Registro
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: "#333",
                }}
              >
                {formatDate(createdAt)}
              </Text>
            </View>
          )}

          {/* Separador si hay ambas fechas */}
          {createdAt && updatedAt && (
            <View
              style={{
                height: 1,
                backgroundColor: "#e6e6e6",
                marginVertical: 8,
              }}
            />
          )}

          {/* Última Actualización */}
          {updatedAt && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: "#828282",
                }}
              >
                Última Actualización
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  color: "#333",
                }}
              >
                {formatDate(updatedAt)}
              </Text>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};
