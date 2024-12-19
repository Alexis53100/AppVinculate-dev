import React, { useState, useEffect } from 'react';
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { vinculateApi } from '../src/api/vinculateAPI';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../src/styles/app-theme';
import { stylesBase } from '../src/styles/base-colors';

const Setting = ({ navigation, route }) => {

    const { usuario, idUsuario, idEmpresa, idEstatus, empresaData } = route.params;

    const [isTextInputVisible, setTextInputVisible] = useState(false);
    const [pass, setPass] = useState('');
    

    useEffect(() => {
        setTextInputVisible(false);
    }, [navigation, route]);

    const handleDeleteAccount = () => {
        Alert.alert(
            "Confirmación",
            "¿Estás seguro de que quieres continuar? Esta acción no se puede deshacer.",
            [
                {
                    text: "Cancelar",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => setTextInputVisible(true) }
            ]
        );
    };

    const deleteAccount = () => {

        vinculateApi.post('/verificarUsuarioEliminarCuenta', 
        {
            user: usuario,
            password:pass
        })
        .then(function (response) {
            console.log('**** empresa validida1 -> response: ');
            console.log(response.data);
            if(response.data.codigo === 1) {
                Alert.alert(response.data.texto);
                navigation.navigate('Login');
            } else if(response.data.codigo === 3) {
                Alert.alert(response.data.texto);
            } else if(response.data.codigo === 2) {
                Alert.alert(response.data.texto);
            }
        })
        .catch(function (error) {
            console.error(error);
        })
        .finally(function () {
            
        });

    }
    const conservar = () => {
        navigation.navigate('TalentosSeleccion', {
            usuario: usuario,
            idUsuario: idUsuario,
            idEmpresa: idEmpresa,
            idEstatus: idEstatus,
            empresaData: empresaData,
        });

    }

    return (
        <SafeAreaView style={styles.container}>

            <View style={[styles.seccionEncabezado, stylesBase.seccionEncabezado, { paddingHorizontal: 10 }]} >
                <Text style={[styles.tituloTexto, stylesBase.tituloTexto, {}]}>Eliminar cuenta</Text>
            </View>
            <View style={[styles.seccionCuerpo, styles.seccionCuerpoWBorder]} >
                <TouchableOpacity
                    style={[styles.botonCuerpo, stylesBase.botonCuerpo, { paddingLeft: 10, paddingRight: 10, marginBottom: 10, marginTop: 10 }]}
                    onPress={handleDeleteAccount}
                >
                    <Icon name="home" size={25} style={{ color: 'red', margin: 5 }} />
                    <Text style={styles.botonTexto} >¡Eliminar mi cuenta!</Text>
                </TouchableOpacity>
                {isTextInputVisible &&
                    <>
                    <Text style = { styles.cuerpoTexto }>Escribe tu contraseña para continuar.</Text>
                        <TextInput
                            style={styles.textBox}
                            placeholder='Contaseña'
                            onChangeText={setPass}
                        />
                        <TouchableOpacity
                            style={[styles.botonCuerpo, stylesBase.botonCuerpoDanger, { paddingLeft: 10, paddingRight: 10, marginBottom: 10, marginTop: 10 }]}
                            onPress={deleteAccount}
                        >
                            
                            <Text style={styles.botonTextoDanger} >¡Eliminar!</Text>
                        </TouchableOpacity>
                    </>

                }

            </View>

        </SafeAreaView>
    );

}

const stylesX = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
    },
    seccionEncabezado: {
        backgroundColor: '#691B31',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20,
        paddingTop: 20,
    },
    seccionCuerpo: {
        backgroundColor: 'white',
        flex: 1,
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
    },
    seccionPie: {
        width: '100%',
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
        color: '#691831',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20,
    },
    botonCuerpo: {
        //backgroundColor: '#BC955B',
        borderWidth: 2,
        borderColor: '#691b31',
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

export default Setting;