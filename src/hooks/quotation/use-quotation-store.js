import { useDispatch, useSelector } from 'react-redux';
import { eventApi,taskApi } from '../../api';
import {
  selectedQuotation,
  setLoadingQuotation,
  setPageQuotation,
  setRowsPerPageQuotation,
  refreshQuotations,
  showSnackbar,
  setWorkerActivities,
} from '../../store';
import { createQuotationModel, updateQuotationModel, evaluateQuotationModel } from '../../shared/models/quotation';
import { useState } from 'react';
import { Platform } from 'react-native';
import { getAuthConfig, getAuthConfigWithParams } from '../../shared/utils';

export const useQuotationStore = () => {
  const dispatch = useDispatch();
  const { 
    quotations, 
    selected, 
    total, 
    loading, 
    currentPage, 
    rowsPerPage 
  } = useSelector((state) => state.quotation);

  const { token } = useSelector((state) => state.auth);

  const [searchTerm, setSearchTerm] = useState('');
  const [orderBy, setOrderBy] = useState('description');
  const [order, setOrder] = useState('asc');

  const openSnackbar = (message) => dispatch(showSnackbar({ message }));

  const startCreateQuotation = async (quotation) => {
    dispatch(setLoadingQuotation(true));
    try {
      const payload = createQuotationModel(quotation);
      await eventApi.post('/quotation', payload, getAuthConfig(token));
      return true;
    } catch (error) {
      const message = error.response?.data?.message;
      openSnackbar(message ?? "Ocurrió un error al agregar la cotización.");
      return false;
    } finally {
      dispatch(setLoadingQuotation(false));
    }
  };

  const startUpdateQuotation = async (quotationId, quotation) => {
    dispatch(setLoadingQuotation(true));
    try {
      const payload = updateQuotationModel(quotation);
      await eventApi.patch(`quotation/${quotationId}`, payload, getAuthConfig(token));
      openSnackbar("La cotización fue editada exitosamente.");
      return true;
    } catch (error) {
      const message = error.response?.data?.message;
      openSnackbar(message ?? "Ocurrió un error al editar la cotización.");
      return false;
    } finally {
      dispatch(setLoadingQuotation(false));
    }
  };

  const startTimeUpdateQuotationAdmin = async (quotationId, partial) => {
    dispatch(setLoadingQuotation(true));
    try {
      await eventApi.patch(`quotation/admin/${quotationId}`, partial, getAuthConfig(token));
      openSnackbar("La cotización fue editada exitosamente.");
      return true;
    } catch (error) {
      const message = error.response?.data?.message;
      openSnackbar(message ?? "Ocurrió un error al editar la cotización.");
      return false;
    } finally {
      dispatch(setLoadingQuotation(false));
    }
  };

  const startLoadingQuotationPaginated = async (userId, caseFilter) => {
    dispatch(setLoadingQuotation(true));
    try {
      const limit  = rowsPerPage;
      const offset = currentPage * rowsPerPage;
      const { data } = await eventApi.get('/paginated',
        getAuthConfigWithParams(token, {
          limit,
          offset,
          search: searchTerm.trim(),
          sortField: orderBy,
          sortOrder: order,
          ...(userId && { user_id: userId }),
          ...(caseFilter && { case: caseFilter }),
        })
      );
      dispatch(refreshQuotations({
        items: data.items,
        total: data.total,
        page:  currentPage,
      }));
      return true;
    } catch (error) {
      const message = error.response?.data?.message;
      openSnackbar(message ?? "Ocurrió un error al cargar las cotizaciones.");
      return false;
    } finally {
      dispatch(setLoadingQuotation(false));
    }
  };

  const startLoadingQuotationVersionsByCode = async (eventCode) => {
    dispatch(setLoadingQuotation(true));
    try {
      const { data } = await eventApi.get(`/versions/${eventCode}`, getAuthConfig(token));

      dispatch(refreshQuotations({
        items: data,
        total: data.length,
        page: 0,
      }));
      
      return true;
    } catch (error) {
      const message = error.response?.data?.message;
      openSnackbar(message ?? "Ocurrió un error al cargar las versiones de la cotización.");
      return false;
    } finally {
      dispatch(setLoadingQuotation(false));
    }
  };

  const startEvaluateQuotation = async (quotationId, evaluation, userId) => {
    dispatch(setLoadingQuotation(true));
    try {
      const payload = evaluateQuotationModel(evaluation);
      const { data } = await eventApi.patch(`${quotationId}/status`, payload, getAuthConfig(token));
      startLoadingQuotationPaginated(userId);
      if (data.status === 'Aprobado') {
        openSnackbar("La cotización fue aprobada exitosamente.");
      } else {
        openSnackbar("La cotización fue rechazada.");
      }
      return true;
    } catch (error) {
      const message = error.response?.data?.message;
      openSnackbar(message ?? "Ocurrió un error al evaluar la cotización.");
      return false; 
    } finally {
      dispatch(setLoadingQuotation(false));
    }
  }

  const startLoadingActivitiesByWorkerId = async (workerId) => {
    dispatch(setLoadingQuotation(true));
    try {
      const { data } = await eventApi.get(`${workerId}/events`, getAuthConfig(token));
      dispatch(setWorkerActivities(data));
      return true;
    } catch (error) {
      const message = error.response?.data?.message;
      openSnackbar(message ?? "Ocurrió un error al cargar las actividades del trabajador.");
      return false;
    } finally {
      dispatch(setLoadingQuotation(false));
    }
  };

  const startUpdateSubtask = async (subtaskId, updateData, files = []) => {
    dispatch(setLoadingQuotation(true));
    try {
      const formData = new FormData();
      
      // 1. Campos de Texto
      if (updateData.status) formData.append('status', updateData.status);
      if (updateData.notas !== undefined) formData.append('notas', updateData.notas);
      if (updateData.worker_id) formData.append('worker_id', updateData.worker_id);

      // 2. Archivos (CORRECCIÓN CLAVE)
      if (files && files.length > 0) {
        files.forEach((file, index) => {
          // Asegurar extensión
          const uri = file.uri;
          const name = file.name || `evidence_${index}.jpg`;
          const match = /\.(\w+)$/.exec(name);
          const ext = match ? match[1] : 'jpg';

          // Corrección para Android: URI debe empezar con file://
          const fileToUpload = {
            uri: Platform.OS === 'android' ? uri : uri.replace('file://', ''),
            type: `image/${ext === 'png' ? 'png' : 'jpeg'}`, 
            name: name,
          };

          // 🔥 CORRECCIÓN DEFINITIVA:
          // Debe llamarse 'evidences' porque así lo pusiste en tu Controller NestJS
          formData.append('evidences', fileToUpload);
        });
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', 
        }
      };

      console.log("Enviando PATCH a subtask:", subtaskId);

      const { data } = await taskApi.patch(
        `/${subtaskId}`,
        formData,
        config
      );

      openSnackbar('Actividad actualizada exitosamente');
      return data;

    } catch (error) {
      console.error("Error API:", error.response?.data || error.message);
      const message = error.response?.data?.message;
      openSnackbar(message ?? 'Error al actualizar la actividad');
      return null;
    } finally {
      dispatch(setLoadingQuotation(false));
    }
  };

  const setSelectedQuotation = (quotation) => {
    dispatch(selectedQuotation({ ...quotation }));
  };

  const setPageGlobal = (page) => {
    dispatch(setPageQuotation(page));
  };

  const setRowsPerPageGlobal = (rows) => {
    dispatch(setRowsPerPageQuotation(rows));
  };

  return {
    // state
    quotations,
    selected,
    total,
    loading,
    searchTerm,
    rowsPerPage,
    currentPage,
    orderBy,
    order,

    // setters
    setSearchTerm,
    setOrderBy,
    setOrder,
    setPageGlobal,
    setRowsPerPageGlobal,
    
    // actions
    startCreateQuotation,
    startLoadingQuotationPaginated,
    startLoadingQuotationVersionsByCode,
    setSelectedQuotation,
    startUpdateQuotation,
    startEvaluateQuotation,
    startTimeUpdateQuotationAdmin,
    startLoadingActivitiesByWorkerId,
    startUpdateSubtask,
  };
};