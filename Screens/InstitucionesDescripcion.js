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
import { stylesBase } from '../src/styles/base-colors';
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
  const [modalVisible, setModalVisible] = useState(false);
  const [postuladoData, setPostuladoData] = useState([]);
  const [acceptModalVisible, setAcceptModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [postuladoAceptado, setPostuladoAceptado] = useState(false);
  const [enSolicitudCount, setEnSolicitudCount] = useState(0);
  const [idEstatus, setIdEstatus] = useState(null);
  const [idEmpresaTalento, setIdEmpresaTalento] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      consultarMatch();
    }, [usuario, idUsuario, idEmpresa, talento, ies, empresaData])
  );

  const llamarTelefono = () => Linking.openURL('tel:' + ies.telefono);

  const enviarWhatsApp = () => {
    const url = Platform.OS === 'ios'
      ? `whatsapp://send?phone=52${ies.telefono}&text=Hola esta empresa desea vincularse con tu Instituo`  
      : `https://wa.me/52${ies.telefono}?text=Hola esta empresa desea vincularse con tu Instituo`;
    return Linking.openURL(url);
  };

  const enviarCorreo = () => {
    const url = Platform.OS === 'ios'
      ? `mailto:${ies.correo}?subject=Vinculación con empresa`  
      : `mailto:${ies.correo}?subject=Vinculación con empresa`;
    return Linking.openURL(url);
  };

  const visitarSitio = () => Linking.openURL(ies.paginaWeb.startsWith('http') ? ies.paginaWeb : `https://${ies.paginaWeb}`);

  const vincularAhora = () => {
    if (!idEmpresa || !talento?.idInstitucionTalento) {
      return Alert.alert('Advertencia', 'Faltan datos para la vinculación.');
    }
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
      .then(({ data }) => {
        setLoading(false);
        if (data.codigo === 1 || data.codigo === '1') {
          Alert.alert('Éxito', data.texto);
          consultarMatch();
        } else {
          Alert.alert('Error', data.texto || 'No se pudo realizar el Match');
        }
      })
      .catch(err => {
        console.error('API Error:', err);
        setLoading(false);
        Alert.alert('Error', 'No se pudo realizar el Match');
      });
  };

  const detalleVinculacion = async () => {
    setLoading(true);
    try {
      const { data } = await vinculateApi.post('/getMatchEmpresa', { idEmpresa: parseInt(idEmpresa) });
      setLoading(false);
      if (data.matchEmpresa?.length) {
        const filtered = data.matchEmpresa.filter(m => m.nombre === ies.nombre);
        if (filtered.length) {
          setPostuladoData(filtered);
          setModalVisible(true);
        } else Alert.alert('Info', 'No hay matches disponibles para esta institución');
      } else {
        Alert.alert('Info', 'No hay matches disponibles');
      }
    } catch (e) {
      console.error('API Error:', e);
      setLoading(false);
      Alert.alert('Error', 'No se pudieron obtener los matches');
    }
  };

  const aceptarPostulado = (post) => {
    setPostuladoAceptado(true);
    setPostuladoData(post);
    setModalVisible(false);
    setAcceptModalVisible(true);
  };

  const rechazarPostulado = (post) => {
    setPostuladoAceptado(false);
    setPostuladoData(post);
    setModalVisible(false);
    setAcceptModalVisible(true);
  };

  const handleAccept = () => {
    const aceptado = postuladoAceptado ? 2 : 0;
    const formData = new FormData();
    formData.append('comentario', inputValue);
    formData.append('idPostulado', postuladoData.idPostulado);
    formData.append('aceptado', aceptado);
    setLoading(true);

    vinculateApi.post('/setRetroPostuladoEmpresa', formData)
      .then(({ data }) => {
        setLoading(false);
        if (data.codigo === 1 || data.codigo === '1') {
          Alert.alert('Éxito', data.texto);
        } else {
          Alert.alert('Error', 'No se pudo enviar la retroalimentación');
        }
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
        Alert.alert('Error', 'Hubo un problema al enviar la retroalimentación');
      });

    setAcceptModalVisible(false);
    setInputValue('');
  };

  const handleCancel = () => setAcceptModalVisible(false);

  const consultarMatch = () => {
    if (!idEmpresa) return;
    setLoading(true);

    const formData = new FormData();
    formData.append('idEmpresa', idEmpresa);

    vinculateApi.post('/getMatchEmpresa', formData)
      .then(({ data }) => {
        setLoading(false);
        if (data.codigo === 1 || data.codigo === '1') {
          const matches = data.matchEmpresa || [];
          // estado y conteos
          const same = matches.filter(m => m.nombreTalento === talento.nombreTalento && m.nombre === ies.nombre);
          if (same.length) {
            const last = same[same.length - 1];
            setIdEmpresaTalento(last.idEmpresaTalento);
            setIdEstatus(last.idEstatus);
          } else {
            setIdEstatus(null);
          }
          const enSol = matches.filter(m => m.nombre === ies.nombre && m.idEstatus === '4');
          setEnSolicitudCount(enSol.length);
        }
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const renderMatchItem = ({ item }) => (
    <View style={modalStyles.itemContainer}>
      <Text style={modalStyles.text}>ID: {item.idEmpresaTalento}</Text>
      <Text style={modalStyles.text}>{item.nombre}</Text>
      <Text style={modalStyles.text}>Talento: {item.nombreTalento}</Text>
      <Text style={modalStyles.text}>Estado: {getStatusDescription(item.idEstatus)}</Text>
      {item.idEstatus === '4' && (
        <View style={modalStyles.buttonContainer}>
          <TouchableOpacity style={modalStyles.button} onPress={() => aceptarPostulado(item)}><Text style={modalStyles.textStyle}>Aceptar</Text></TouchableOpacity>
          <TouchableOpacity style={modalStyles.button} onPress={() => rechazarPostulado(item)}><Text style={modalStyles.textStyle}>Rechazar</Text></TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/*HEADER*/}
      <View style={[styles.seccionEncabezado, stylesBase.seccionEncabezado]}>
        <Text style={[styles.tituloTexto, stylesBase.tituloTexto]}>{ies.siglas}</Text>
      </View>

      {/*LOADING*/}
      {loading ? (
        <View style={styles.centered}><ActivityIndicator size="large" color="#0000ff"/></View>
      ) : (
        <ScrollView>
          <View style={[styles.seccionCuerpo, styles.seccionCuerpoWBorder]}>
            <Text style={styles.subtituloTexto}>{ies.nombre}</Text>
            {/*Buttons*/}
            {[
              { label: 'Llamar Ahora', icon: require('../Componentes/img/contact32.png'), onPress: llamarTelefono },
              { label: 'Enviar WhatsApp', icon: require('../Componentes/img/SMS2-32.png'), onPress: enviarWhatsApp },
              { label: 'Enviar Correo', icon: require('../Componentes/img/Email-send32.png'), onPress: enviarCorreo },
              { label: 'Visitar Sitio', icon: require('../Componentes/img/webpage32.png'), onPress: visitarSitio }
            ].map((btn, idx) => (
              <TouchableOpacity key={idx} style={[styles.botonCuerpo, stylesBase.botonCuerpo]} onPress={btn.onPress}>
                <Image source={btn.icon} style={[styles.botonImg, { height:32, width:32 }]} />
                <Text style={styles.botonTexto}>{btn.label}</Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity style={[styles.botonCuerpo, stylesBase.botonCuerpo]} onPress={vincularAhora}>
              <Icon name="add-circle-outline" size={24} color="#4CAF50"/>
              <Text style={styles.botonTexto}>Vincular Ahora (Solicitudes: {enSolicitudCount})</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.botonCuerpo, stylesBase.botonCuerpo]} onPress={detalleVinculacion}>
              <Text style={styles.botonTexto}>Ver Matches</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}

      {/*Accept/Reject Modal*/}
      <Modal visible={acceptModalVisible} transparent animationType="slide" onRequestClose={handleCancel}>
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Text style={modalStyles.modalText}>Comentarios</Text>
            <TextInput style={modalStyles.textInput} placeholder="Escribe aquí..." value={inputValue} onChangeText={setInputValue}/>
            <View style={modalStyles.buttonContainer}>
              <TouchableOpacity style={modalStyles.button} onPress={handleAccept}><Text style={modalStyles.textStyle}>Aceptar</Text></TouchableOpacity>
              <TouchableOpacity style={modalStyles.button} onPress={handleCancel}><Text style={modalStyles.textStyle}>Cancelar</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/*Matches List Modal*/}
      <Modal visible={modalVisible} transparent animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={modalStyles.centeredView}>
          <View style={modalStyles.modalView}>
            <Text style={modalStyles.modalTitle}>Mis Matches</Text>
            <FlatList data={postuladoData} keyExtractor={(item,i)=>i.toString()} renderItem={renderMatchItem}/>
            <TouchableOpacity style={modalStyles.closeButton} onPress={() => setModalVisible(false)}><Text style={modalStyles.textStyle}>Cerrar</Text></TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* FOOTER*/}
      <View style={[styles.seccionPie, stylesBase.seccionPie]}>
        <TouchableOpacity style={[styles.botonCuerpo, stylesBase.botonCuerpo]} onPress={() => navigation.goBack()}>
          <Icon name="caret-back-circle-outline" size={30} color={stylesBase.icon} />
          <Text style={[styles.botonTexto, stylesBase.botonTexto]}>Regresar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const modalStyles = StyleSheet.create({
  centeredView: { flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0,0,0,0.5)' },
  modalView: { width:'90%', backgroundColor:'white', borderRadius:10, padding:20, alignItems:'center' },
  modalTitle:{ fontSize:18, fontWeight:'bold', marginBottom:10 },
  modalText:{ marginBottom:10, textAlign:'center' },
  textInput:{ width:'100%', borderColor:'#ccc', borderWidth:1, borderRadius:5, padding:10, marginBottom:15 },
  buttonContainer:{ flexDirection:'row', justifyContent:'space-around', width:'100%' },
  button:{ backgroundColor:'#2196F3', borderRadius:5, padding:10, flex:1, margin:5 },
  textStyle:{ color:'white', textAlign:'center' },
  closeButton:{ marginTop:15, backgroundColor:'#2196F3', borderRadius:5, padding:10 },
  itemContainer:{ marginVertical:5, padding:10, borderBottomWidth:1, borderColor:'#ccc' },
  text:{ fontSize:14 }
});

export default InstitucionesDescripcion;
