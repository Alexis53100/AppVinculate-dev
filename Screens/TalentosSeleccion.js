import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Dimensions, Button } from 'react-native';
import { vinculateApi } from "../src/api/vinculateAPI";
import Paginacion from "./Paginacion";
import TalentosCard from "./TalentosCard";
import { styles } from '../src/styles/app-theme';
import { stylesBase } from "../src/styles/base-colors";



const TalentosSeleccion = ({ navigation, extraData }) => {

    const { usuario, idUsuario, idEmpresa, empresaData, updateskill = 0} = extraData;
    const [listaTalentos, setListaTalentos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);


    const {width} = Dimensions.get('screen');

    useEffect(() => {

        navigation.setOptions({
            headerLeft : () => (
                <Button
                    title="Menu"
                    onPress={() => navigation.toogleDrawer()}
                />
            )
        });
    }
    , []);

    useEffect(() => {
        console.log('idEmpresa: ' + idEmpresa);
        console.log('updateskill: ' + updateskill);
        vinculateApi.post('/BuscarTalentos',
        {
            idEmpresa: idEmpresa
        })
        .then(function (response) {
            if(response.data.codigo === 1) {
                setListaTalentos(response.data.Talentos);
            } else {
                Alert.alert('Advertencia Talento Selección', response.data.texto);
            }
        })
        .catch(function (error) {
            console.error(error);
        })
        .finally(function () {
            setIsLoading(false);
        });
    }, [updateskill]);


    const goToDetails = (item) => {
        navigation.navigate('TalentosDescripcion', {
            usuario: usuario,
            idUsuario: idUsuario,
            idEmpresa: idEmpresa,
            talento: item,
            empresaData: empresaData,
        });
    }

    const talentSelected = (item) =>{

        //console.log(item);
        navigation.navigate('InstitucionesSeleccion', {
            usuario: usuario,
            idUsuario: idUsuario,
            idEmpresa: idEmpresa,
            talento: item,
            empresaData: empresaData,
        });
    }

    return (
        <SafeAreaView style = { styles.container }>
            <View style = {[ styles.seccionEncabezado, stylesBase.seccionEncabezado ]} >
                {/* <Image style = { styles.tituloImg } source = {require('../Componentes/img/factory128-val.png')} /> */}
                <Text style = {[styles.tituloTexto, stylesBase.tituloTexto ]}>Selección de talentos</Text>
            </View>
            <View style = { styles.seccionCuerpo } >


                {
                    isLoading?
                        <ActivityIndicator size={'large'}/>
                    :
                        <View style={{flex:1}}>
                            <View style={{}}>
                                <FlatList style={{}}
                                data = { listaTalentos }
                                keyExtractor = { item => item.idTalento }
                                renderItem = { ({item, index})=> <TalentosCard item={item} goToDetails={goToDetails} talentSelected={talentSelected} /> }
                                showsHorizontalScrollIndicator={false}
                                pagingEnabled
                                horizontal
                                onScroll={e=>{
                                    const x = e.nativeEvent.contentOffset.x;
                                    setCurrentIndex((x/width).toFixed(0));
                                }}
                                removeClippedSubviews={true}
                                />
                            </View>


                            <View style={{flex:1}}>
                                <Paginacion data= {listaTalentos} currentIndex={currentIndex}/>
                            </View>
                        </View>
                }
            </View>

        </SafeAreaView>
    )
}



export default TalentosSeleccion;