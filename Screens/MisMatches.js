import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator, 
  StyleSheet, 
  Alert, 
  TouchableOpacity, 
  Modal, 
  TextInput 
} from 'react-native';
import { vinculateApi } from '../src/api/vinculateAPI';
import { useFocusEffect } from '@react-navigation/native';

export const MisMatches = ({ route }) => {
  const { idEmpresa } = route.params;
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [currentPostulado, setCurrentPostulado] = useState(null);
  const [accion, setAccion] = useState(null);
  const [comentario, setComentario] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      fetchMatches();
    }, [])
  );

  const getStatusDescription = (idEstatus) => {
    const statusMap = {
      '0': 'Inactivo',
      '1': 'Vigente',
      '2': 'Registro',
      '3': 'Validado',
      '4': 'En Solicitud',
      '5': 'Rechazado',
      '6': 'Datos de Empresa Actualizados',
      '7': 'Redes Sociales Actualizadas',
    };
    return statusMap[idEstatus] || 'Cancelado';
  };

  const getPostuladoStatusDescription = (estatusPostulado) => {
    const postuladoStatusMap = {
      '0': 'Rechazado',
      '2': 'Aceptado',
    };
    return postuladoStatusMap[estatusPostulado] || 'Desconocido';
  };

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const response = await vinculateApi.post(
        'https://vinculate.itesa.edu.mx/seph/getMatchEmpresa',
        { idEmpresa: parseInt(idEmpresa) },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      const matchesData = response.data.matchEmpresa || [];

      const updatedMatches = await Promise.all(
        matchesData.map(async (match) => {
          if (match.idEstatus === '3') {
            const detalle = await fetchDetalleMatch(match.idEmpresaTalento);
            return { ...match, ...detalle };
          }
          return match;
        })
      );

      setMatches(updatedMatches);
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDetalleMatch = async (idEmpresaTalento) => {
    try {
      const response = await vinculateApi.post(
        'https://vinculate.itesa.edu.mx/seph/detalleVinculacion',
        { idEmpresaTalento },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': 'V23IIUV1',
          },
        }
      );

      const postulado = response.data.postulado || {};
      const comentarios = postulado.comentarios || [];
      const comentariosEmpresa = comentarios.filter(
        (comentario) => comentario.idTipoComentario === '2'
      );
      const comentariosInstitucion = comentarios.filter(
        (comentario) => comentario.idTipoComentario === '1'
      );

      return {
        idPostulado: postulado.idPostulado || 'N/A',
        tipoVinculacion: postulado.tipoVinculacion || 'N/A',
        nombrePostulado: postulado.postulado || 'N/A',
        correo: postulado.correo || 'N/A',
        telefono: postulado.telefono || 'N/A',
        estatusPostulado: postulado.estatusPostulado || 'N/A',
        comentariosEmpresa,
        comentariosInstitucion,
      };
    } catch (error) {
      console.error('Error obteniendo detalle del match:', error.response?.data || error.message);
      return {};
    }
  };

  const cancelarMatch = async (idEmpresaTalento) => {
    try {
      setLoading(true);
      const response = await vinculateApi.post(
        'https://vinculate.itesa.edu.mx/seph/setCancelarMatch',
        { idEmpresaTalento },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': 'V23IIUV1',
          }
        }
      );

      if (response.data.codigo === '1') {
        Alert.alert('Éxito', response.data.texto);
        setMatches((prevMatches) =>
          prevMatches.map((match) =>
            match.idEmpresaTalento === idEmpresaTalento
              ? { ...match, idEstatus: '5' }
              : match
          )
        );
      } else {
        Alert.alert('Error', response.data.texto || 'No se pudo cancelar el match');
      }
    } catch (error) {
      console.error('Error cancelando match:', error.response?.data || error.message);
      Alert.alert('Error', 'Ocurrió un problema al cancelar el match');
    } finally {
      setLoading(false);
    }
  };

  const enviarRetroalimentacion = async () => {
    if (!comentario.trim()) {
      Alert.alert('Error', 'Por favor ingrese un comentario antes de continuar.');
      return;
    }

    try {
      setLoading(true);
      const response = await vinculateApi.post(
        'https://vinculate.itesa.edu.mx/seph/setRetroPostuladoEmpresa',
        {
          comentario,
          idPostulado: currentPostulado,
          aceptado: accion === 'aceptar' ? 2 : 0,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': 'V23IIUV1',
          }
        }
      );

      if (response.data.codigo === '1') {
        Alert.alert('Éxito', response.data.texto);
        setMatches((prevMatches) =>
          prevMatches.map((match) =>
            match.idPostulado === currentPostulado
              ? { ...match, idEstatus: accion === 'aceptar' ? '1' : '5' }
              : match
          )
        );
      } else {
        Alert.alert('', response.data.texto || 'No se pudo enviar la retroalimentación');
      }
    } catch (error) {
      console.error(' enviando retroalimentación:', error.response?.data || error.message);
      Alert.alert('', 'Ocurrió un problema al enviar la retroalimentación.');
    } finally {
      setModalVisible(false);
      setComentario('');
      setLoading(false);
    }
  };

  const handleAction = (postuladoId, action) => {
    setCurrentPostulado(postuladoId);
    setAccion(action);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={matches}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.title}>ID del Match: {item.idEmpresaTalento}</Text>
              <Text style={styles.subtitle}>Institución: {item.nombre}</Text>
              <Text style={styles.info}>Talento: {item.nombreTalento}</Text>
              <Text
                style={[styles.status, {
                  color: item.idEstatus === '3' ? '#2E7D32' :
                    item.idEstatus === '4' ? '#ED6C02' :
                      item.idEstatus === '5' ? '#D32F2F' :
                        item.idEstatus === '1' ? '#1976D2' : '#757575',
                }]}
              >
                Estado: {getStatusDescription(item.idEstatus)}
              </Text>

              {/* Mostrar datos adicionales */}
              {item.idPostulado && (
                <View style={styles.detailsContainer}>
                  <Text style={styles.detailsText}>
                    <Text style={{ fontWeight: 'bold' }}>Tipo Vinculación:</Text> {item.tipoVinculacion}
                  </Text>
                  <Text style={styles.detailsText}>
                    <Text style={{ fontWeight: 'bold' }}>Nombre:</Text> {item.nombrePostulado}
                  </Text>
                  <Text style={styles.detailsText}>
                    <Text style={{ fontWeight: 'bold' }}>Correo:</Text> {item.correo}
                  </Text>
                  <Text style={styles.detailsText}>
                    <Text style={{ fontWeight: 'bold' }}>Teléfono:</Text> {item.telefono}
                  </Text>
                </View>
              )}

              {/* Mostrar Comentarios de la Empresa */}
{item.comentariosEmpresa && item.comentariosEmpresa.length > 0 && (
  <View style={styles.commentsContainer}>
    <Text style={styles.commentsTitle}>Comentarios de la Empresa:</Text>
    {item.comentariosEmpresa.map((comentario, index) => (
      <Text key={index} style={styles.comment}>
        - {comentario.comentario}
      </Text>
    ))}
  </View>
)}

