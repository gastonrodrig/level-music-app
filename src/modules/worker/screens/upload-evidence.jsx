import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, 
  Modal, TouchableWithoutFeedback, Image, Alert, FlatList, ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useQuotationStore } from '../../../hooks';
import { useSelector } from 'react-redux';

export const UploadEvidence = ({ route, navigation }) => {
  const { activity } = route.params || {};
  const { startUpdateSubtask, loading } = useQuotationStore();
  const { user } = useSelector((state) => state.auth);

  const [notes, setNotes] = useState(activity?.notas || '');
  const [status, setStatus] = useState(activity?.status || 'Pendiente');
  const [showStatusPicker, setShowStatusPicker] = useState(false);
  
  // 1. ESTADO PARA LA IMAGEN
  const [images, setImages] = useState([]);

  const statusOptions = ['Pendiente', 'Completado'];

  useEffect(() => {
  if (activity) {
    console.log("Actividad cargada:", activity.name);
    console.log("Evidencias:", activity.evidences); // <-- Verifica aquí
    setNotes(activity.notas || '');
    setStatus(activity.status || 'Pendiente');
    setImages([]);
  }
}, [activity]);

const pickImages = async () => {
    try {
      // 1. Verificar permisos
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Necesitamos acceso a la galería.');
        return;
      }

      // 2. Abrir Galería
      let result = await ImagePicker.launchImageLibraryAsync({
        // CORRECCIÓN: Usamos 'MediaTypeOptions' para evitar el crash
        mediaTypes: ImagePicker.MediaTypeOptions.Images, 
        allowsMultipleSelection: true, 
        selectionLimit: 5,
        quality: 0.7,
      });

      if (!result.canceled) {
        const newImages = result.assets.map(asset => ({
          uri: asset.uri,
          type: asset.type || 'image/jpeg',
          name: asset.fileName || `evidence_${Date.now()}.jpg`,
        }));
        setImages(prevImages => [...prevImages, ...newImages]);
      }
    } catch (error) {
      console.log("Error al abrir galería:", error);
      Alert.alert("Error", "No se pudo abrir la galería.");
    }
  };

  // Función para borrar una foto específica
  const removeImage = (indexToRemove) => {
    setImages(images.filter((_, index) => index !== indexToRemove));
  };

  // 3. CAMBIO: Enviar Array al Backend
  const handleSave = async () => {
    console.log("--- 1. Botón Guardar Presionado ---");
    console.log("Datos actuales -> Notas:", notes, "Status:", status, "Fotos:", images.length);

    try {
      // Validar que haya cambios
      // OJO: Compara contra los valores originales para ver si hubo cambios reales
      // Si activity.notas es undefined, usa '' para comparar
      const originalNotes = activity?.notas || '';
      const originalStatus = activity?.status || 'Pendiente';

      const hasChanges = 
        notes.trim() !== originalNotes.trim() || 
        status !== originalStatus || 
        images.length > 0;

      if (!hasChanges) {
        console.log("--- Cancelado: No hay cambios detectados ---");
        Alert.alert('Sin cambios', 'No has modificado nada para guardar.');
        return;
      }

      console.log("--- 2. Preparando datos para enviar ---");
      
      const updateData = {
        status: status,
        notas: notes.trim(),
        // Asegúrate de que user?._id exista, si no, usa null para evitar undefined
        worker_id: user?._id || activity?.worker || null, 
      };

      // Llamada al Store
      const result = await startUpdateSubtask(activity._id, updateData, images);

      console.log("--- 3. Resultado:", result ? "Éxito" : "Fallo");

      if (result) {
        Alert.alert('Éxito', 'La actividad se actualizó correctamente.', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      }
    } catch (error) {
      console.error('--- ERROR EN HANDLE SAVE ---', error);
      Alert.alert('Error', 'Ocurrió un problema inesperado.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <View style={styles.card}>
          
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>{activity?.phase || 'Fase'}</Text>
          </View>
          <Text style={styles.title}>{activity?.name || 'Actividad'}</Text>

          {/* Selector Estado */}
          <Text style={styles.label}>Estado</Text>
          <TouchableOpacity 
            style={styles.inputContainer} 
            onPress={() => setShowStatusPicker(true)}
            disabled={loading}
          >
            <Text style={styles.inputText}>{status}</Text>
            <Ionicons name="chevron-down" size={20} color="#9ca3af" />
          </TouchableOpacity>

          {/* Notas */}
          <Text style={styles.label}>Notas</Text>
          <View style={[styles.inputContainer, { height: 100, alignItems: 'flex-start' }]}>
            <TextInput
              style={[styles.inputText, { width: '100%', height: '100%', textAlignVertical: 'top' }]}
              placeholder="Agrega notas..."
              multiline
              value={notes}
              onChangeText={setNotes}
              editable={!loading}
            />
          </View>

          {/* --- 3. NUEVO: MOSTRAR EVIDENCIAS YA GUARDADAS (Backend) --- */}
          {activity?.evidences && activity.evidences.length > 0 && (
            <View style={{ marginTop: 12 }}>
              <Text style={styles.labelWrapper}>Evidencias Guardadas</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
                {activity.evidences.map((ev, index) => (
                  <View key={ev._id || index} style={styles.thumbnailContainer}>
                    {/* Asumiendo que ev.file_url es la URL de la imagen */}
                    
                    <Image 
                        source={{ uri: ev.file_url }} // <-- Ahora sí debería existir
                        style={styles.thumbnail} 
                    />
                     {/* Opcional: Icono de "Guardado" visual */}
                    <View style={{ position: 'absolute', bottom: 4, right: 4, backgroundColor: 'rgba(0,0,0,0.5)', borderRadius: 10, padding: 2 }}>
                        <Ionicons name="cloud-done" size={12} color="#fff" />
                    </View>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}

          {/* --- EVIDENCIAS NUEVAS (Locales) --- */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
            <Text style={styles.labelWrapper}>
               {images.length > 0 ? `Nuevas a subir (${images.length})` : 'Agregar Evidencia'}
            </Text>
            {images.length > 0 && (
              <TouchableOpacity onPress={pickImages}>
                <Text style={{ color: '#d97706', fontWeight: '600', fontSize: 13 }}>+ Agregar</Text>
              </TouchableOpacity>
            )}
          </View>

          {images.length > 0 ? (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 8 }}>
              {images.map((image, index) => (
                <View key={index} style={styles.thumbnailContainer}>
                  <Image source={{ uri: image.uri }} style={styles.thumbnail} />
                  <TouchableOpacity style={styles.removeThumbButton} onPress={() => removeImage(index)}>
                    <Ionicons name="close" size={12} color="#fff" />
                  </TouchableOpacity>
                </View>
              ))}
            </ScrollView>
          ) : (
            <TouchableOpacity style={styles.uploadButton} onPress={pickImages} disabled={loading}>
              <Ionicons name="images-outline" size={24} color="#d97706" style={{ marginRight: 8 }} />
              <Text style={styles.uploadText}>Seleccionar imágenes</Text>
            </TouchableOpacity>
          )}

          {/* Botones */}
          <View style={styles.footerButtons}>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={() => navigation.goBack()}>
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.saveButton, loading && { opacity: 0.6 }]} 
              onPress={handleSave}
              disabled={loading}
            >
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveButtonText}>Guardar</Text>}
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>

      {/* Modal */}
      <Modal visible={showStatusPicker} transparent={true} animationType="fade" onRequestClose={() => setShowStatusPicker(false)}>
        <TouchableOpacity style={styles.modalOverlay} activeOpacity={1} onPress={() => setShowStatusPicker(false)}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Seleccionar Estado</Text>
              {statusOptions.map((option, index) => (
                <TouchableOpacity key={index} style={styles.optionItem} onPress={() => { setStatus(option); setShowStatusPicker(false); }}>
                  <Text style={[styles.optionText, status === option && styles.selectedOptionText]}>{option}</Text>
                  {status === option && <Ionicons name="checkmark" size={20} color="#d97706" />}
                </TouchableOpacity>
              ))}
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  // ... (Mismos estilos que ya tienes) ...
  container: { flex: 1, backgroundColor: '#f8fafc' },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 20, borderWidth: 1, borderColor: '#e2e8f0' },
  badgeContainer: { backgroundColor: '#ffedd5', alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 12, marginBottom: 12 },
  badgeText: { color: '#d97706', fontWeight: 'bold', fontSize: 12 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginBottom: 20 },
  label: { fontSize: 14, fontWeight: '600', color: '#334155', marginBottom: 8, marginTop: 12 },
  labelWrapper: { fontSize: 14, fontWeight: '600', color: '#334155' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, paddingHorizontal: 12, paddingVertical: 12 },
  inputText: { fontSize: 15, color: '#333' },
  helperText: { fontSize: 12, color: '#64748b', marginTop: 6 },
  thumbnailContainer: { width: 100, height: 100, marginRight: 10, borderRadius: 8, overflow: 'hidden', position: 'relative', borderWidth: 1, borderColor: '#e2e8f0' },
  thumbnail: { width: '100%', height: '100%', resizeMode: 'cover' },
  removeThumbButton: { position: 'absolute', top: 4, right: 4, backgroundColor: 'rgba(0,0,0,0.6)', borderRadius: 12, padding: 4 },
  uploadButton: { borderWidth: 1, borderColor: '#d97706', borderStyle: 'dashed', borderRadius: 12, paddingVertical: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 4, backgroundColor: '#fff7ed' },
  uploadText: { color: '#d97706', fontWeight: '600', fontSize: 15 },
  footerButtons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 },
  button: { flex: 1, paddingVertical: 12, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  cancelButton: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#cbd5e1', marginRight: 10 },
  cancelButtonText: { color: '#334155', fontWeight: '600' },
  saveButton: { backgroundColor: '#d97706', marginLeft: 10 },
  saveButtonText: { color: '#fff', fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#fff', width: '85%', borderRadius: 16, padding: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 16, textAlign: 'center' },
  optionItem: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
  optionText: { fontSize: 16, color: '#475569' },
  selectedOptionText: { color: '#d97706', fontWeight: 'bold' },
});