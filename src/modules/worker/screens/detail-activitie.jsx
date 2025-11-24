import React, { use, useEffect,useState } from "react";
import { ScrollView, View, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Text } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { formatDate } from "../../../shared/utils";
import { EventDrawer } from "../router/drawer";

export const EventDetailsScreen = ({ route, navigation }) => {
  const { eventData } = route.params;
  const [drawerVisible, setDrawerVisible] = useState(false);

  useEffect(() => {
    // Configura el headerRight con la función para abrir el drawer
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => setDrawerVisible(true)}>
          <Ionicons 
            name="document-text-outline" 
            size={22} 
            color="#333" 
            style={{ marginRight: 16 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  return (
    <>
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
            marginTop: 6,
          }}
        >
          <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 8 }}>
            
            <View style={{ marginBottom: 12 }}>      
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
            <View
              style={{
                backgroundColor: eventData.status === "Confirmado" ? "#d5f5dd" : "#fff4e0",
                paddingHorizontal: 12,
                paddingVertical: 4,
                borderRadius: 14,
                height:30,
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
      <EventDrawer
        visible={drawerVisible}
        onClose={() => setDrawerVisible(false)}
        eventData={eventData}
        navigation={navigation}
      />
      </>
  );
};
