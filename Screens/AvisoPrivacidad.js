import React from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const AvisoPrivacidad = ({ navigation, route }) => {
    
    const { razonSoci, rfc, telefono } = route.params;

    return (
        <SafeAreaView style = { styles.container }>
            <View style = { styles.seccionEncabezado } >
                <Image style = { styles.tituloImg } source = {require('../Componentes/img/factory128.png')} />
                <Text style = { styles.tituloTexto }>Aviso de Privacidad</Text>
            </View>
            <View style = { styles.seccionCuerpo } >
                <Text style = { styles.cuerpoTexto }>Documento PDF</Text>
            </View>
            <View style = { styles.seccionPie } >
                <TouchableOpacity
                    style = { [ styles.botonCuerpo, { paddingLeft: 10, paddingRight: 10 } ] }
                    onPress={() => {
                        navigation.navigate('CuentaNueva2', {
                            razonSoci: razonSoci,
                            rfc: rfc,
                            telefono: telefono
                        });
                    }}
                >
                    <Image style = { styles.botonImg } source = {require('../Componentes/img/back32.png')} />
                    <Text style = { styles.botonTexto } >Regresar</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f0f0',
        flex: 1,
        justifyContent: 'center',
    },
    seccionEncabezado: {
        backgroundColor: '#691B31',
        flexDirection: 'row',
        paddingBottom: 30,
        paddingLeft: 10,
        paddingLeft: 10,
        paddingTop: 30,
    },
    seccionCuerpo: {
        backgroundColor: 'white',
        paddingBottom: 240,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 240,
    },
    seccionPie: {
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
        marginBottom: 20,
        marginTop: 10,
    },
    cajasTexto: {
        borderColor: '#ccc',
        borderWidth: 2,
        marginBottom: 10,
        marginTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
    },
    cuerpoLinks: {
        textAlign: 'center',
        textDecorationLine: "underline",
    },
})
  
export default AvisoPrivacidad;