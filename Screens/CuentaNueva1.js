import React, { useState } from 'react';
import { Alert, ScrollView, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View, PixelRatio } from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const CuentaNueva1 = ({ navigation }) => {


   

    const [razonSoci, setRazonSoci] = useState('');
    const [rfc, setRfc] = useState('');
    const [telefono, setTelefono] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

    const fontSizeTitle = 40 * PixelRatio.getFontScale();

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

      const handleInputChange = (text) => {
        setRfc(text.toUpperCase()); 
      };

     


    const registrarCuenta = () => {
        if(razonSoci.trim() == '') {
            Alert.alert('Advertencia', 'No se ha dado la razón social.');
        } 
        else if(telefono.trim() == '' || telefono.length!==10) {
            Alert.alert('Advertencia', 'El teléfono no cumple con los requisitos.');
        } 
        else {
           
            navigation.navigate('CuentaNueva2', {
                razonSoci: razonSoci,
                telefono: telefono,

            });
        }
    }
    
    return (
        <SafeAreaView style = { styles.container }>
            <View style = { styles.seccionEncabezado } >
                <Image style = { styles.tituloImg } source = {require('../Componentes/img/factory128.png')} />
                <Text style = {[ styles.tituloTexto, { fontSize:fontSizeTitle } ]}>Registro de Empresa</Text>
            </View>
                <ScrollView >
                    <View style = { styles.seccionCuerpo } >

                        <Text style = { styles.cuerpoTexto }>Inicia tu registro en línea, es importante tener tu RFC a la mano. ¡Vamos por ello!</Text>
                        <TextInput 
                            style = { styles.cajasTexto }
                            placeholder='Razón Social'
                            onChangeText={texto => setRazonSoci(texto)}
                        />
                        
                        <TextInput 
                            style = { styles.cajasTexto }
                            placeholder='Teléfono 10 digitos'
                            onChangeText={texto => setTelefono(texto)}
                            maxLength={10}
                            keyboardType='numeric'
                        />

                    </View>
                </ScrollView>
                <View style = { styles.seccionPie } >
                    <TouchableOpacity
                    style = { [ styles.botonCuerpo, { paddingLeft: 10, paddingRight: 10 } ] }
                    onPress={() => {
                        navigation.navigate('LogIn');
                    }}
                    >
                        <Image style = { styles.botonImg } source = {require('../Componentes/img/close32.png')} />
                        <Text style  = { styles.botonTexto } >Cancelar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style = { [ styles.botonCuerpo, { paddingLeft: 10, paddingRight: 10 } ] }
                        onPress={() => {
                            registrarCuenta();
                        }}
                        >
                        <Image style = { styles.botonImg } source = {require('../Componentes/img/forward32.png')} />
                        <Text style = { styles.botonTexto } >Siguiente</Text>
                    </TouchableOpacity>
                </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
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
    cajasTexto: {
        borderColor: '#ccc',
        borderWidth: 2,
        marginBottom: 10,
        marginTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
    }
})
  
export default CuentaNueva1;