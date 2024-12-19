import React, { useState, useEffect }  from 'react';
import {ActivityIndicator, Image, Linking, Platform, ScrollView, SafeAreaView, Text, TouchableOpacity, View, Alert, Modal, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../src/styles/app-theme';  
import { stylesBase } from "../src/styles/base-colors";
import { vinculateApi } from '../src/api/vinculateAPI';
import { useFocusEffect } from '@react-navigation/native';

const InstitucionesDescripcion = ({ navigation, route }) => {

    const [loading, setLoading] = useState(false);
    const { usuario, idUsuario, idEmpresa, talento, ies, empresaData } = route.params;
    const [mostrarBotonVincular, setMostrarBotonVincular] = useState(true);
    const [idEstatus, setIdEstatus] = useState(null);
    const [idEmpresaTalento, setIdEmpresaTalento ] = useState(null);
    const [modalVisible, setModalVisible] = useState(false); 
    const [postuladoData, setPostuladoData] = useState({}); 
    const [acceptModalVisible, setAcceptModalVisible] = useState(false); // Estado para controlar el segundo modal
    const [inputValue, setInputValue] = useState('');
    const [postuladoAceptado, setPostuladoAceptado] = useState(false);

    useFocusEffect(
        React.useCallback(() => {
            consultarMatch();
        }, [ usuario, idUsuario, idEmpresa, talento, ies, empresaData])
    );

    const llamarTelefono = async () => {
        await Linking.openURL('tel:' + ies.telefono);
    }

    const enviarWhatsApp = async () => {
        {Platform.OS === 'ios'?
            await Linking.openURL('whatsapp://send?phone=52' + ies.telefono + '&text=Hola esta empresa desea vicularse con tu Instituo de Educación Superior.')
        :
            await Linking.openURL('https://wa.me/52' + ies.telefono + '&text=Hola esta empresa desea vicularse con tu Instituo de Educación Superior.')
        }
    }

    const enviarCorreo = async () => {
        {Platform.OS === 'ios'?
            await Linking.openURL('mailto:' + ies.correo + '&subject=Vinculación con empresa')
        :
            await Linking.openURL('mailto:' + ies.correo + '?subject=Vinculación con empresa')
        }
    }

    const visitarSitio = async () => {
        await Linking.openURL('https:' + ies.paginaWeb);
    }

    const vincularAhora = () => {
        if (!idEmpresa || !talento?.idTalento) {
            Alert.alert('Advertencia', 'Faltan datos para la vinculación.');
            return;
        }

        console.log('CONSUMIENDO WS /setMatch:');
        console.log('idEmpresa:', idEmpresa);
        console.log('idTalento:', talento);

        setLoading(true);

        const formData = new FormData();
        formData.append('empresa', idEmpresa);
        formData.append('talento', talento.idTalento);

        vinculateApi.post('/setMach', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(response => {
          setLoading(false);
          if (response.data.codigo === "1" || response.data.codigo === 1) {
            Alert.alert('Éxito', response.data.texto);
            setMostrarBotonVincular(false);
          } else {
            Alert.alert('Error', 'No se pudo realizar el match');
          }
        })
        .catch(error => {
          setLoading(false);
          Alert.alert('Error', 'Hubo un problema al realizar el match');
        });
    };

    const detalleVinculacion = () => {
        if (!idEmpresaTalento) {
            Alert.alert('Advertencia', 'Faltan datos para la vinculación.');
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('idEmpresaTalento', 1);

        vinculateApi.post('/detalleVinculacion', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(response => {
          setLoading(false);

          if (response.data.codigo === "1" || response.data.codigo === 1) {
            setPostuladoData(response.data.postulado); 
            setModalVisible(true); 
            setMostrarBotonVincular(false);
          } else {
            Alert.alert('Error', 'No se pudo realizar el match');
          }
        })
        .catch(error => {
          setLoading(false);
          Alert.alert('Error', 'Hubo un problema al realizar el match');
        });
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
            Alert.alert('Advertencia', 'Faltan datos para aceptar postulado.');
            return;
        }

        // Mostrar el modal con el cuadro de texto
        setAcceptModalVisible(true);
    };

    const handleAccept = () => {
        console.log('Valor del cuadro de texto:', inputValue);
        // Lógica para aceptar el postulado




      // si postuladoAceptado = true, aceptado = 2, si postuladoAceptado = false, aceptado = 0
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
            //setPostuladoData(response.data.postulado); 
            //setModalVisible(true); 
            //setMostrarBotonVincular(false);
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

        console.log('idEmpresa:', idEmpresa);

        setLoading(true);

        const formData = new FormData();
        formData.append('idEmpresa', idEmpresa);

        vinculateApi.post('/getMatchEmpresa', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        })
        .then(response => {
           // console.log(response.data.matchEmpresa[1].nombre);
          setLoading(false);
          if (response.data.codigo === "1" || response.data.codigo === 1) {
            const matchEmpresa = response.data.matchEmpresa;
            /*
            const coincidencias = matchEmpresa.filter(match => 
                match.nombreTalento === talento.nombreTalento && 
                match.nombre === ies.nombre 
            );
            */

            const coincidencias = matchEmpresa.filter(match => 
                match.nombreTalento === talento.nombreTalento 
            );

            if (coincidencias.length > 0) {
                setMostrarBotonVincular(false);
                const ultimaCoincidencia = coincidencias[coincidencias.length - 1];
                const { idEmpresaTalento, idEstatus } = ultimaCoincidencia;

                setIdEstatus(idEstatus);
                setIdEmpresaTalento(idEmpresaTalento);
            } else {
                setMostrarBotonVincular(true);
                setIdEstatus(null);
            }
          }
        })
        .catch(error => {
          setLoading(false);
          Alert.alert('Error', 'Hubo un problema al realizar el match');
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
                            <Image style={[styles.botonCuerpo, stylesBase.botonCuerpo, { height: 32, resizeMode: 'stretch', width: 32 }]} source={require('../Componentes/img/contact32.png')} />
                            <Text style={styles.botonTexto}>¡Llamar Ahora!</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.botonCuerpo, stylesBase.botonCuerpo, { paddingLeft: 10, paddingRight: 10, marginBottom: 10, marginTop: 10 }]}
                            onPress={enviarWhatsApp}
                        >
                            <Image style={[styles.botonCuerpo, stylesBase.botonCuerpo, { height: 32, resizeMode: 'stretch', width: 32 }]} source={require('../Componentes/img/SMS2-32.png')} />
                            <Text style={styles.botonTexto}>Enviar WhatsApp</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.botonCuerpo, stylesBase.botonCuerpo, { paddingLeft: 10, paddingRight: 10, marginBottom: 10, marginTop: 10 }]}
                            onPress={enviarCorreo}
                        >
                            <Image style={[styles.botonImg, { height: 32, resizeMode: 'stretch', width: 32 }]} source={require('../Componentes/img/Email-send32.png')} />
                            <Text style={styles.botonTexto}>Enviar Correo</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.botonCuerpo, stylesBase.botonCuerpo, { paddingLeft: 10, paddingRight: 10, marginBottom: 10, marginTop: 10 }]}
                            onPress={visitarSitio}
                        >
                            <Image style={[styles.botonImg, { height: 32, resizeMode: 'stretch', width: 32 }]} source={require('../Componentes/img/webpage32.png')} />
                            <Text style={styles.botonTexto}>Visitar Sitio</Text>
                        </TouchableOpacity>


                    </View>
                </ScrollView>
            )}

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

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={modalStyles.centeredView}>
                    <View style={modalStyles.modalView}>
                        <Text style={modalStyles.modalText}>Datos del Postulado</Text>
                        <Text style={modalStyles.modalText}>Nombre: {postuladoData.postulado || ''}</Text>
                        <Text style={modalStyles.modalText}>Teléfono: {postuladoData.telefono || ''}</Text>
                        <Text style={modalStyles.modalText}>Correo: {postuladoData.correo || ''}</Text>

                        <View style={modalStyles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.botonCuerpo, stylesBase.botonCuerpo, { paddingLeft: 10, paddingRight: 10, marginBottom: 10, marginTop: 10 }]}
                                onPress={aceptarPostulado}
                            >
                                <Text style={styles.botonTexto}>Aceptar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.botonCuerpo, stylesBase.botonCuerpo, { paddingLeft: 10, paddingRight: 10, marginBottom: 10, marginTop: 10 }]}
                                onPress={rechazarPostulado}
                            >
                                <Text style={styles.botonTexto}>Rechazar</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                                style={[styles.botonCuerpo, stylesBase.botonCuerpo, { paddingLeft: 10, paddingRight: 10, marginBottom: 10, marginTop: 10 }]}
                                onPress={() => setModalVisible(false)}
                            >
                                <Text style={styles.botonTexto}>Regresar</Text>
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
}

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)', // Fondo oscuro
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
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
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
});

export default InstitucionesDescripcion;
