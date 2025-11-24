import { useEffect, useMemo, useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { formatDate } from "../../../shared/utils";
import {
  useQuotationStore,
  useUsersStore
} from "../../../hooks";

export const HomeScreen = () => {
  const navigation = useNavigation();
  const { quotations, startLoadingActivitiesByWorkerId } = useQuotationStore();
  const { workerId } = useUsersStore();

  useEffect(() => {
    if (workerId) startLoadingActivitiesByWorkerId(workerId);
  }, [workerId]);
  
  const events = useMemo(() => {
    if (!Array.isArray(quotations)) return [];

    return quotations.map((item) => {
      // Calculos existentes...
      const totalEarnings =
        item.subtasks?.reduce(
          (acc, sub) => acc + (Number(sub.price) || 0),
          0
        ) || 0;
      const firstSubtask = item.subtasks?.[0];

      return {
        id: item._id,
        title: item.name,
        type: firstSubtask?.worker_type_name || "Evento",
        status: firstSubtask?.status || "Pendiente",
        date: item.event_date,
        clientName: "Cliente",
        location: item.exact_address || "Sin dirección",
        amount: totalEarnings,
        currency: "S/",
        subtasks: item.subtasks,
        email: item.email,
        phone: item.phone,
        description: item.description,
        event_code: item.event_code,
      };
    });
  }, [quotations]);

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

  const filteredEvents = useMemo(() => {
    if (selectedStatus === "Todos los estados") return events;
    return events.filter((e) => e.status === selectedStatus);
  }, [events, selectedStatus]);

  const totalPages = Math.ceil(filteredEvents.length / pageSize) || 1;
  const startIndex = (currentPage - 1) * pageSize;
  const visibleEvents = filteredEvents.slice(startIndex, startIndex + pageSize);

  const getStatusStyle = (status) => {
    if (status === "Confirmado")
      return { backgroundColor: "#d5f5dd", textColor: "#0a7d2c" };
    if (status === "Cerrado")
      return { backgroundColor: "#e5e5e5", textColor: "#555" };
    return { backgroundColor: "#fff4e0", textColor: "#d86a20" };
  };
  
  const getCardBorderColor = (status) =>
    status === "Cerrado" ? "#f09b4a" : "#f0f0f0";

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "#f5f5f5" }}
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
    >
      <View style={{ marginBottom: 16, paddingHorizontal: 4 }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <MaterialCommunityIcons
            name="filter-variant"
            size={18}
            color="#d86a20"
          />
          <Text style={{ marginLeft: 6, fontSize: 14, color: "#555" }}>
            Filtrar por:
          </Text>
          <TouchableOpacity
            onPress={() => setIsFilterOpen((p) => !p)}
            style={{
              marginLeft: 8,
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#fff",
              borderRadius: 10,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderWidth: 1,
              borderColor: "#e0e0e0",
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
        {isFilterOpen && (
          <View
            style={{
              position: "absolute",
              top: 40,
              left: 90,
              width: 180,
              backgroundColor: "#fff",
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#e0e0e0",
              paddingVertical: 4,
              zIndex: 99,
              elevation: 5,
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
                    backgroundColor: isActive ? "#fff4e5" : "#fff",
                    borderBottomWidth:
                      index === statusOptions.length - 1 ? 0 : 1,
                    borderBottomColor: "#f1f1f1",
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
        <Text style={{ marginTop: 8, fontSize: 12, color: "#828282" }}>
          Mostrando {visibleEvents.length} de {filteredEvents.length} eventos
        </Text>
      </View>
      {visibleEvents.map((event) => {
        const { backgroundColor, textColor } = getStatusStyle(event.status);
        return (
          <TouchableOpacity
            key={event.id}
            activeOpacity={0.85}
            onPress={() =>
              navigation.navigate("EventDetails", {
                eventId: event.id,
                eventData: event,
              })
            }
            style={{
              backgroundColor: "#fff",
              borderRadius: 16,
              padding: 16,
              marginBottom: 14,
              borderWidth: 1,
              borderColor: getCardBorderColor(event.status),
              elevation: 2,
            }}
          >
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
                <Text style={{ fontSize: 14, color: "#828282" }}>
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
                  style={{ fontSize: 11, fontWeight: "bold", color: textColor }}
                >
                  {event.status}
                </Text>
              </View>
            </View>
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
              <Text style={{ marginLeft: 8, fontSize: 14, color: "#333" }}>
                {formatDate(event.date)}
              </Text>
            </View>
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
              <Text style={{ marginLeft: 8, fontSize: 14, color: "#333" }}>
                {event.clientName}
              </Text>
            </View>
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
              <Text style={{ marginLeft: 8, fontSize: 14, color: "#333" }}>
                {event.location}
              </Text>
            </View>
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
          </TouchableOpacity>
        );
      })}
      <View
        style={{
          marginTop: 18,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
                  color: isActive ? "#fff" : "#333",
                  fontWeight: isActive ? "bold" : "normal",
                }}
              >
                {page}
              </Text>
            </TouchableOpacity>
          );
        })}
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
