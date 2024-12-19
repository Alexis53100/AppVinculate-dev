import React from 'react';
import { ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../src/styles/Message-theme';
import { stylesBase } from '../src/styles/base-colors';

const MensajeBienvenida = ({ navigation, route }) => {
    
  const veda = global.isVeda;
  const { usuario, idUsuario, idEmpresa, idEstatus, empresaData} = route.params;
    

  const windowHeight = Dimensions.get('screen').height;
  const botton = (windowHeight/2*.9)

  const images = {
      mensajeSecretario: require('../Componentes/img/MensajeSecretario.png'),
      mensajeSecretario_veda: require('../Componentes/img/MensajeSecretario_veda.png'),
  };
  const mensajeSecretarioImg = images[veda ? 'mensajeSecretario_veda':'mensajeSecretario'];


    const getNextScreen = (idEstatus)=> {
        let nextPage;
      console.log("idEstaus: ", Number(idEstatus));
        switch (Number(idEstatus)) {
          case 1:
            console.log("CoreNavigation");
            nextPage = 'CoreNavigation';
            break;
          case 2:
            // VALOR CORRECTO: CuentaRegistro solo vamos a EmpresaValidada1 por que no tenemos forma de pasar ese registro dependemos de SEPH
            console.log("CuentaRegistro");
            nextPage = 'CuentaRegistro';
            //nextPage = 'EmpresaValidada1';
            break;
          case 3:
            console.log("EmpresaValidada1");
            nextPage = 'EmpresaValidada1';
            break;
          case 6:
            console.log("EmpresaValidada2");
            nextPage = 'EmpresaValidada2';
            break;
          case 7:
            console.log("SkillsRegistro");
            nextPage = 'SkillsRegistro';
            break;
          default:
            console.log("CuentaRegistro");
            nextPage = 'CuentaRegistro';
            //nextPage = 'EmpresaValidada1';
            break;
        }
      
        return nextPage;
      }
      



    return (
        <SafeAreaView style = { styles.container }>
            <ImageBackground
                        style={[{
                            width: '100%', 
                            height: '100%',
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            
                        },stylesBase.mensajeBackground ]}
                        imageStyle={{
                            resizeMode: 'contain' 
                        }}
              source={mensajeSecretarioImg  }
            >
                    
                <View style = { styles.seccionPie } >

                  <TouchableOpacity
                        style = { [ styles.botonCuerpo , stylesBase.botonCuerpo, {  top: botton,}] }
                        onPress={() => {
                            
                            navigation.navigate(getNextScreen(idEstatus), {
                                usuario: usuario,
                                idUsuario: idUsuario,
                                idEmpresa: idEmpresa,
                                idEstatus: idEstatus,
                                empresaData: empresaData,
                            });
                        }}
                        >
                             
                              <Text style = { [styles.botonTexto, stylesBase.botonTexto ]} > Siguiente </Text>
                             <Icon name="caret-forward-circle-outline" size={ 30 } color={ stylesBase.icon } />
                     
                    </TouchableOpacity>
                </View>



            </ImageBackground>

        </SafeAreaView>
    )
}


  
export default MensajeBienvenida;