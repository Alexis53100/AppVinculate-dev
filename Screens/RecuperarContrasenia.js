import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, StyleSheet, SafeAreaView, Image } from 'react-native';
import { vinculateApi } from '../src/api/vinculateAPI';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../src/styles/app-theme';
import { stylesBase } from '../src/styles/base-colors';

const RecuperarContrasenia = ({ navigation }) => {
  const [correo, setCorreo] = useState('');
  const [loading, setLoading] = useState(false);

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  const recuperarContrasenia = () => {
    if (correo.trim() === '') {
      Alert.alert('Campo vacío', 'Por favor, ingresa tu correo electrónico.');
      return;
    }

    if (!emailRegex.test(correo)) {
      Alert.alert('Formato inválido', 'El correo ingresado no tiene un formato válido.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('correo', correo);

    vinculateApi.post('/recuperapw', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'X-API-KEY': 'V23IIUV1',
      },
    })
      .then((response) => {
        const { codigo, texto } = response.data;
        if (codigo === 1) {
          Alert.alert('Éxito', texto);
          navigation.goBack();
        } else {
          Alert.alert('Error', texto || 'No se pudo enviar la contraseña.');
        }
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Error', 'Hubo un problema al enviar la contraseña.');
      })
      .finally(() => setLoading(false));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Encabezado */}
      <View style={[styles.seccionEncabezado, stylesBase.seccionEncabezado]}>
     
        <Text style={[styles.tituloTexto, stylesBase.tituloTexto]}>Recuperar Contraseña</Text>
      </View>

      {/* Cuerpo */}
      <View style={[styles.seccionCuerpo, styles.seccionCuerpoWBorder]}>
        <Text style={styles.cuerpoTexto}>Ingresa tu correo electrónico para recuperar tu contraseña.</Text>
        <TextInput
          style={styles.textBox}
          placeholder="Correo electrónico"
          keyboardType="email-address"
          autoCapitalize="none"
          value={correo}
          onChangeText={setCorreo}
        />
        {loading && <ActivityIndicator size="large" color="#000" />}
      </View>

      {/* Pie */}
      <View style={[styles.seccionPie, stylesBase.seccionPie]}>
        <TouchableOpacity
          style={[styles.botonCuerpo, stylesBase.botonCuerpo, { paddingLeft: 10, paddingRight: 10 }]}
          onPress={() => navigation.goBack()}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Icon name="caret-back-circle-outline" size={30} color={stylesBase.icon} />
            <Text style={[styles.botonTexto, stylesBase.botonTexto]}> Cancelar</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.botonCuerpo, stylesBase.botonCuerpo, { paddingLeft: 10, paddingRight: 10 }]}
          onPress={recuperarContrasenia}
          disabled={loading}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[styles.botonTexto, stylesBase.botonTexto]}> Enviar </Text>
            <Icon name="mail-unread-outline" size={30} color={stylesBase.icon} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RecuperarContrasenia;
