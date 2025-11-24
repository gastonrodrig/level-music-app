import React  from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useMemo } from 'react';

export const EventDrawer = ({ visible, onClose, eventData, navigation }) => {

  const counts = useMemo(() => {
    
    // Protección por si subtasks viene null o undefined
    const tasks = eventData?.subtasks || []; 
    

    return {
      planificacion: tasks.filter(t => t.phase === 'Planificación').length,
      ejecucion: tasks.filter(t => t.phase === 'Ejecución').length,
      seguimiento: tasks.filter(t => t.phase === 'Seguimiento').length,
      
      incidencias: tasks.filter(t => t.type === 'Incidencia').length 
    };
  }, [eventData]);

  const menuItems = {
    activities: [
      { 
        name: 'Planificación', 
        icon: 'checkmark-circle-outline', 
        count: counts.planificacion, 
        phase: 'Planificación'       
      },
      { 
        name: 'Ejecución', 
        icon: 'play-circle-outline', 
        count: counts.ejecucion, 
        phase: 'Ejecución' 
      },
      { 
        name: 'Seguimiento', 
        icon: 'stats-chart-outline', 
        count: counts.seguimiento, 
        phase: 'Seguimiento' 
      },
    ],
    management: [
      { 
        name: 'Incidencias', 
        icon: 'alert-circle-outline', 
        count: counts.incidencias, 
        color: '#ef4444' 
      },
    ],
  };

  const handleNavigate = (phase) => {
    onClose();
    navigation.navigate('ActivitiesByPhase', { eventData, phase });
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.drawer}>
          <View style={styles.header}>
            <Text style={styles.title}>Menú</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Actividades</Text>
            {menuItems.activities.map((item, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.item}
                onPress={() => handleNavigate(item.phase)}
              >
                <Ionicons name={item.icon} size={20} color="#666" />
                <Text style={styles.itemText}>{item.name}</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.count}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Gestión</Text>
            {menuItems.management.map((item, idx) => (
              <TouchableOpacity key={idx} style={styles.item}>
                <Ionicons name={item.icon} size={20} color={item.color} />
                <Text style={styles.itemText}>{item.name}</Text>
                <View style={[styles.badge, { backgroundColor: item.color }]}>
                  <Text style={styles.badgeText}>{item.count}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#666" />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  drawer: { backgroundColor: '#fff', borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, maxHeight: '80%' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  title: { fontSize: 20, fontWeight: 'bold' },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 14, color: '#999', marginBottom: 10 },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderRadius: 8, backgroundColor: '#f5f5f5', marginBottom: 8, paddingHorizontal: 12 },
  itemText: { flex: 1, marginLeft: 12, fontSize: 16 },
  badge: { backgroundColor: '#ff9800', borderRadius: 12, paddingHorizontal: 8, paddingVertical: 2, marginRight: 8 },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
});