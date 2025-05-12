import React, { useEffect, useState } from "react";
import { ActivityIndicator, ScrollView, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { vinculateApi } from "../src/api/vinculateAPI";
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../src/styles/app-theme';
import { stylesBase } from "../src/styles/base-colors";


const InstitucionesSeleccion = ({ navigation, route }) => {

    const { usuario, idUsuario, idEmpresa, talento, empresaData } = route.params;

    const [listaIESxTalento, setListaIESxTalento] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        //console.log('talento.idTalento: ' + talento.idTalento);
        //console.log('talento.instituciones: ' + talento.instituciones[0].idInstitucion);

         vinculateApi.post('/buscarInstituRedSocial', 
         {
             idTalento: talento.idTalento,
             idEmpresa: idEmpresa
         })
         .then(function (response) {
             if(response.data.codigo === 1) {
                 setListaIESxTalento(response.data.Instituciones);
                 console.log('Lista instituciones' , response.data.Instituciones);
             } else {
                 Alert.alert('Advertencia Instituciones Selección', response.data.texto);
             }
         })
         .catch(function (error) {
             console.error(error);
         })
         .finally(function () {
             setIsLoading(false);
         });
    }, [talento]);

    const listarIESxTalento = ({ item, index }) => {
        return (
            <TouchableOpacity 
            onPress = { () => {
                navigation.navigate('InstitucionesDescripcion', {
                    usuario: usuario,
                    idUsuario: idUsuario,
                    idEmpresa: idEmpresa,
                    talento: {...talento, idInstitucionTalento: item.idInstitucionTalento}, // Add idInstitucionTalento
                    ies: item,
                    empresaData: empresaData,
                });
            }}
            >
                <View style = {[ styles.flatListItem, stylesBase.flatListItem ]}>
                    <View style = {{ justifyContent: 'center' }}>
                        <Image style = { styles.imgInstitucion } source = {{uri: 'https://cdn-icons-png.flaticon.com/256/1080/1080985.png'}} />
                    </View>
                    <View style = {styles.textContainer} >
                        <Text style = { { color: 'white' } } > { item.siglas }</Text>
                        <Text style = {[styles.flatListItemTitulo, stylesBase.flatListItemTitulo, {color: 'white'}]}> { item.nombre }</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    
    return (
        <SafeAreaView style = { styles.container }>
            <View style = { [styles.seccionEncabezado, stylesBase.seccionEncabezado] } >
                {/* <Image style = { styles.tituloImg } source = {require('../Componentes/img/Qualification-history128.png')} /> */}
                <Text style = { [styles.tituloTexto, stylesBase.tituloTexto ] }>Vinculación</Text>
            </View>
            <View style = {[ styles.seccionCuerpo, styles.seccionCuerpoWBorder ]} >
                <Text style = {[ styles.cuerpoTexto, stylesBase.cuerpoTexto ]}>Selecciona la Institución de Educación Superior que más se adecue a ti.</Text>
                {
                    isLoading?
                        <ActivityIndicator size={'large'}/>
                    :
                        <FlatList
                            data = { listaIESxTalento }
                            keyExtractor = { item => item.idInstitucion }
                            renderItem = { listarIESxTalento }
                        />
                }

            </View>
            <View style = {[ styles.seccionPie, stylesBase.seccionPie ]} >
                <TouchableOpacity
                    style = {  [ styles.botonCuerpo,stylesBase.botonCuerpo, { paddingLeft: 10, paddingRight: 10 } ] }
                    onPress = {() => {
                        navigation.navigate('TalentosSeleccion', {
                            usuario: usuario,
                            idUsuario: idUsuario,
                            idEmpresa: idEmpresa,
                            talento: talento,
                            empresaData: empresaData,
                        });
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="caret-back-circle-outline" size={ 30 } color={stylesBase.icon} />
                        <Text style = {[ styles.botonTexto, stylesBase.botonTexto ]} > Regresar</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

  
export default InstitucionesSeleccion;