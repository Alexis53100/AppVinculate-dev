import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import { DrawerContentScrollView, createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';

// Importa la nueva pantalla
import BolsaTrabajo from "../Screens/BolsaTrabajo";

// Importa tus otras pantallas
import TalentosSeleccion from "../Screens/TalentosSeleccion";
import TalentosDescripcion from "../Screens/TalentosDescripcion";
import InstitucionesSeleccion from "../Screens/InstitucionesSeleccion";
import InstitucionesDescripcion from "../Screens/InstitucionesDescripcion";
import Patrocinadores from "../Screens/Patrocinadores";
import SaludMental from "../Screens/SaludMental";
import MisMatches from "../Screens/MisMatches.js";
import Settings from "../Screens/Settings";
import SkillsUpdate from "../Screens/SkillsUpdate";
import { vinculateApi } from '../src/api/vinculateAPI';

import { styles, styleColors } from '../src/styles/sidebar-theme';

const Drawer = createDrawerNavigator();

export const CoreNavigation = ({navigation, route}) => {
  return (
    <Drawer.Navigator
      initialRouteName="TalentosSeleccion"
      drawerContent={(props)=> <MenuList {...props} extraData={route.params} navigation={navigation} />}
      screenOptions={{
        headerTitle: ''
      }}
    >
      <Drawer.Screen name="TalentosSeleccion" options={{headerTitle: ''}}>
        {props => <TalentosSeleccion {...props} extraData={route.params} navigation={navigation} />}
      </Drawer.Screen>
      <Drawer.Screen name="MisMatches" component={MisMatches} />
      <Drawer.Screen name="TalentosDescripcion" component={TalentosDescripcion} />
      <Drawer.Screen name="InstitucionesSeleccion" component={InstitucionesSeleccion} />
      <Drawer.Screen name="InstitucionesDescripcion" component={InstitucionesDescripcion} />
      <Drawer.Screen name="Patrocinadores" component={Patrocinadores} />
      <Drawer.Screen name="SaludMental" component={SaludMental} />
      <Drawer.Screen name="SkillsUpdate" component={SkillsUpdate} />
      <Drawer.Screen name="Settings" component={Settings} />

      {/* Aquí agregamos la nueva ruta para Bolsa de Trabajo */}
      <Drawer.Screen name="BolsaTrabajo" component={BolsaTrabajo} />
    </Drawer.Navigator>
  );
}

const MenuList = ({navigation, extraData }) => {
  const { usuario, idUsuario, idEmpresa, empresaData } = extraData;
  const { responsable } = empresaData;

  // Estados para el modal de Quejas y Sugerencias
  const [modalVisible, setModalVisible] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [loading, setLoading] = useState(false);  // Estado para el spinner

  const enviarQueja = () => {
    if (mensaje.trim() === '') {
      Alert.alert('Advertencia', 'El mensaje no puede estar vacío.');
      return;
    }

    setLoading(true);  // Mostrar el spinner al empezar

    const formData = new FormData();
    formData.append('mensaje', mensaje);

    vinculateApi.post('/enviaCorreo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then(response => {
      setLoading(false);  // Ocultar el spinner
      if (response.data.codigo === "1") {
        Alert.alert('Éxito', response.data.data);
        setModalVisible(false);  // Ocultar el modal
        setMensaje('');  // Limpiar el campo de texto
      } else {
        Alert.alert('Error', 'No se pudo enviar el correo');
      }
    })
    .catch(error => {
      setLoading(false);  // Ocultar el spinner en caso de error
      console.error('Error enviando la queja:', error);
      Alert.alert('Error', 'Hubo un problema al enviar el correo');
    });
  };

  return (
    <View style={styles.menuContainer}>
      <DrawerContentScrollView>
        <Text style={[styles.tituloTexto, styleColors.tituloTexto]}>
          Bienvenido { responsable.split(' ')[0] }
        </Text>

        <TouchableOpacity 
          style={{...styles.menuBoton, flexDirection:'row' }}
          onPress={() => {
            navigation.navigate('TalentosSeleccion', {
              usuario: usuario,
              idUsuario: idUsuario,
              idEmpresa: idEmpresa,
              empresaData: empresaData,
            });
          }}
        >
          <Icon name="home-outline" size={25} />
          <Text style={[styles.menuTexto, styleColors.menuTexto]}> Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{...styles.menuBoton, flexDirection:'row' }}
          onPress={() => {
            navigation.navigate('SaludMental', {
              usuario: usuario,
              idUsuario: idUsuario,
              idEmpresa: idEmpresa,
              empresaData: empresaData,
            });
          }}
        >
          <Icon name="heart-circle-outline" size={25} />
          <Text style={styles.menuTexto}> Salud Mental</Text>
        </TouchableOpacity>

        {/* Aquí agregamos la nueva opción del menú: Bolsa de Trabajo */}
        <TouchableOpacity
          style={{...styles.menuBoton, flexDirection:'row' }}
          onPress={() => {
            navigation.navigate('BolsaTrabajo', {
              usuario: usuario,
              idUsuario: idUsuario,
              idEmpresa: idEmpresa,
              empresaData: empresaData,
            });
          }}
        >
          <Icon name="briefcase-outline" size={25} />
          <Text style={styles.menuTexto}> Bolsa de Trabajo</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{...styles.menuBoton, flexDirection:'row' }}
          onPress={() => navigation.navigate('Patrocinadores')}
        >
          <Icon name="medal-outline" size={25} />
          <Text style={styles.menuTexto}> Patrocinadores</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{...styles.menuBoton, flexDirection:'row' }}
          onPress={() => {
            navigation.navigate('SkillsUpdate', {
              usuario: usuario,
              idUsuario: idUsuario,
              idEmpresa: idEmpresa,
              empresaData: empresaData,
            });
          }}
        >
          <Icon name="people-outline" size={25} />
          <Text style={styles.menuTexto}> Editar Skills</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={{...styles.menuBoton, flexDirection:'row' }}
          onPress={() => {
            navigation.navigate('MisMatches', {
              idEmpresa: idEmpresa,
            });
          }}
        >
          <Icon name="list-outline" size={25} />
          <Text style={styles.menuTexto}> Ver mis Matches</Text>
        </TouchableOpacity>

        {/* Botón Quejas y Sugerencias */}
        <TouchableOpacity
          style={{...styles.menuBoton, flexDirection:'row' }}
          onPress={() => setModalVisible(true)}  // Muestra el modal al presionar
        >
          <Icon name="chatbox-ellipses-outline" size={25} />
          <Text style={styles.menuTexto}> Quejas y Sugerencias</Text>
        </TouchableOpacity>

        {/* Modal para quejas y sugerencias */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={modalStyles.centeredView}>
            <View style={modalStyles.modalView}>
              <Text style={styles.tituloTexto}>Escriba su queja o sugerencia</Text>

              {loading && <ActivityIndicator size="large" color="#000000" />}

              <TextInput
                style={modalStyles.textInput}
                placeholder="Escriba su mensaje aquí..."
                multiline
                numberOfLines={4}
                maxLength={1000}
                onChangeText={text => setMensaje(text)}
                value={mensaje}
                editable={!loading}
              />

              <View style={modalStyles.buttonContainer}>
                <TouchableOpacity 
                  style={styles.botonCuerpo}
                  onPress={enviarQueja}
                  disabled={loading}
                >
                  <Text style={styles.botonTexto}>Enviar</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.botonCuerpo}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.botonTexto}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <TouchableOpacity 
          style={{...styles.menuBoton, flexDirection:'row'}}
          onPress={() => navigation.navigate('Settings', {
            usuario: usuario,
            idUsuario: idUsuario,
            idEmpresa: idEmpresa,
            empresaData: empresaData,
          })}
        >
          <Icon name="remove-circle-outline" size={25} color='red'/>
          <Text style={{...styles.menuTexto, color: 'red'}}> Eliminar cuenta</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>

      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={{...styles.logoutButton, flexDirection:'row' }}
          onPress={() => {
            navigation.navigate('Login');
          }}
        >
          <Icon name="log-out-outline" size={25} />
          <Text style={[ styles.logoutTexto, styleColors.logoutTexto ]}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const modalStyles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textInput: {
    width: '100%',
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    width: '100%',
  },
  botonCuerpo: {
    backgroundColor: '#D8D8D8',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    width: '45%',
  },
  botonTexto: {
    color: '#000000',
    fontWeight: 'bold',
  },
});
