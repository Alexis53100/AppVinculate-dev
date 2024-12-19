import React from 'react';
import { Button,FlatList, Image, Linking, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../src/styles/app-theme';
import { stylesBase } from "../src/styles/base-colors";


const Patrocinadores = ({ navigation, route }) => {

    // { id: '1', patrocinador:'Patrocinador 1', backgroundColor: '#FFF', image: 'https://cdn-icons-png.flaticon.com/512/2761/2761008.png'},
    const data = [
        { id: '0', patrocinador:'', backgroundColor: '#FFF', image:require('../Componentes/img/sponsors/coparmexHdg.png')},
        { id: '1', patrocinador:'', backgroundColor: '#FFF', image:require('../Componentes/img/sponsors/cmic.png')},
        { id: '2', patrocinador:'', backgroundColor: '#FFF', image:require('../Componentes/img/sponsors/canadevi.png')},
        { id: '3', patrocinador:'', backgroundColor: '#FFF', image:require('../Componentes/img/sponsors/canacintra.png')},
        { id: '4', patrocinador:'', backgroundColor: '#FFF', image:require('../Componentes/img/sponsors/amexme.png')},
        { id: '5', patrocinador:'', backgroundColor: '#FFF', image:require('../Componentes/img/sponsors/canacintra-pachuca.png')},
        { id: '6', patrocinador:'', backgroundColor: '#FFF', image:require('../Componentes/img/sponsors/camaraNacionalDeComercio.png')},
        { id: '7', patrocinador:'', backgroundColor: '#FFF', image:require('../Componentes/img/sponsors/arizaac.png')},
        { id: '8', patrocinador:'', backgroundColor: '#FFF', image:require('../Componentes/img/sponsors/canaco.png')},
        { id: '9', patrocinador:'', backgroundColor: '#FFF', image:require('../Componentes/img/sponsors/amda.png')},
        { id: '10', patrocinador:'', backgroundColor: '#FFF', image:require('../Componentes/img/sponsors/cnipmt.png')},
        { id: '11', patrocinador:'', backgroundColor: '#FFF', image:require('../Componentes/img/sponsors/ceah.png')},
        { id: '12', patrocinador:'', backgroundColor: '#FFF', image:require('../Componentes/img/sponsors/amhm.png')},
        { id: '13', patrocinador:'', backgroundColor: '#FFF', image:require('../Componentes/img/sponsors/amav.png')},
        { id: '14', patrocinador:'', backgroundColor: '#FFF', image:require('../Componentes/img/sponsors/canacope.png')},
        { id: '15', patrocinador:'', backgroundColor: '#FFF', image:require('../Componentes/img/sponsors/conafab.png')},
        { id: '16', patrocinador:'', backgroundColor: '#FFF', image:require('../Componentes/img/sponsors/ammje.png')},
        { id: '17', patrocinador:'', backgroundColor: '#FFF', image:require('../Componentes/img/sponsors/industrialesSahagun.png')},
        { id: '18', patrocinador:'', backgroundColor: '#FFF', image:require('../Componentes/img/sponsors/camaraNacionalDeLaIndustria.png')},
        { id: '19', patrocinador:'', backgroundColor: '#FFF', image:require('../Componentes/img/sponsors/hospitalesPrivados.png')},
        { id: '20', patrocinador:'', backgroundColor: '#FFF', image:require('../Componentes/img/sponsors/canirac.png')},
        //{ id: '21', patrocinador:'', backgroundColor: '#FFF', image:require('../Componentes/img/sponsors/mustache_fundacion_sft.jpeg')},
        { id: '21', patrocinador:'', backgroundColor: '#FFF', image:require('../Componentes/img/sponsors/amisoft.jpeg')},

      ];

      const renderItem = ({ item }) => {
        
        return (

            <View style = { [ stylesPatrocinadoresCard.container ,{ backgroundColor:item.backgroundColor}]} >
                <TouchableOpacity
                style={ [stylesPatrocinadoresCard.buttonBig,{ backgroundColor:item.backgroundColor} ]}
                onPress={() => { }}
                >
                {/* <Image style = { stylesPatrocinadoresCard.botonImg } source = {{ uri: item.image }} /> */}
                <Image style = { stylesPatrocinadoresCard.botonImg } source = {item.image } resizeMode="contain" />
                </TouchableOpacity>
                {/* <Text  style={ stylesPatrocinadoresCard.description }>{item.patrocinador}</Text> */}
            </View>

        );
    }

    return (
        <SafeAreaView style = { styles.container }>

            <View style = {[ styles.seccionEncabezado, stylesBase.seccionEncabezado ]} >
                {/* <Image style = { styles.tituloImg } source = {require('../Componentes/img/factory128-val.png')} /> */}
                <Text style = {[ styles.tituloTexto, stylesBase.tituloTexto ]}>Patrocinadores </Text>
            </View>
            <View style = {[styles.seccionCuerpo, styles.seccionCuerpoWBorder, {backgroundColor: 'white'} ]} >

                <Text style = { styles.subtituloTexto } > ¡Gracias por su apoyo! </Text>


                <FlatList
                    data={data}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                />
            </View>
           

        </SafeAreaView>

    )

}

const stylesPatrocinadoresCard = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent: 'center',
        marginBottom:10,

    },

    buttonBig: {
        width: 260,
        height: 260,
        alignItems:'center',
        marginVertical: 10,
        marginHorizontal: 5,
        borderWidth: .5, 
        borderColor: 'gray', 
        borderRadius: 5, 
        padding: 10, 
        shadowColor: 'gray', 
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5, 
        shadowRadius: 2,
        elevation: 2, 
        backgroundColor:'red'
    },

    botonImg: {
        width:240,
        height:240,
    },

    description: {
        textAlign:'center',
        color:'#000',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20,
    },

});

const stylesX = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
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
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 10,
    },
    tituloImg: {
        marginLeft: 30,
    },
    subtituloTexto: {
        textAlign: 'center',
        color:'#691831',
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
        fontSize: 15,
        paddingBottom: 10,
        paddingTop: 10,
        textAlign: 'center',
    },
    cuerpoTexto: {
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 10,
    },
    imgLogoEmpresa: {
        height: 96,
        margin: 10,
        resizeMode: 'stretch',
        width: 96,
    },


});

export default Patrocinadores;