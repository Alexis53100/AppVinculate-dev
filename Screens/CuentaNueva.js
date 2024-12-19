import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert, ScrollView, Image,Linking, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, PixelRatio, Platform } from 'react-native';
import { vinculateApi } from '../src/api/vinculateAPI';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../src/styles/app-theme';
import { stylesBase } from '../src/styles/base-colors';
import DocumentPicker from 'react-native-document-picker';

import { Dropdown } from 'react-native-element-dropdown'; 

const CuentaNueva = ({ navigation, route }) => {

    //const { razonSoci, rfc, telefono, selectedFile } = route.params;
    const [razonSoci, setRazonSoci] = useState('');
    const [rfc, setRFC] = useState('');
    const [telefono, setTelefono] = useState('');
    const [responsable, setResponsable] = useState('');
    const [email, setEmail] = useState('');
    const [contrasenia1, setContrasenia1] = useState('');
    const [contrasenia2, setContrasenia2] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const [consejos, setConsejos] = useState([]);
    const [selectedConsejo, setSelectedConsejo] = useState('');

    const fontSizeTitle = 40 * PixelRatio.getFontScale();
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    const getConsejos = async () => {
        try {
            const response = await vinculateApi.post('/getConsejos');
            if (response.data.codigo === 1) {
                const consejosOptions = response.data.consejos.map(consejo => ({
                    label: consejo.nombreConsejo,
                    value: consejo.idConsejo
                }));

                consejosOptions.unshift({ label: 'No', value: '0' });

                setConsejos(consejosOptions);
            }
        } catch (error) {
            console.error('Error fetching consejos:', error);
        }
    };

    useEffect(() => {
        getConsejos();
    }, []);
    
    const handlePressAviso = () => {

        const url = 'https://vinculate.itesa.edu.mx/admin/avisoDePrivacidad.php';
        Linking.openURL(url);
    };

    const handleInputRFCChange = (text) => {
        setRFC(text.toUpperCase()); 
    };

    const handleFilePick = async () => {
        try {
          const result = await DocumentPicker.pick({
            type: [DocumentPicker.types.pdf],
          });
          setSelectedFile(result[0]);
        } catch (error) {
          if (DocumentPicker.isCancel(error)) {
            
          } else {

            console.error('Error al seleccionar el archivo:', error);
          }
        }
      };


    function validarRFC(rfc) {
        const rfcRegex = /^([A-ZÑ&]{3,4})\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])[A-Z\d]{3}$/;
        console.log(rfcRegex.test(rfc));
        return rfcRegex.test(rfc);
    }
    


    const registrarCuenta = () => {

        

        if(razonSoci.trim() == '') {
            Alert.alert('Advertencia', 'No se ha dado la razón social.');
        } else if(rfc.trim() == '' || !validarRFC(rfc)) {
            Alert.alert('Advertencia', 'El RFC no cumple con los requisitos.');
        } else if(telefono.trim() == '' || telefono.length!==10) {
            Alert.alert('Advertencia', 'El teléfono no cumple con los requisitos.');
        } else if(responsable.trim() == '') {
            Alert.alert('Advertencia', 'El responsable está vacío.');
        } else if(email.trim() == '' || emailRegex.test(email) ===false) {
            Alert.alert('Advertencia', 'El correo electrónco no es valido.');
        } else if(contrasenia1.trim() == '') {
            Alert.alert('Advertencia', 'La contraseña está vacía.');
        } else if(contrasenia2.trim() == '') {
            Alert.alert('Advertencia', 'La confirmación de contraseña está vacía.');
        } else if(contrasenia1 !== contrasenia2) {
            Alert.alert('Advertencia', 'Las contraseñas no son iguales, favor de verificar.');
            
        } else if(selectedFile == null) {
            Alert.alert('Advertencia', 'Debe de seleccionar archivo CIP.');
        } else if(selectedConsejo === '') {
            Alert.alert('Advertencia', 'Debe de seleccionar si pertenece a un consejo.');
        }
        
        else {
           
            const formData = new FormData();
            formData.append('responsable', responsable);
            formData.append('pass', contrasenia1);
            formData.append('correo', email);
            formData.append('razonS', razonSoci);
            formData.append('RFC', rfc);
            formData.append('correo', email);
            formData.append('telefono', telefono);
            formData.append('convenio', '1');
            formData.append('file', selectedFile);

            formData.append('consejo', selectedConsejo);

            // const queryParams = {
            //    rfcDoc: 'doc',
            //    responsable: responsable,
            //    pass: contrasenia1,
            // RFC: rfc,
            //   correo: email,
            //   razonS: razonSoci,
            //  telefono: telefono
            // };
            vinculateApi.post('/registrarUsuarioEmpresa', formData,
                {
                  // params: queryParams,
                   headers: {
                    'Content-Type': 'multipart/form-data'
                   }
                })
                .then(function (response) {
                    console.log('**** -> API (registrarUsuarioEmpresa) => ');
                    console.log(response.data)
                    if(response.data.codigo === 1) {
                        navigation.navigate('CuentaRegistro', {
                            idUsuario: response.data.idUsuario,
                            idEmpresa: response.data.idEmpresa,
                            usuario: email
                        });
                    } else {
                        //console.error('***** error al regitrar empresa => ');
                        if(response.data.hasOwnProperty('texto')) {
                            Alert.alert(response.data.texto);
                        } else if(response.data.hasOwnProperty('idUsuario')) {
                            Alert.alert(response.data.idUsuario);
                        } else {
                            Alert.alert('Error desconocido.');
                        }
                    }
                })
                .catch(function (error) {
                    Alert.alert('Error desconocido.');
                    //console.error('***** error al regitrar empresa => '. error)
                })
                .finally(function () {
                    
                });
        }
    }

    return (
        <SafeAreaView style = { styles.container }>
            <View style = {[ styles.seccionEncabezado, stylesBase.seccionEncabezado, {paddingHorizontal:10} ]} >
                <Image style = { styles.imgInstitucion } source = {require('../Componentes/img/factory128.png')} />
                <Text style = {[ styles.tituloTexto, stylesBase.tituloTexto, {  } ]}>Registro de Empresa</Text>
            </View>
            <ScrollView >
            <View style = {[styles.seccionCuerpo, styles.seccionCuerpoWBorder] } >

                <Text style = { styles.cuerpoTexto }>Inicia tu registro en línea. ¡Vamos por ello!</Text>
                        <TextInput 
                            style = { styles.textBox }
                            placeholder='Razón Social'
                            onChangeText={texto => setRazonSoci(texto)}
                        />
                        <TextInput 
                            style = { styles.textBox }
                            placeholder='RFC de empresa'
                            onChangeText={handleInputRFCChange}
                        />
                        <TextInput 
                            style = { styles.textBox }
                            placeholder='Responsable'
                            onChangeText={texto => setResponsable(texto)}
                            />
                        
                        <TextInput 
                            style = { styles.textBox }
                            placeholder='Teléfono 10 digitos'
                            onChangeText={texto => setTelefono(texto)}
                            maxLength={10}
                            keyboardType='numeric'
                        />
              
                <TextInput 
                    style = { styles.textBox }
                    placeholder='Correo Electrónico'
                    onChangeText={texto => setEmail(texto)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    />
                <TextInput 
                    style = { styles.textBox }
                    placeholder='Contraseña'
                    onChangeText={texto => setContrasenia1(texto)}
                    secureTextEntry
                    />
                <TextInput 
                    style = { styles.textBox }
                    placeholder='Confirmar Contraseña'
                    onChangeText={texto => setContrasenia2(texto)}
                    secureTextEntry
                    />

                <Dropdown
                    style={[styles.textBox, customDropdownStyle]}  // Aplica estilos similares
                    data={consejos}
                    labelField="label"
                    valueField="value"
                    placeholder="¿Eres miembro de algún consejo/organización?"
                    value={selectedConsejo}
                    onChange={item => setSelectedConsejo(item.value)}
                    />
                
                <TouchableOpacity
                            style = { [ styles.botonCuerpo, stylesBase.botonCuerpo, { marginTop: 20, marginBottom:20 } ] }
                            onPress={handleFilePick}
                        >
                            <Image style = { styles.botonImg } source = {require('../Componentes/img/PDF32.png')} />
                            <Text style = { styles.botonTexto }>Subir CIF del RFC</Text>
                </TouchableOpacity>


                <Text style = { styles.cuerpoTexto }>¡Estás a un paso de iniciar tu proceso de validación!</Text>
                <TouchableOpacity
                    onPress = {handlePressAviso}>
                    <Text style = { styles.cuerpoLinks }>No olvides leer nuestro aviso de privacidad.</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
            <View style = {[ styles.seccionPie, stylesBase.seccionPie ]} >
            <TouchableOpacity
                    style = { [ styles.botonCuerpo, stylesBase.botonCuerpo, { paddingLeft: 10, paddingRight: 10 } ] }
                    onPress={() => {
                        navigation.navigate('Login');
                    }}
                    >
             
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="caret-back-circle-outline" size={ 30 } color={stylesBase.icon} />
                            <Text style = {[ styles.botonTexto, stylesBase.botonTexto ]} > Cancelar</Text>
                        </View>
                    </TouchableOpacity>
                <TouchableOpacity
                    style = { [ styles.botonCuerpo, stylesBase.botonCuerpo, { paddingLeft: 10, paddingRight: 10 } ] }
                    onPress={() => {
                        registrarCuenta()
                    }}
                >


                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style = {[ styles.botonTexto, stylesBase.botonTexto ]} > Registrar </Text>
                            <Icon name="caret-forward-circle-outline" size={ 30 } color={stylesBase.icon} />
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const customDropdownStyle = {
    borderWidth: 2,
    borderColor: '#ccc',  // Color del borde similar a TextInput
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderRadius: 0,      // Redondear bordes para que coincida con TextInput
    marginBottom: 0,
    height: 40, 
};


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
        textAlign: 'left',
        fontWeight: 'bold',
        marginTop: '5%',
        width: 250,
    },
    tituloImg: {
        marginLeft: '5%',
        marginRight: '5%',
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
  
export default CuentaNueva;