{/* Mostrar Comentarios de la Institución */}
{item.comentariosInstitucion && item.comentariosInstitucion.length > 0 && (
  <View style={styles.commentsContainer}>
    <Text style={styles.commentsTitle}>Comentarios de la Institución:</Text>
    {item.comentariosInstitucion.map((comentario, index) => (
      <Text key={index} style={styles.comment}>
        - {comentario.comentario}
      </Text>
    ))}
  </View>
)}

             {/* Mostrar Estatus del Postulado */}
{item.estatusPostulado && getPostuladoStatusDescription(item.estatusPostulado) !== 'Desconocido' && (
  <View style={styles.postuladoStatusContainer}>
    <Text style={styles.postuladoStatusTitle}>Estatus del Postulado:</Text>
    <Text
      style={[
        styles.postuladoStatus,
        {
          color: item.estatusPostulado === '2' ? '#27ae60' : // Aceptado
                 item.estatusPostulado === '0' ? '#e74c3c' : // Rechazado
                 '#555', // Otros
          fontSize: item.estatusPostulado === '2' || item.estatusPostulado === '0' ? 16 : 14,
          fontWeight: item.estatusPostulado === '2' || item.estatusPostulado === '0' ? 'bold' : 'normal',
        },
      ]}
    >
      {getPostuladoStatusDescription(item.estatusPostulado)}
    </Text>
  </View>
)}

             {/* Botones de Aceptar y Rechazar */}
{getPostuladoStatusDescription(item.estatusPostulado) === 'Desconocido' && item.idEstatus === '3' && (
  <View style={styles.buttonGroup}>
    <TouchableOpacity
      style={styles.acceptButton}
      onPress={() => handleAction(item.idPostulado, 'aceptar')}
    >
      <Text style={styles.buttonText}>Aceptar Postulado</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.rejectButton}
      onPress={() => handleAction(item.idPostulado, 'rechazar')}
    >
      <Text style={styles.buttonText}>Rechazar Postulado</Text>
    </TouchableOpacity>
  </View>
)}

              {/* Botón de Cancelar Match */}
              {item.idEstatus === '4' && (
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={() => cancelarMatch(item.idEmpresaTalento)}
                >
                  <Text style={styles.cancelButtonText}>Cancelar Match</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      )}

      {/* Modal para ingresar comentarios */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {accion === 'aceptar'
                ? '¿Por qué se aceptó el postulado?'
                : '¿Por qué se rechazó el postulado?'}
            </Text>
            <TextInput
              style={styles.textInput}
              placeholder="Escriba su comentario aquí..."
              multiline
              value={comentario}
              onChangeText={setComentario}
            />
            <View style={styles.modalButtonGroup}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={enviarRetroalimentacion}
              >
                <Text style={styles.buttonText}>Enviar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => {
                  setModalVisible(false);
                  setComentario('');
                  setCurrentPostulado(null);
                  setAccion(null);
                }}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f9',
    padding: 16,
  },
  item: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 6,
  },
  info: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    padding: 6,
    borderRadius: 4,
    textAlign: 'center',
    alignSelf: 'flex-start',
  },
  detailsContainer: {
    marginTop: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  detailsText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  commentsContainer: {
    marginTop: 12,
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  comment: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
    marginLeft: 8,
  },
  postuladoStatusContainer: {
    marginTop: 12,
  },
  postuladoStatusTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  postuladoStatus: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  acceptButton: {
    backgroundColor: '#27ae60',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  rejectButton: {
    backgroundColor: '#e74c3c',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  cancelButton: {
    backgroundColor: '#95a5a6',
    padding: 10,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#bdc3c7',
    borderRadius: 8,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 16,
    fontSize: 14,
    color: '#34495e',
  },
  modalButtonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    backgroundColor: '#27ae60',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: 'center',
  },
  modalCancelButton: {
    backgroundColor: '#e74c3c',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: 'center',
  },
});

export default MisMatches;

