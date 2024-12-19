import React, { useState } from "react";
import { vinculateApi } from '../src/api/vinculateAPI';
import { Alert, ActivityIndicator, Image, ImageBackground, SafeAreaView, Text, TextInput, TouchableOpacity, View, Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../src/styles/login-theme';
import { stylesBase } from "../src/styles/base-colors";
import { isVeda } from "../src/store/profile-store";

const LogIn = ({ navigation }) => {

    const veda = global.isVeda;

    const [usuario, setUsuario] = useState('');
    const [contrasenia, setContrasenia] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const verificarUsuarioServ = '/verificarUsuario';

    const images = {
        fondo: require('../Componentes/img/fondo.png'),
        fondo_veda: require('../Componentes/img/fondo_veda.png'),
        logo_seph: require('../Componentes/img/seph.png'),
        logo_seph_veda: require('../Componentes/img/seph_veda.png'),
    };
    const loginBg = images[veda ? 'fondo_veda' : 'fondo'];
    const logo_seph = images[veda ? 'logo_seph_veda' : 'logo_seph'];

    const { width } = Dimensions.get('window');



    const buscarUsuarioApi = () => {

        if (usuario.trim() === '') {
            Alert.alert('No se ha indicado el usuario.');
        } else if (contrasenia.trim() === '') {
            Alert.alert('No se ha indicado la contraseña.')
        } else {

            setIsLoading(true);
            vinculateApi.post(verificarUsuarioServ, {
                user: usuario,
                password: contrasenia
            })
                .then(function (response) {
                    console.log('**** buscar usuario -> response: ');
                    console.log(response.data);
                    console.log('idEstatus:: ' + response.data.empresas[0].idEstatus);
                    if (response.data.codigo === 1) {
                        console.log('**** -> idUsuario: ' + response.data.usuarios.idUsuario);
                        console.log('**** -> idEmpresa: ' + response.data.empresas[0].id_empresa);


                        navigation.navigate('MensajeBienvenida', {
                            usuario: usuario,
                            idUsuario: response.data.usuarios.idUsuario,
                            idEmpresa: response.data.empresas[0].id_empresa,
                            idEstatus: response.data.empresas[0].idEstatus,
                            empresaData: response.data.empresas[0],
                        });
                    }

                    else {
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
        <SafeAreaView style={styles.container}>
            <ImageBackground
                style={{
                    flex: 1,
                    resizeMode: 'cover',
                    justifyContent: 'center',
                }}
                source={loginBg}
            >

                <View style={[styles.horizontalElementTitle, stylesBase.horizontalElementTitle]}>
                    <Image style={styles.imgSEPH} source={logo_seph} resizeMode="contain" />
                </View>


                <Text style={styles.tituloTexto}>Vincúlate</Text>
                <Text style={styles.subtituloTexto}>Ingresar</Text>
                <Image style={styles.imgMujerLaptopAmarilla} source={require('../Componentes/img/6.png')} />
                <Image style={styles.imgHombreCelularAzul} source={require('../Componentes/img/3.png')} />
                <TextInput
                    style={styles.cajasTexto}
                    placeholder='Usuario'
                    onChangeText={texto => setUsuario(texto)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <TextInput
                    style={styles.cajasTexto}
                    placeholder='Contraseña'
                    onChangeText={texto => setContrasenia(texto)}
                    secureTextEntry
                />
                {
                    isLoading ?
                        <ActivityIndicator size={'large'} />
                        :
                        <TouchableOpacity
                            style={[styles.botonCuerpo, stylesBase.botonCuerpo]}
                            onPress={() => { buscarUsuarioApi() }}
                        >

                            <Icon name="enter-outline" size={30} style={stylesBase.icon} />
                            <Text style={[styles.botonTexto, stylesBase.botonTexto]}>Entrar</Text>
                        </TouchableOpacity>

                }

                <Text style={styles.cuerpoTexto}>¿Necesitas una cuenta?</Text>
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('CuentaNueva');
                    }}>
                    <Text style={styles.cuerpoLinks}>Crear una cuenta</Text>
                </TouchableOpacity>
                <View style={styles.horizontalElement}>
                    <Image
                        style={[styles.imgPoweredMS, { width: width }]}
                        source={require('../Componentes/img/logo_intro_unisoft.png')}
                        resizeMode="contain" 
                    />
                </View>
            </ImageBackground>

        </SafeAreaView>
    )
};



export default LogIn;