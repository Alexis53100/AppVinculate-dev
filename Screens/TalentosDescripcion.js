import React from 'react';
import { Button, Image, SafeAreaView, StyleSheet, Text, ScrollView, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../src/styles/app-theme';
import { stylesBase } from "../src/styles/base-colors";

const TalentosDescripcion = ({ navigation, route }) => {
    
    const { usuario, idUsuario, idEmpresa, talento, empresaData } = route.params;

    return (
        <SafeAreaView style = { styles.container }>
            <View style = { [styles.seccionEncabezado, stylesBase.seccionEncabezado] } >
                {/* <Image style = { styles.tituloImg } source = {require('../Componentes/img/couple128.png')} /> */}
                <Text style = {[ styles.tituloTexto, stylesBase.tituloTexto ]}>{ talento.nombreTalento }</Text>
            </View>
            <ScrollView>
            <View style = {[ styles.seccionCuerpo, stylesBase.seccionCuerpo ]} >
               
                {/* <Text style = { styles.subtituloTexto }>{ talento.nombreTalento }</Text> */}
                <Text style = { styles.subtituloTexto }>¿Cuáles son las funciones del { talento.nombreTalento }?</Text>
                <Text style = { styles.cuerpoTexto }>{ talento.funcionesTalento }</Text>
                <Text style = { styles.cuerpoTexto }>Resultados orientados a:</Text>
                <Text style = { styles.cuerpoTexto }>{ talento.aplicacionTalento }</Text>
                <Text style = { styles.cuerpoTexto }>Lista de Skills que se relacionan:</Text>
                <Text style = { styles.cuerpoTexto }>{ talento.aplicacionTalento }</Text>
            </View>
            </ScrollView>
            <View style = {[ styles.seccionPie, stylesBase.seccionPie ]} >
                <TouchableOpacity
                    style = { [ styles.botonCuerpo,stylesBase.botonCuerpo,  { paddingLeft: 10, paddingRight: 10 } ] }
                    onPress = {() => {
                        navigation.navigate('TalentosSeleccion', {
                            usuario: usuario, 
                            idUsuario: idUsuario, 
                            idEmpresa: idEmpresa,
                            empresaData: empresaData,
                        });
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Icon name="caret-back-circle-outline" size={ 30 } color={stylesBase.icon} />
                        <Text style = {[ styles.botonTexto, stylesBase.botonTexto ]} > Regresar</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style = { [ styles.botonCuerpo,stylesBase.botonCuerpo, { paddingLeft: 10, paddingRight: 10 } ] }
                    onPress = {() => {
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
                        <Icon name="checkbox-outline" size={ 30 } color={stylesBase.icon} />
                        <Text style = {[ styles.botonTexto, stylesBase.botonTexto ]} > ¡Vincular Ahora!</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const stylesX = StyleSheet.create({
    container: {

    },
    
    seccionEncabezado: {
        backgroundColor: '#691B31',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        paddingBottom: 20,
        paddingTop: 20,
    },
    seccionCuerpo: {
        backgroundColor: 'white',
        flex:1,
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
    },
    seccionPie: {
        width:'100%',
        backgroundColor: '#691B31',
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    tituloTexto: {
        color: 'white',
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 0,
        width: 250,
    },
    tituloImg: {
        marginLeft: 60,
    },
    subtituloTexto: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20,
    },
    botonCuerpo: {
        backgroundColor: '#BC955B',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    botonImg: {
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
    },
    botonTexto: {
        color: '#691b31',
        fontSize: 20,
        paddingBottom: 10,
        paddingTop: 10,
        textAlign: 'center',
    },
    cuerpoTexto: {
       
    },
    imgLogoEmpresa: {
        height: 96,
        margin: 10,
        resizeMode: 'stretch',
        width: 96,
    },        
})
  
export default TalentosDescripcion;