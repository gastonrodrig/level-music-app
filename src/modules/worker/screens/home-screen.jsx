import React, { useMemo, useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { formatDate } from "../../../shared/utils";

export const HomeScreen = () => {
  const events = [
    {
      id: "1",
      title: "Listening Party de Rosalia",
      type: "Concierto",
      status: "Cerrado",
      date: "2025-11-05T00:00:00.000Z",
      clientName: "Gastón Rodriguez",
      location: "Dirección equis",
      amount: 1000,
      currency: "S/",
    },
    {
      id: "2",
      title: "Boda de Andrea y Carlos",
      type: "Matrimonio",
      status: "Confirmado",
      date: "2025-11-15T00:00:00.000Z",
      clientName: "Andrea Gonzales",
      location: "Hacienda Los Laureles",
      amount: 2500,
      currency: "S/",
    },
    {
      id: "3",
      title: "Cumpleaños de Mateo",
      type: "Cumpleaños",
      status: "Pendiente",
      date: "2025-12-01T00:00:00.000Z",
      clientName: "Carlos López",
      location: "Casa de campo",
      amount: 1200,
      currency: "S/",
    },
    {
      id: "4",
      title: "Conferencia Tech Fest",
      type: "Conferencia",
      status: "Confirmado",
      date: "2025-12-10T00:00:00.000Z",
      clientName: "Empresa X",
      location: "Centro de Convenciones",
      amount: 3000,
      currency: "S/",
    },
    {
      id: "5",
      title: "Evento Corporativo Fin de Año",
      type: "Corporativo",
      status: "Pendiente",
      date: "2025-12-20T00:00:00.000Z",
      clientName: "Empresa Y",
      location: "Hotel Miraflores",
      amount: 4500,
      currency: "S/",
    },
    {
      id: "6",
      title: "Show acústico",
      type: "Concierto",
      status: "Cerrado",
      date: "2026-01-10T00:00:00.000Z",
      clientName: "Lucía Pérez",
      location: "Bar La Esquina",
      amount: 800,
      currency: "S/",
    },
  ];

  // Estados UI
  const [selectedStatus, setSelectedStatus] = useState("Todos los estados");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const statusOptions = [
    "Todos los estados",
    "Confirmado",
    "Pendiente",
    "Cerrado",
  ];

  // Filtro por estado
  const filteredEvents = useMemo(() => {
    if (selectedStatus === "Todos los estados") return events;
    return events.filter((e) => e.status === selectedStatus);
  }, [events, selectedStatus]);

  // Paginación
  const totalPages = Math.ceil(filteredEvents.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const visibleEvents = filteredEvents.slice(startIndex, startIndex + pageSize);

  // Estilos según estado del evento
  const getStatusStyle = (status) => {
    if (status === "Confirmado") {
      return { backgroundColor: "#d5f5dd", textColor: "#0a7d2c" };
    }
    if (status === "Cerrado") {
      return { backgroundColor: "#e5e5e5", textColor: "#555" };
    }
    return { backgroundColor: "#fff4e0", textColor: "#d86a20" }; // Pendiente / otros
  };

  const getCardBorderColor = (status) => {
    if (status === "Cerrado") return "#f09b4a"; // borde naranja como el figma
    return "#f0f0f0";
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#f5f5f5" }}
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
    >
      {/* 🔹 FILTRO (contenedor general) */}
      <View
        style={{
          marginBottom: 16,
          paddingHorizontal: 4,
        }}
      >
        {/* Fila del filtro */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons
            name="filter-variant"
            size={18}
            color="#d86a20"
          />

          <Text style={{ marginLeft: 6, fontSize: 14, color: "#555" }}>
            Filtrar por:
          </Text>

          {/* Botón del dropdown */}
          <TouchableOpacity
            onPress={() => setIsFilterOpen((prev) => !prev)}
            style={{
              marginLeft: 8,
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#ffffff",
              borderRadius: 10,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderWidth: 1,
              borderColor: "#e0e0e0",
              shadowColor: "#000",
              shadowOpacity: 0.08,
              shadowRadius: 6,
              shadowOffset: { width: 0, height: 2 },
              elevation: 1,
            }}
          >
            <Text style={{ fontSize: 13, color: "#333" }}>
              {selectedStatus}
            </Text>

            <MaterialCommunityIcons
              name={isFilterOpen ? "chevron-up" : "chevron-down"}
              size={18}
              color="#999"
              style={{ marginLeft: 4 }}
            />
          </TouchableOpacity>
        </View>

        {/* 🔥 MENÚ FLOTANTE SOBRE EL CONTENIDO */}
        {isFilterOpen && (
          <View
            style={{
              position: "absolute",
              top: 40, // debajo del botón
              left: 90, // ajusta si quieres moverlo
              width: 180,
              backgroundColor: "#ffffff",
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#e0e0e0",
              paddingVertical: 4,
              zIndex: 99, // 🔥 SUPER IMPORTANTE para que flote encima
              elevation: 5,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 4 },
            }}
          >
            {statusOptions.map((option, index) => {
              const isActive = option === selectedStatus;

              return (
                <TouchableOpacity
                  key={option}
                  onPress={() => {
                    setSelectedStatus(option);
                    setCurrentPage(1);
                    setIsFilterOpen(false);
                  }}
                  style={{
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    backgroundColor: isActive ? "#fff4e5" : "#ffffff",
                    borderBottomWidth:
                      index === statusOptions.length - 1 ? 0 : 1,
                    borderBottomColor: "#f1f1f1",
                    borderRadius: index === 0 ? 12 : 0,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 13,
                      color: isActive ? "#d86a20" : "#555",
                      fontWeight: isActive ? "600" : "400",
                    }}
                  >
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* Texto “Mostrando X de Y” */}
        <Text style={{ marginTop: 8, fontSize: 12, color: "#828282" }}>
          Mostrando {visibleEvents.length} de {filteredEvents.length} eventos
        </Text>
      </View>

      {/* Lista de eventos (tarjetas) */}
      {visibleEvents.map((event) => {
        const { backgroundColor, textColor } = getStatusStyle(event.status);

        return (
          <View
            key={event.id}
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 16,
              padding: 16,
              marginBottom: 14,
              borderWidth: 1,
              borderColor: getCardBorderColor(event.status),
              elevation: 2,
            }}
          >
            {/* Título + tipo + badge estado */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <View style={{ flex: 1, paddingRight: 10 }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color: "#333",
                    marginBottom: 2,
                  }}
                >
                  {event.title}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: "#828282",
                  }}
                >
                  {event.type}
                </Text>
              </View>

              <View
                style={{
                  alignSelf: "flex-start",
                  backgroundColor,
                  paddingHorizontal: 10,
                  paddingVertical: 4,
                  borderRadius: 12,
                }}
              >
                <Text
                  style={{
                    fontSize: 11,
                    fontWeight: "bold",
                    color: textColor,
                  }}
                >
                  {event.status}
                </Text>
              </View>
            </View>

            {/* Fecha */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 8,
              }}
            >
              <MaterialCommunityIcons
                name="calendar-range-outline"
                size={18}
                color="#d86a20"
              />
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 14,
                  color: "#333",
                }}
              >
                {formatDate(event.date)}
              </Text>
            </View>

            {/* Cliente */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 6,
              }}
            >
              <MaterialCommunityIcons
                name="account-outline"
                size={18}
                color="#d86a20"
              />
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 14,
                  color: "#333",
                }}
              >
                {event.clientName}
              </Text>
            </View>

            {/* Lugar */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 6,
              }}
            >
              <MaterialCommunityIcons
                name="map-marker-outline"
                size={18}
                color="#d86a20"
              />
              <Text
                style={{
                  marginLeft: 8,
                  fontSize: 14,
                  color: "#333",
                }}
              >
                {event.location}
              </Text>
            </View>

            {/* Monto */}
            <Text
              style={{
                marginTop: 10,
                fontSize: 15,
                fontWeight: "bold",
                color: "#333",
              }}
            >
              {event.currency} {event.amount.toFixed(2)}
            </Text>
          </View>
        );
      })}

      {/* 🔹 Paginación */}
      <View
        style={{
          marginTop: 18,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Anterior */}
        <TouchableOpacity
          onPress={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          style={{ paddingHorizontal: 8, paddingVertical: 4 }}
        >
          <MaterialCommunityIcons
            name="chevron-left"
            size={20}
            color={currentPage === 1 ? "#ccc" : "#333"}
          />
        </TouchableOpacity>

        {/* Números de página */}
        {Array.from({ length: totalPages }).map((_, index) => {
          const page = index + 1;
          const isActive = page === currentPage;

          return (
            <TouchableOpacity
              key={page}
              onPress={() => setCurrentPage(page)}
              style={{
                marginHorizontal: 4,
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 8,
                backgroundColor: isActive ? "#d86a20" : "transparent",
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: isActive ? "#ffffff" : "#333",
                  fontWeight: isActive ? "bold" : "normal",
                }}
              >
                {page}
              </Text>
            </TouchableOpacity>
          );
        })}

        {/* Siguiente */}
        <TouchableOpacity
          onPress={() =>
            setCurrentPage((prev) => Math.min(totalPages, prev + 1))
          }
          disabled={currentPage === totalPages}
          style={{ paddingHorizontal: 8, paddingVertical: 4 }}
        >
          <MaterialCommunityIcons
            name="chevron-right"
            size={20}
            color={currentPage === totalPages ? "#ccc" : "#333"}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
