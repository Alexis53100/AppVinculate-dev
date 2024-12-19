import React, { useState } from 'react';
import axios from 'axios';
import { Alert, ScrollView, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { vinculateApi } from '../src/api/vinculateAPI';
import TextInputWithImage from '../Componentes/textInputWithImage.js'; 
import { styles } from '../src/styles/app-theme';
import { stylesBase } from '../src/styles/base-colors';
import Icon from 'react-native-vector-icons/Ionicons';

const EmpresaValidada2 = ({ navigation, route }) => {

    const { usuario, idUsuario, idEmpresa, empresaData } = route.params;
    
    const [isLoading, setIsLoading] = useState(false);
    const [idFacebook, setIdFacebook] = useState('');
    const [idInstagram, setIdInstagram] = useState('');
    const [idTwitter, setIdTwitter] = useState('');


    const handleFB = (id)=>setIdFacebook(id);
    const handleIG = (id)=>setIdInstagram(id);
    const handleTW = (id)=>setIdTwitter(id);

    const asociarRedes = async () => {
        const redesArr = [];
        if( idFacebook.trim() !== '' ) {
            redesArr.push({"idRedSocial": "1", "contenido": idFacebook});
        }
        if( idInstagram.trim() !== '' ) {
            redesArr.push({"idRedSocial": "2", "contenido": idInstagram});            
        }
        if( idTwitter.trim() !== '' ) {
            redesArr.push({"idRedSocial": "3", "contenido": idTwitter});
        }

        const data = new FormData();
        data.append('idEmpresa', idEmpresa);
        data.append('Redes', JSON.stringify(redesArr));

        await vinculateApi.post('/registrarEmpresaRedesSociales', 
        data,
         {
            headers: {
             'Content-Type': 'multipart/form-data'
            }
         })
           .then(function (response) {
               console.log(response.data);
               if(response.data.codigo === 0) {
                   Alert.alert('Error', 'Error al asociar redes: ' + response.data.texto);
                   
               }
           })
           .catch(function (error) {
               console.error(error);
           })
           .finally(function () {
               setIsLoading(false);
           });
          

        navigation.navigate('SkillsRegistro', {
            usuario: usuario,
            idUsuario: idUsuario,
            idEmpresa: idEmpresa,
            empresaData: empresaData,
        });
    }

    return (
        <SafeAreaView style = { styles.container }>
            <View style = {[ styles.seccionEncabezado, stylesBase.seccionEncabezado, {paddingHorizontal:10} ]} >
                <Image style = { styles.imgInstitucion } source = {require('../Componentes/img/factory128-val.png')} />
                <Text style = {[ styles.tituloTexto, stylesBase.tituloTexto, {  } ]}>Empresa Validada</Text>
            </View>
            <ScrollView >


            <View style = {[ styles.seccionCuerpo, styles.seccionCuerpoWBorder ]} >
                <Text style = { styles.subtituloTexto }>Redes Sociales de la Empresa</Text>
                <Text style = { styles.cuerpoTexto }>Nota: colocar en las ventanas emergentes el ID de su red social.</Text>

                <TextInputWithImage
                    imageSource={require('../Componentes/img/facebook.png')}
                    handleInputText ={ handleFB }
                    placeholder="Asociar Facebook ID"
                    />
                <TextInputWithImage
                    imageSource={require('../Componentes/img/instagram.png')}
                    handleInputText ={ handleIG }
                    placeholder="Asociar Instagram ID"
                    />
                
                <TextInputWithImage
                    imageSource={require('../Componentes/img/twitter.png')}
                    handleInputText ={ handleTW }
                    placeholder="Asociar Twitter"
                    />
               
            </View>
            </ScrollView>
            <View style = {[ styles.seccionPie, stylesBase.seccionPie,{justifyContent: 'center'} ]} >
                <TouchableOpacity
                     style = { [ styles.botonCuerpo, stylesBase.botonCuerpo, { paddingLeft: 10, paddingRight: 10} ] }
                    onPress={() => {
                        if(
                            idFacebook.trim() === '' && 
                            idInstagram.trim() === '' && 
                            idTwitter.trim() === ''
                        ) {
                            Alert.alert(
                                    'Asociar Redes Sociales',
                                    'No se ha asociado alguna red en la empresa, ¿desea continuar?',
                                    [
                                        {
                                            text: 'No',
                                            style: 'cancel'
                                        },
                                        {
                                            text: 'Si',
                                            onPress: () => { asociarRedes() }
                                        }
                                    ]
                                )
                        } else {
                            asociarRedes();
                        }
                    }}
                >
                     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style = { styles.botonImg } source = {require('../Componentes/img/Save-as32.png')} />
                        <Text style = { styles.botonTexto } >Guardar y Continuar</Text>
                     </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default EmpresaValidada2;