import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../src/styles/app-theme';
import { stylesBase } from '../src/styles/base-colors';
import Icon from 'react-native-vector-icons/Ionicons';

const CuentaRegistro = ({ navigation, route }) => {

    const { idUsuario, idEmpresa, usuario } = route.params;

    return (
        <SafeAreaView style = { styles.container }>
            <View style = {[ styles.seccionEncabezado, stylesBase.seccionEncabezado, {paddingHorizontal:10} ]} >
            <Image style = { styles.imgInstitucion } source = {require('../Componentes/img/factory128.png')} />
            <Text style = {[ styles.tituloTexto, stylesBase.tituloTexto, {  } ]}>Registro de Empresa</Text>
            </View>
            <View style = {[ styles.seccionCuerpo, styles.seccionCuerpoWBorder ]} >
                <View style = { { alignItems: 'center' } } >
                    <Image style = { { height: 96, resizeMode: 'stretch', width: 96, marginTop:25 } } source = {require('../Componentes/img/semi-success128.png')} />
                </View>
                <Text style = { styles.subtituloTexto }>Folio {idEmpresa}</Text>
                <Text style = { styles.cuerpoTexto }>¡En proceso de validación!</Text>
                <Text style = { styles.cuerpoTexto }>Nuestro equipo se pondrá en contacto contigo en la brevedad posible.</Text>
                <Text style = { styles.cuerpoTexto }>Nuestra ventana de atención es menor a 24 hrs para iniciar el proceso.</Text>
                <Text style = { styles.cuerpoTexto }>¡Gracias por tu espera!</Text>
            </View>
            <View style = {[ styles.seccionPie, stylesBase.seccionPie,{justifyContent: 'center'} ]} >
                <TouchableOpacity
                    style = { [ styles.botonCuerpo, stylesBase.botonCuerpo, { paddingLeft: 10, paddingRight: 10} ] }
                    title="Acceder" 
                    onPress={() => {
                        navigation.navigate('Login');
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style = { styles.botonImg } source = {require('../Componentes/img/Accept32.png')} />
                        <Text style = { styles.botonTexto } >Continuar</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const stylesx = StyleSheet.create({
    container: {
        backgroundColor: '#f0f0f0',
        flex: 1,
    },
    seccionEncabezado: {
        backgroundColor: '#691B31',
        position:'absolute',
        flexDirection: 'row',
        width:'100%',
    },
    seccionCuerpo: {
        flex: 1, 
        backgroundColor: '#f0f0f0',
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 100,
        marginTop:'35%',
    },
    seccionPie: {
        position:'absolute', 
        bottom: 0,
        width:'100%',
        backgroundColor: '#691B31',
        paddingBottom: 30,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 30,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    tituloTexto: {
        color: 'white',
        textAlign: 'left',
        fontSize: 40,
        fontWeight: 'bold',
        marginTop: 20,
        width: 250,
    },
    tituloImg: {
        marginLeft: 30,
    },
    subtituloTexto: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20,
    },
    botonCuerpo: {
        backgroundColor: '#BC955B',
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
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
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 10,
    },
})
  
export default CuentaRegistro;