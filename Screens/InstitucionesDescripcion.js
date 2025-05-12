import React, { useState, useEffect }  from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  Platform,
  ScrollView,
  SafeAreaView,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Alert,
  Modal,
  StyleSheet,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../src/styles/app-theme';  
import { stylesBase } from "../src/styles/base-colors";
import { vinculateApi } from '../src/api/vinculateAPI';
import { useFocusEffect } from '@react-navigation/native';

const getStatusDescription = (idEstatus) => {
  const statusMap = {
    '0': 'Inactivo',
    '1': 'Vigente',
    '2': 'Registro',
    '3': 'Validado',
    '4': 'En Solicitud',
    '5': 'Rechazado',
    '6': 'Datos de Empresa Actualizados',
    '7': 'Redes Sociales Actualizadas'
  };
  return statusMap[idEstatus] || 'Desconocido';
};

const InstitucionesDescripcion = ({ navigation, route }) => {

  const [loading, setLoading] = useState(false);
  const { usuario, idUsuario, idEmpresa, talento, ies, empresaData } = route.params;
  const [mostrarBotonVincular, setMostrarBotonVincular] = useState(true);
  const [idEstatus, setIdEstatus] = useState(null);
  const [idEmpresaTalento, setIdEmpresaTalento ] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); 
  const [postuladoData, setPostuladoData] = useState([]); 
  const [acceptModalVisible, setAcceptModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [postuladoAceptado, setPostuladoAceptado] = useState(false);

  // Estado para contar cuántos matches hay "En Solicitud" (idEstatus = 4) 
  // en esta misma institución.
  const [enSolicitudCount, setEnSolicitudCount] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      consultarMatch();
    }, [ usuario, idUsuario, idEmpresa, talento, ies, empresaData])
  );

  const llamarTelefono = async () => {
    await Linking.openURL('tel:' + ies.telefono);
  };

  const enviarWhatsApp = async () => {
    if(Platform.OS === 'ios') {
      await Linking.openURL('whatsapp://send?phone=52' + ies.telefono + '&text=Hola esta empresa desea vicularse con tu Instituo de Educación Superior.');
    } else {
      await Linking.openURL('https://wa.me/52' + ies.telefono + '&text=Hola esta empresa desea vicularse con tu Instituo de Educación Superior.');
    }
  };

  const enviarCorreo = async () => {
    if(Platform.OS === 'ios') {
      await Linking.openURL('mailto:' + ies.correo + '&subject=Vinculación con empresa');
    } else {
      await Linking.openURL('mailto:' + ies.correo + '?subject=Vinculación con empresa');
    }
  };

  const visitarSitio = async () => {
    await Linking.openURL('https:' + ies.paginaWeb);
  };

  const vincularAhora = () => {
    if (!idEmpresa || !talento?.idInstitucionTalento) {
      Alert.alert('Advertencia', 'Faltan datos para la vinculación.');
      return;
    }

    console.log('CONSUMIENDO WS /setMatch:');
    console.log('Payload:', {
      empresa: idEmpresa,
      idInstitucionTalento: talento.idInstitucionTalento
    });

    setLoading(true);

    const formData = new FormData();
    formData.append('empresa', idEmpresa);
    formData.append('idInstitucionTalento', talento.idInstitucionTalento);

    vinculateApi.post('/setMach', formData, {
      headers: { 
        'Content-Type': 'multipart/form-data',
        'X-API-KEY': 'V23IIUV1'
      }
    })
    .then(response => {
      console.log('API Response:', response.data);
      setLoading(false);
      if (response.data.codigo === "1" || response.data.codigo === 1) {
        Alert.alert('Éxito', response.data.texto);
        // Dejamos visible el botón para que permita múltiples matches
        // y actualizamos la cuenta de "En Solicitud"
        consultarMatch();
      } else {
        Alert.alert('Error', response.data.texto || 'No se pudo realizar el Match');
      }
    })
    .catch(error => {
      console.error('API Error:', error.response?.data || error);
      setLoading(false);
      Alert.alert('Error', 'No se pudo realizar el Match');
    });
  };

  const detalleVinculacion = async () => {
    try {
      setLoading(true);
      const response = await vinculateApi.post(
        'https://vinculate.itesa.edu.mx/seph/getMatchEmpresa',
        { idEmpresa: parseInt(idEmpresa) },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('API response:', response.data);
      if (response.data.matchEmpresa && response.data.matchEmpresa.length > 0) {
        // Filtramos solo los matches de la misma institución
        const filteredMatches = response.data.matchEmpresa.filter(
          match => match.nombre === ies.nombre
        );
        
        if (filteredMatches.length > 0) {
          setPostuladoData(filteredMatches);
          setModalVisible(true);
        } else {
          Alert.alert('Info', 'No hay matches disponibles para esta institución');
        }
      } else {
        Alert.alert('Info', 'No hay matches disponibles');
      }
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      Alert.alert('Error', 'No se pudieron obtener los matches');
    } finally {
      setLoading(false);
    }
  };

  const aceptarPostulado = () => {
    console.log(postuladoData.idPostulado);
    setModalVisible(false);
    setPostuladoAceptado(true);
    
    if (!postuladoData.idPostulado) {
      Alert.alert('Advertencia', 'Faltan datos para aceptar postulado.');
      return;
    }

    // Mostrar el modal con el cuadro de texto
    setAcceptModalVisible(true);
  };

  const rechazarPostulado = () => {
    console.log(postuladoData.idPostulado);
    setModalVisible(false);
    setPostuladoAceptado(false);
    
    if (!postuladoData.idPostulado) {
      Alert.alert('Advertencia', 'Faltan datos para rechazar postulado.');
      return;
    }

    // Mostrar el modal con el cuadro de texto
    setAcceptModalVisible(true);
  };

  const handleAccept = () => {
    console.log('Valor del cuadro de texto:', inputValue);

    const aceptado = postuladoAceptado ? 2 : 0;
    console.log('Valor de aceptado:', aceptado);
    console.log('comentario:', inputValue);
    console.log('idPostulado:', postuladoData.idPostulado);

    setLoading(true);

    const formData = new FormData();
    formData.append('comentario', inputValue);
    formData.append('idPostulado', postuladoData.idPostulado);
    formData.append('aceptado', aceptado);

    vinculateApi.post('/setRetroPostuladoEmpresa', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then(response => {
      setLoading(false);
      console.log('Respuesta:', response.data);

      if (response.data.codigo === "1" || response.data.codigo === 1) {
        Alert.alert('Éxito', response.data.texto);
      } else {
        Alert.alert('Error', 'No se pudo enviar la retroalimentación');
      }
    })
    .catch(error => {
      setLoading(false);
      Alert.alert('Error', 'Hubo un problema al realizar el match');
    });

    setAcceptModalVisible(false);
  };

  const handleCancel = () => {
    // Cerrar el modal sin hacer nada
    setAcceptModalVisible(false);
  };

  const consultarMatch = () => {
    if (!idEmpresa) {
      Alert.alert('Advertencia', 'Faltan datos para la vinculación.');
      return;
    }
  
    setLoading(true);
  
    const formData = new FormData();
    formData.append('idEmpresa', idEmpresa);
  
    vinculateApi.post('/getMatchEmpresa', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then(response => {
      setLoading(false);
      if (response.data.codigo === "1" || response.data.codigo === 1) {
        const matchEmpresa = response.data.matchEmpresa || [];

        // Filtrar los matches de esta misma institución
        const coincidencias = matchEmpresa.filter(
          match => 
            match.nombreTalento === talento.nombreTalento && 
            match.nombre === ies.nombre
        );

        if (coincidencias.length > 0) {
          const ultimaCoincidencia = coincidencias[coincidencias.length - 1];
          const { idEmpresaTalento, idEstatus } = ultimaCoincidencia;
          setIdEstatus(idEstatus);
          setIdEmpresaTalento(idEmpresaTalento);
        } else {
          setIdEstatus(null);
        }

        // Contar cuántos están "En Solicitud" (idEstatus = '4') 
        // para esta misma institución:
        const enSolicitud = matchEmpresa.filter(
          (m) => m.nombre === ies.nombre && m.idEstatus === '4'
        );
        setEnSolicitudCount(enSolicitud.length);

      }
    })
    .catch(error => {
      setLoading(false);
      Alert.alert('Error', 'Hubo un problema al consultar los matches');
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.seccionEncabezado, stylesBase.seccionEncabezado]}>
        <Text style={[styles.tituloTexto, stylesBase.tituloTexto]}>{ies.siglas}</Text>
      </View>
      
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView>
          <View style={[styles.seccionCuerpo, styles.seccionCuerpoWBorder]}>
            <Text style={styles.subtituloTexto}>{ies.nombre}</Text>
            
            <TouchableOpacity
              style={[styles.botonCuerpo, stylesBase.botonCuerpo, { paddingLeft: 10, paddingRight: 10, marginBottom: 10, marginTop: 10 }]}
              onPress={llamarTelefono}
            >
              <Image 
                style={[styles.botonCuerpo, stylesBase.botonCuerpo, { height: 32, resizeMode: 'stretch', width: 32 }]} 
                source={require('../Componentes/img/contact32.png')} 
              />
              <Text style={styles.botonTexto}>¡Llamar Ahora!</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.botonCuerpo, stylesBase.botonCuerpo, { paddingLeft: 10, paddingRight: 10, marginBottom: 10, marginTop: 10 }]}
              onPress={enviarWhatsApp}
            >
              <Image 
                style={[styles.botonCuerpo, stylesBase.botonCuerpo, { height: 32, resizeMode: 'stretch', width: 32 }]} 
                source={require('../Componentes/img/SMS2-32.png')} 
              />
              <Text style={styles.botonTexto}>Enviar WhatsApp</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.botonCuerpo, stylesBase.botonCuerpo, { paddingLeft: 10, paddingRight: 10, marginBottom: 10, marginTop: 10 }]}
              onPress={enviarCorreo}
            >
              <Image 
                style={[styles.botonImg, { height: 32, resizeMode: 'stretch', width: 32 }]} 
                source={require('../Componentes/img/Email-send32.png')} 
              />
              <Text style={styles.botonTexto}>Enviar Correo</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.botonCuerpo, stylesBase.botonCuerpo, { paddingLeft: 10, paddingRight: 10, marginBottom: 10, marginTop: 10 }]}
              onPress={visitarSitio}
            >
              <Image 
                style={[styles.botonImg, { height: 32, resizeMode: 'stretch', width: 32 }]} 
                source={require('../Componentes/img/webpage32.png')} 
              />
              <Text style={styles.botonTexto}>Visitar Sitio</Text>
            </TouchableOpacity>

            {/* Botón "Vincular Ahora" con el contador a la derecha */}
            {mostrarBotonVincular && (
              <TouchableOpacity
                style={[styles.botonCuerpo, stylesBase.botonCuerpo, { paddingLeft: 10, paddingRight: 10, marginBottom: 10, marginTop: 10 }]}
                onPress={vincularAhora}
              >
                <Image 
                  style={[styles.botonImg, { height: 32, resizeMode: 'stretch', width: 32 }]} 
                  source={require('../Componentes/img/Accept32.png')} 
                />
                {/* Se muestra el número de En Solicitud en paréntesis */}
                <Text style={styles.botonTexto}>Vincular Ahora (Solicitudes enviadas:
                     {enSolicitudCount})</Text>
              </TouchableOpacity>
            )}

            {/* Botón para ver todos los matches de esta institución */}
            <TouchableOpacity
              style={[styles.botonCuerpo, stylesBase.botonCuerpo, { paddingLeft: 10, paddingRight: 10, marginBottom: 10, marginTop: 10 }]}
              onPress={detalleVinculacion}
            >
             
              <Text style={styles.botonTexto}>Ver Matches</Text>
            </TouchableOpacity>

            {/* 
              Se eliminó por completo la sección de "Estado de Vinculación".
              (Ya no se muestra idEstatus en pantalla).
            */}
          </View>
        </ScrollView>
      )}

      {/* Modal para capturar comentarios (aceptar o rechazar postulado) */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={acceptModalVisible}
        onRequestClose={() => setAcceptModalVisible(false)}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Text style={modalStyles.modalText}>Introduce tus comentarios</Text>
            <TextInput
              style={modalStyles.textInput}
              placeholder="Escribe aquí..."
              value={inputValue}
              onChangeText={setInputValue}
            />

            <View style={modalStyles.buttonContainer}>
              <TouchableOpacity
                style={modalStyles.button}
                onPress={handleAccept}
              >
                <Text style={modalStyles.textStyle}>Aceptar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={modalStyles.button}
                onPress={handleCancel}
              >
                <Text style={modalStyles.textStyle}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal para mostrar la lista de matches disponibles */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Text style={modalStyles.modalTitle}>Mis Matches</Text>
            <FlatList
              data={postuladoData}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={modalStyles.itemContainer}>
                  <Text style={modalStyles.text}>ID: {item.idEmpresaTalento}</Text>
                  <Text style={modalStyles.text}>{item.nombre}</Text>
                  <Text style={modalStyles.text}>Talento: {item.nombreTalento}</Text>
                  <Text style={modalStyles.text}>Estado: {getStatusDescription(item.idEstatus)}</Text>
                </View>
              )}
            />
            <TouchableOpacity
              style={modalStyles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={modalStyles.textStyle}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={[styles.seccionPie, stylesBase.seccionPie]}>
        <TouchableOpacity
          style={[styles.botonCuerpo, stylesBase.botonCuerpo, { paddingLeft: 10, paddingRight: 10 }]}
          onPress={() => {
            navigation.navigate('InstitucionesSeleccion', {
              usuario: usuario,
              idUsuario: idUsuario,
              idEmpresa: idEmpresa,
              talento: talento,
              empresaData: empresaData,
            });
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="caret-back-circle-outline" size={30} color={stylesBase.icon} />
            <Text style={[styles.botonTexto, stylesBase.botonTexto]}> Regresar</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '90%', 
    height: '80%',
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  textInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    width: '100%',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#2196F3',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
  },
  itemContainer: {
    marginVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
  },
  text: {
    fontSize: 14,
    marginVertical: 2,
  },
});

export default InstitucionesDescripcion;
