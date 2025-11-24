import React, { useMemo } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const ActivitiesByPhaseScreen = ({ route, navigation }) => {
  const { eventData, phase } = route.params || {};

  // Filtramos las tareas
  const filteredTasks = useMemo(() => {
    
    return (eventData?.subtasks || []).filter(task => task.phase === phase);

  }, [eventData, phase]);

  // Función para obtener colores del badge según estado
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completado':
        return { bg: '#dcfce7', text: '#166534' }; // Verde
      case 'En Progreso':
        return { bg: '#ffedd5', text: '#9a3412' }; // Naranja
      case 'Pendiente':
      default:
        return { bg: '#fef3c7', text: '#d97706' }; // Amarillo/Naranja
    }
  };

  const colorTitle = (status) => {
    switch (status) {
        case 'Planificación':
            return '#2563eb';
        case 'Ejecución':
            return '#16a34a';
        case 'Seguimiento':
            return '#db2777';
        default:
            return '#6b7280';
    }
  };

  // Renderizado de cada tarjeta
  const renderItem = ({ item }) => {
    const statusStyle = getStatusStyle(item.status);
    
    return (
      <TouchableOpacity 
        style={styles.card}
        activeOpacity={0.8}
        // 2. NAVEGAMOS PASANDO LA ACTIVIDAD
        onPress={() => navigation.navigate('ActivityDetail', { activity: item })}
        >
        {/* Fila Superior: Título y Badge */}
        <View style={styles.cardHeaderRow}>
          <Text style={styles.taskTitle}>{item.name}</Text>
          <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
            <Text style={[styles.statusText, { color: statusStyle.text }]}>
              {item.status}
            </Text>
          </View>
        </View>

        {/* Descripción / Trabajador */}
        <Text style={styles.taskDescription}>
          {item.worker_name} • {item.worker_type_name}
        </Text>
        <Text style={styles.taskSubDescription}>
           {/* Si tienes una descripción real en la subtarea, úsala aquí. Si no, un texto genérico */}
           Verificar detalles de la actividad asignada.
        </Text>

        {/* Separador */}
        <View style={styles.separator} />

        {/* Pie de tarjeta: Nombre del Evento */}
        <View style={styles.cardFooter}>
          <Ionicons name="calendar-outline" size={16} color="#666" style={{ marginRight: 6 }} />
          <Text style={styles.footerText}>{eventData.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      
      {/* 1. Cabecera Grande (Banner) */}
      <View style={styles.headerBanner}>
        <View style={styles.headerIconContainer}>
          <Ionicons name="checkmark-circle-outline" size={32} color={colorTitle(phase)} />
        </View>
        <View>
          <Text style={styles.headerTitle}>{phase}</Text>
          <Text style={styles.headerSubtitle}>Actividades de esta etapa</Text>
        </View>
      </View>

      {/* 2. Barra de Búsqueda */}
      <View style={styles.searchContainer}>
        <Ionicons name="clipboard-outline" size={20} color="#9ca3af" style={styles.searchIcon} />
        <TextInput 
          placeholder="Buscar actividades..." 
          placeholderTextColor="#9ca3af"
          style={styles.searchInput}
        />
      </View>

      {/* 3. Lista de Tareas */}
      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="file-tray-outline" size={48} color="#ccc" />
            <Text style={styles.emptyText}>No hay actividades en {phase}</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc', // Un gris muy suave casi blanco
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  // --- Header Banner ---
  headerBanner: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
  },
  headerIconContainer: {
    backgroundColor: '#eff6ff', // Azul muy claro
    padding: 10,
    borderRadius: 12,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  // --- Search Bar ---
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  // --- Card Styles ---
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  taskTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginRight: 8,
    lineHeight: 22,
  },
  statusBadge: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  taskDescription: {
    fontSize: 14,
    fontWeight: '500',
    color: '#334155',
    marginBottom: 4,
  },
  taskSubDescription: {
    fontSize: 13,
    color: '#64748b',
    lineHeight: 18,
    marginBottom: 12,
  },
  separator: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginBottom: 12,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    color: '#64748b',
    fontWeight: '500',
  },
  // --- Empty State ---
  emptyContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    marginTop: 10,
    color: '#94a3b8',
    fontSize: 15,
  },
});