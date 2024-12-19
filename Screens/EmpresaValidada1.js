import React, { useState } from 'react';
import { Alert, Button, KeyboardAvoidingView, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { vinculateApi } from '../src/api/vinculateAPI';
import DropdownEstadosComponent from '../Componentes/dropdownList'
import { styles } from '../src/styles/app-theme';
import { stylesBase } from '../src/styles/base-colors';
import Icon from 'react-native-vector-icons/Ionicons';

const EmpresaValidada1 = ({ navigation, route }) => {

    const { usuario, idUsuario, idEmpresa, empresaData } = route.params;

    const [isLoading, setIsLoading] = useState(false);
    const [giro, setGiro] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [logo, setLogo] = useState('');
    const [calle, setCalle] = useState('');
    const [numero, setnNumero] = useState('');
    const [colonia, setColonia] = useState('');
    const [codigoPostal, setCodigoPostal] = useState('');
    const [municipio, setMunicipio] = useState('');
    const [estado, setEstado] = useState('');

    const handleMunicipio = (municipio)=>setMunicipio(municipio);
    const handleEstado = (estado)=>setEstado(estado);




    
    const actualizarEmpresa = () => {
        setLogo('Prueba');
        if(
            descripcion.trim() === '' || 
            calle.trim() === '' || 
            numero.trim() === '' || 
            codigoPostal.trim() === '' ||
            municipio.trim() === '' ||
            estado.trim() === ''
        ) {
            Alert.alert('Falta un dato por asignar');
        } else {
            vinculateApi.post('/actualizarEmpresa', 
                {
                    giro: giro, 
                    descripcion: descripcion, 
                    logo: logo, 
                    idEmpresa: idEmpresa, 
                    calle: calle, 
                    numero: numero, 
                    codigoPostal: codigoPostal, 
                    municipio: municipio, 
                    estado: estado
                })
                .then(function (response) {
                    console.log('**** empresa validida1 -> response: ');
                    console.log(response.data);
                    if(response.data.codigo === 1) {
                        navigation.navigate('EmpresaValidada2', {
                            usuario: usuario,
                            idUsuario: idUsuario,
                            idEmpresa: idEmpresa,
                            empresaData: empresaData,
                        });
                    } else {
                        Alert.alert(response.data.texto);
                    }
                })
                .catch(function (error) {
                    console.error(error);
                })
                .finally(function () {
                    setIsLoading(false);
                });
        }
    }

    return (
        <SafeAreaView style = { styles.container }>
            <View style = {[ styles.seccionEncabezado, stylesBase.seccionEncabezado, {paddingHorizontal:10} ]} >
                <Image style = { styles.imgInstitucion } source = {{ uri: 'https://cdn-icons-png.flaticon.com/512/2761/2761008.png' }} />
                <Text style = {[ styles.tituloTexto, stylesBase.tituloTexto, {  } ]}>Registro de Empresa</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style = {[styles.seccionCuerpo, styles.seccionCuerpoWBorder] } >
                    <Text style = { styles.buttonLabel }>Selecciona la rama de la empresa</Text>
                    <Picker
                        style = { styles.cuerpoPicker }
                        itemStyle = { styles.cuerpoPickerItem }
                        selectedValue = {giro}
                        onValueChange = {(itemValue, itemIndex) => setGiro(itemValue)}
                        >
                        <Picker.Item label = 'Industrial (Agropecuaria)' value = 'Industrial (Agropecuaria)' />
                        <Picker.Item label = 'Industrial (Manufacturera)' value = 'Industrial (Manufacturera)' />
                        <Picker.Item label = 'Industrial (Extractiva)' value = 'Industrial (Extractiva)' />
                        <Picker.Item label = 'Servicios' value = 'Servicios' />
                        <Picker.Item label = 'Comercial (Mayorista)' value = 'Comercial (Mayorista)' />
                        <Picker.Item label = 'Comercial (Minorista)' value = 'Comercial (Minorista)' />
                        <Picker.Item label = 'Comercial (Comisionista)' value = 'Comercial (Comisionista)' />
                    </Picker>
                    <TextInput 
                    style = { styles.textBox }
                    multiline
                    numberOfLines={4}
                    placeholder='Agrega una pequeña descripción de lo que hace tu empresa.'
                    onChangeText={texto => setDescripcion(texto)}
                    />
                        <Text style = { styles.buttonLabel }>Dirección fiscal de la empresa</Text>
                        <TextInput 
                                    style = { styles.textBox }
                                    placeholder='Calle'
                                    onChangeText={texto => setCalle(texto)}
                                    />
                                <TextInput  
                                    style = { styles.textBox }
                                    placeholder='Número'
                                    onChangeText={texto => setnNumero(texto)}
                                    />
                                <TextInput 
                                    style = { styles.textBox }
                                    placeholder='Colonia'
                                    onChangeText={texto => setColonia(texto)}
                                    />
                                <TextInput 
                                    style = { styles.textBox }
                                    placeholder='Código Postal'
                                    keyboardType="numeric"
                                    maxLength={5}
                                    onChangeText={texto => setCodigoPostal(texto)}
                                    />
                                <DropdownEstadosComponent onEstadoSelect={handleEstado} onMunicipioSelect={handleMunicipio} />
                </View>
            </ScrollView>
                <View style = {[ styles.seccionPie, stylesBase.seccionPie, { marginTop:15, paddingTop:10, justifyContent: 'center'} ]} >
                            <TouchableOpacity
                                style = { [ styles.botonCuerpo, stylesBase.botonCuerpo, { paddingLeft: 10, paddingRight: 10 } ] }
                                onPress={() => { actualizarEmpresa() }}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style = { styles.botonTexto } > Actualizar </Text>
                                        <Icon name="caret-forward-circle-outline" size={ 30 } color={stylesBase.icon} />
                                    </View>
                            </TouchableOpacity>
                        </View>
        </SafeAreaView>
    );
}

export default EmpresaValidada1;