// Screens/BolsaTrabajo.js
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  FlatList,
  ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { vinculateApi } from '../src/api/vinculateAPI'; // Base URL ya configurada

const BolsaTrabajo = ({ navigation }) => {
  // Estado para el modal de creación de oferta
  const [modalVisible, setModalVisible] = useState(false);

  // Estados para los campos del formulario de oferta
  const [talentoRequerido, setTalentoRequerido] = useState('');
  const [adicionales, setAdicionales] = useState('');

  // Estado para almacenar todas las ofertas obtenidas de la DB
  const [ofertas, setOfertas] = useState([]);

  // Estado para controlar la oferta seleccionada (para ver postulados)
  const [selectedOffer, setSelectedOffer] = useState(null);

  // Estados para el modal de Aceptar/Rechazar postulados
  const [decisionModalVisible, setDecisionModalVisible] = useState(false);
  const [currentDecision, setCurrentDecision] = useState(null); // 'Aceptado' o 'Rechazado'
  const [selectedPostulantId, setSelectedPostulantId] = useState(null);
  const [comentarioEmpresa, setComentarioEmpresa] = useState('');

  // useEffect para cargar las ofertas al iniciar el componente
  useEffect(() => {
    vinculateApi.get('/getOfertas')
      .then(response => {
        console.log('Respuesta API getOfertas:', response.data);
        if (response.data.codigo === 1) {
          setOfertas(response.data.ofertas);
        } else {
          Alert.alert('Error', 'No se pudieron cargar las ofertas.');
        }
      })
      .catch(error => {
        console.error('Error al obtener ofertas:', error);
        Alert.alert('Error', 'No se pudo conectar con el servidor.');
      });
  }, []);

  // Función para crear una nueva oferta usando la API
  const crearOferta = () => {
    if (!talentoRequerido.trim()) {
      Alert.alert('Error', 'El campo "Talento requerido" es obligatorio.');
      return;
    }

    const formData = new FormData();
    formData.append('talento', talentoRequerido);
    formData.append('adicionales', adicionales);

    vinculateApi.post('/crearOfertaTrabajo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
      .then(response => {
        console.log('Respuesta API crear oferta:', response.data);
        if (response.data.codigo === 1) {
          Alert.alert("Oferta Creada", response.data.texto);
          const nuevaOferta = {
            id: response.data.idOferta, // ID retornado por la API
            talento: talentoRequerido,
            adicionales: adicionales,
            postulados: [], // Inicialmente sin postulados
            status: 'Activa'
          };
          setOfertas([...ofertas, nuevaOferta]);
        } else {
          Alert.alert("Error", response.data.texto);
        }
      })
      .catch(error => {
        console.error("Error en crearOferta:", error);
        Alert.alert("Error", "No se pudo conectar con el servidor.");
      })
      .finally(() => {
        setTalentoRequerido('');
        setAdicionales('');
        setModalVisible(false);
      });
  };

  // Función para cargar la lista de postulados de una oferta
  const cargarPostulacionesDeOferta = (offer) => {
    // Realiza la llamada GET a la API usando el id de la oferta
    vinculateApi.get(`/getPostulaciones/${offer.id}`)
      .then(response => {
        if(response.data.codigo === 1) {
          // Asigna la lista de postulados a la oferta y actualiza el estado
          const ofertaActualizada = { ...offer, postulados: response.data.postulaciones };
          setSelectedOffer(ofertaActualizada);
        } else {
          Alert.alert("Error", "No se pudieron cargar las postulaciones.");
        }
      })
      .catch(error => {
        console.error("Error al cargar postulaciones:", error);
        Alert.alert("Error", "No se pudo conectar con el servidor.");
      });
  };

  // Cuando se presiona una oferta se carga la lista de postulados y se abre el modal
  const handleOfferPress = (offer) => {
    // Primero, cargar las postulaciones de esa oferta y luego, mostrarlas
    cargarPostulacionesDeOferta(offer);
  };

  // Función para cerrar el modal de postulados
  const closePostuladosModal = () => {
    setSelectedOffer(null);
  };

  // Funciones para cambiar el estado de la oferta
  const handleFinalizarOferta = (offerId) => {
    setOfertas(prevOfertas =>
      prevOfertas.map(o => (o.id === offerId ? { ...o, status: 'Finalizada' } : o))
    );
  };

  const handleCancelarOferta = (offerId) => {
    setOfertas(prevOfertas =>
      prevOfertas.map(o => (o.id === offerId ? { ...o, status: 'Cancelada' } : o))
    );
  };

  // Manejo de postulados: abrir modal para aceptar/rechazar postulados
  const openDecisionModal = (postulantId, decision) => {
    setSelectedPostulantId(postulantId);
    setCurrentDecision(decision);
    setComentarioEmpresa('');
    setDecisionModalVisible(true);
  };

  const confirmDecision = () => {
    if (!selectedOffer || !selectedPostulantId || !currentDecision) {
      setDecisionModalVisible(false);
      return;
    }
  
    // 1) Llamada a la API
    vinculateApi.post('/actualizarPostulacion', {
      idPostulacion: selectedPostulantId,
      nuevoStatus: currentDecision,
      comentarioEmpresa
    })
    .then(res => {
      if (res.data.codigo === 1) {
        // 2) Actualizamos el estado localmente SOLO si la API respondió ok
        setSelectedOffer(prev => ({
          ...prev,
          postulados: prev.postulados.map(p =>
            p.id === selectedPostulantId
              ? { ...p, status: currentDecision, comentarioEmpresa }
              : p
          )
        }));
        Alert.alert('Éxito', res.data.texto);
      } else {
        Alert.alert('Error', res.data.texto);
      }
    })
    .catch(err => {
      console.error(err);
      Alert.alert('Error', 'No se pudo conectar con el servidor.');
    })
    .finally(() => {
      setDecisionModalVisible(false);
    });
  };
  
  

  // Render de cada oferta en la lista principal
  const renderOferta = ({ item }) => (
    <View style={styles.ofertaItem}>
      <TouchableOpacity style={{ flex: 1 }} onPress={() => handleOfferPress(item)}>
        <Text style={styles.ofertaTitulo}>Talento Requerido: {item.talento}</Text>
        <Text style={styles.ofertaAdicional}>
          Adicionales: {item.adicionales ? item.adicionales : 'Sin detalles adicionales'}
        </Text>
        <Text style={styles.ofertaEstatus}>Estatus: {item.status}</Text>
      </TouchableOpacity>
      <View style={styles.ofertaBotones}>
        <TouchableOpacity
          style={[styles.btnAccion, { backgroundColor: '#4CAF50' }]}
          onPress={() => handleFinalizarOferta(item.id)}
        >
          <Text style={styles.btnAccionTexto}>Finalizar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btnAccion, { backgroundColor: '#f44336' }]}
          onPress={() => handleCancelarOferta(item.id)}
        >
          <Text style={styles.btnAccionTexto}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Render de cada postulado en el modal de detalles
  const renderPostulado = ({ item }) => (
    <View style={styles.postuladoItem}>
      <Text style={styles.postuladoNombre}>
        {item.nombre} {item.apellidoPaterno} {item.apellidoMaterno}
      </Text>
      <Text style={styles.postuladoInfo}>Tel: {item.telefono} | {item.correo}</Text>
      <Text style={styles.postuladoInfo}>Comentario: {item.comentario}</Text>
      {item.status !== 'Pendiente' && (
        <>
          <Text style={styles.postuladoEstatus}>Estatus: {item.status}</Text>
          {item.comentarioEmpresa && (
            <Text style={styles.postuladoEmpresa}>Comentario Empresa: {item.comentarioEmpresa}</Text>
          )}
        </>
      )}
      {item.status === 'Pendiente' && (
        <View style={styles.postuladoBotones}>
          <TouchableOpacity
            style={[styles.btnAccion, { backgroundColor: '#4CAF50' }]}
            onPress={() => openDecisionModal(item.id, 'Aceptado')}
          >
            <Text style={styles.btnAccionTexto}>Aceptar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnAccion, { backgroundColor: '#f44336' }]}
            onPress={() => openDecisionModal(item.id, 'Rechazado')}
          >
            <Text style={styles.btnAccionTexto}>Rechazar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bolsa de Trabajo</Text>

      {/* Botón para abrir modal de crear oferta */}
      <TouchableOpacity style={styles.botonCrearOferta} onPress={() => setModalVisible(true)}>
        <Icon name="add-circle-outline" size={24} color="#fff" />
        <Text style={styles.botonTexto}>Crear Oferta de Trabajo</Text>
      </TouchableOpacity>

      {/* Lista de ofertas */}
      {ofertas.length === 0 ? (
        <Text style={styles.sinOfertas}>No hay ofertas creadas.</Text>
      ) : (
        <FlatList
          data={ofertas}
          keyExtractor={item => item.id.toString()}
          renderItem={renderOferta}
          style={{ width: '100%', marginTop: 10 }}
        />
      )}

      {/* Modal de creación de oferta */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Crear nueva oferta</Text>
            <Text style={styles.label}>Talento requerido *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ejemplo: Desarrollador React Native"
              value={talentoRequerido}
              onChangeText={setTalentoRequerido}
            />
            <Text style={styles.label}>Adicionales (Opcional)</Text>
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Ejemplo: Inglés avanzado, disponibilidad inmediata..."
              value={adicionales}
              onChangeText={setAdicionales}
              multiline
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, { backgroundColor: '#4CAF50' }]} onPress={crearOferta}>
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#f44336' }]}
                onPress={() => {
                  setModalVisible(false);
                  setTalentoRequerido('');
                  setAdicionales('');
                }}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal para ver los postulados de la oferta seleccionada */}
      {selectedOffer && (
        <Modal
          visible={true}
          animationType="slide"
          transparent
          onRequestClose={closePostuladosModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Postulados para: {selectedOffer.talento}</Text>
              {selectedOffer.postulados && selectedOffer.postulados.length > 0 ? (
                <FlatList
                  data={selectedOffer.postulados}
                  keyExtractor={item => item.id.toString()}
                  renderItem={renderPostulado}
                />
              ) : (
                <Text style={styles.sinOfertas}>No hay postulados disponibles.</Text>
              )}
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#2196F3', marginTop: 15 }]}
                onPress={closePostuladosModal}
              >
                <Text style={styles.buttonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* Modal para aceptar/rechazar postulados */}
      <Modal
        visible={decisionModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setDecisionModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>
              {currentDecision === 'Aceptado' ? 'Aceptar' : 'Rechazar'} Postulado
            </Text>
            <Text style={styles.label}>Comentario para el postulado</Text>
            <TextInput
              style={[styles.input, { height: 80 }]}
              placeholder="Escribe aquí un comentario para el postulado..."
              value={comentarioEmpresa}
              onChangeText={setComentarioEmpresa}
              multiline
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#4CAF50' }]}
                onPress={confirmDecision}
              >
                <Text style={styles.buttonText}>Confirmar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#f44336' }]}
                onPress={() => setDecisionModalVisible(false)}
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

export default BolsaTrabajo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10
  },
  botonCrearOferta: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    alignSelf: 'center'
  },
  botonTexto: {
    color: '#FFF',
    marginLeft: 6,
    fontSize: 16
  },
  sinOfertas: {
    marginTop: 20,
    textAlign: 'center',
    color: '#555'
  },
  ofertaItem: {
    backgroundColor: '#F2F2F2',
    padding: 15,
    marginVertical: 5,
    borderRadius: 5
  },
  ofertaTitulo: {
    fontWeight: 'bold',
    fontSize: 16
  },
  ofertaAdicional: {
    fontSize: 14,
    color: '#555'
  },
  ofertaEstatus: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 5
  },
  ofertaBotones: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between'
  },
  btnAccion: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: 'center'
  },
  btnAccionTexto: {
    color: '#FFF',
    fontWeight: 'bold'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContainer: {
    width: '85%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    maxHeight: '80%'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center'
  },
  label: {
    fontSize: 14,
    marginTop: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    marginTop: 5,
    paddingHorizontal: 10,
    height: 40
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold'
  },
  postuladoItem: {
    backgroundColor: '#EEE',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5
  },
  postuladoNombre: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  postuladoInfo: {
    fontSize: 14,
    color: '#555'
  },
  postuladoEstatus: {
    marginTop: 5,
    fontSize: 14,
    fontStyle: 'italic'
  },
  postuladoEmpresa: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 3
  },
  postuladoBotones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  }
});
