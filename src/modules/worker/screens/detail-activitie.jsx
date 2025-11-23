import React from "react";
import { ScrollView, View } from "react-native";
import { Text } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { formatDate } from "../../../shared/utils";

export const EventDetailsScreen = ({ route }) => {
  const { eventData } = route.params;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#f5f5f5" }}
      contentContainerStyle={{ padding: 18, paddingBottom: 40 }}
    >
        {/* CARD PRINCIPAL DEL EVENTO */}
        <View
          style={{
            backgroundColor: "#ffffff",
            padding: 18,
            borderRadius: 14,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: "#e6e6e6",
            elevation: 1,
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
            <Text style={{ fontSize: 13, color: "#999", letterSpacing: 0.3 }}>
              {eventData.id}
            </Text>
            <View
              style={{
                backgroundColor: eventData.status === "Confirmado" ? "#d5f5dd" : "#fff4e0",
                paddingHorizontal: 12,
                paddingVertical: 4,
                borderRadius: 14,
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "600",
                  color: eventData.status === "Confirmado" ? "#0a7d2c" : "#d86a20",
                }}
              >
                {eventData.status}
              </Text>
            </View>
          </View>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
              color: "#1a1a1a",
              marginBottom: 6,
            }}
          >
            {eventData.title}
          </Text>

          <Text style={{ fontSize: 14, color: "#d86a20", fontWeight: "500" }}>
            {eventData.type}
          </Text>
        </View>

        {/* INFORMACIÓN DEL CLIENTE */}
        <View
          style={{
            backgroundColor: "#ffffff",
            padding: 18,
            borderRadius: 14,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: "#e6e6e6",
            elevation: 1,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 14 }}>
            <MaterialCommunityIcons
              name="account-outline"
              size={22}
              color="#d86a20"
            />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 16,
                fontWeight: "600",
                color: "#1a1a1a",
              }}
            >
              Información del Cliente
            </Text>
          </View>

          <Text style={{ fontSize: 13, color: "#d86a20", marginBottom: 4 }}>Nombre</Text>
          <Text style={{ fontSize: 15, color: "#1a1a1a", marginBottom: 12 }}>
            {eventData.clientName || "Andrea González"}
          </Text>

          <Text style={{ fontSize: 13, color: "#d86a20", marginBottom: 4 }}>Email</Text>
          <Text style={{ fontSize: 15, color: "#1a1a1a", marginBottom: 12 }}>
            {eventData.email || "andrea@gmail.com"}
          </Text>

          <Text style={{ fontSize: 13, color: "#d86a20", marginBottom: 4 }}>Teléfono</Text>
          <Text style={{ fontSize: 15, color: "#1a1a1a" }}>
            {eventData.phone || "987654321"}
          </Text>
        </View>

        {/* FECHA Y UBICACIÓN */}
        <View
          style={{
            backgroundColor: "#ffffff",
            padding: 18,
            borderRadius: 14,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: "#e6e6e6",
            elevation: 1,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 14 }}>
            <MaterialCommunityIcons
              name="calendar-outline"
              size={22}
              color="#d86a20"
            />
            <Text
              style={{
                marginLeft: 10,
                fontSize: 16,
                fontWeight: "600",
                color: "#1a1a1a",
              }}
            >
              Fecha y Ubicación
            </Text>
          </View>

          <Text style={{ fontSize: 13, color: "#d86a20", marginBottom: 4 }}>Fecha del evento</Text>
          <Text style={{ fontSize: 15, color: "#1a1a1a", marginBottom: 12 }}>
            {formatDate(eventData.date)}
          </Text>

          <Text style={{ fontSize: 13, color: "#d86a20", marginBottom: 4 }}>Hora de inicio</Text>
          <Text style={{ fontSize: 15, color: "#1a1a1a", marginBottom: 12 }}>
            {eventData.time || "15:00"}
          </Text>

          <Text style={{ fontSize: 13, color: "#d86a20", marginBottom: 4 }}>Ubicación</Text>
          <Text style={{ fontSize: 15, color: "#1a1a1a", marginBottom: 12 }}>
            {eventData.location}
          </Text>

          <Text style={{ fontSize: 13, color: "#d86a20", marginBottom: 4 }}>Referencia</Text>
          <Text style={{ fontSize: 15, color: "#1a1a1a" }}>
            {eventData.reference || "A 2 cuadras del parque principal"}
          </Text>
        </View>

        {/* DESCRIPCIÓN */}
        <View
          style={{
            backgroundColor: "#ffffff",
            padding: 18,
            borderRadius: 14,
            borderWidth: 1,
            borderColor: "#e6e6e6",
            elevation: 1,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "600",
              color: "#1a1a1a",
              marginBottom: 10,
            }}
          >
            Descripción
          </Text>

          <Text style={{ fontSize: 14, color: "#555", lineHeight: 20 }}>
            {eventData.description || "Ceremonia y recepción"}
          </Text>
        </View>
      </ScrollView>
  );
};
