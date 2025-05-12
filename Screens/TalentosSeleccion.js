import React, { useEffect, useState } from "react";
import { 
    ActivityIndicator, 
    Alert, 
    FlatList, 
    Image, 
    SafeAreaView, 
    StyleSheet, 
    Text, 
    TextInput,
    TouchableOpacity, 
    View, 
    Dimensions, 
    Button 
} from 'react-native';
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
    const [searchText, setSearchText] = useState('');
    const [filteredTalentos, setFilteredTalentos] = useState([]);

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
    }, []);

    useEffect(() => {
        console.log('idEmpresa: ' + idEmpresa);
        console.log('updateskill: ' + updateskill);
        vinculateApi.post('/BuscarTalentos',
            {
                idEmpresa: idEmpresa
            }
        ).then(response => {
            console.log('Lista talentos', response.data);
            setListaTalentos(response.data.Talentos || []);
            setFilteredTalentos(response.data.Talentos || []);
            setIsLoading(false);
        }).catch(error => {
            Alert.alert('Error', error.message);
            setIsLoading(false);
        });
    }, [updateskill]);

    useEffect(() => {
        const filtered = listaTalentos.filter(talent => 
            talent.nombreTalento.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredTalentos(filtered);
    }, [searchText, listaTalentos]);

    const goToDetails = (item) => {
        navigation.navigate('TalentosDescripcion', {
            usuario: usuario,
            idUsuario: idUsuario,
            idEmpresa: idEmpresa,
            talento: item,
            empresaData: empresaData,
        });
    }

    const talentSelected = (item) => {
        navigation.navigate('InstitucionesSeleccion', {
            usuario: usuario,
            idUsuario: idUsuario,
            idEmpresa: idEmpresa,
            talento: item,
            empresaData: empresaData,
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.seccionEncabezado, stylesBase.seccionEncabezado]}>
                <Text style={[styles.tituloTexto, stylesBase.tituloTexto]}>Selección de talentos</Text>
            </View>
            <View style={styles.seccionCuerpo}>
                {isLoading ? (
                    <ActivityIndicator size={'large'} />
                ) : (
                    <View style={{flex: 1}}>
                        <View style={searchStyles.searchContainer}>
                            <TextInput
                                style={searchStyles.searchInput}
                                placeholder="Buscar talentos..."
                                value={searchText}
                                onChangeText={setSearchText}
                            />
                        </View>
                        <View>
                            <FlatList
                                data={filteredTalentos}
                                keyExtractor={item => item.idTalento}
                                renderItem={({item, index}) => (
                                    <TalentosCard 
                                        item={item} 
                                        goToDetails={goToDetails} 
                                        talentSelected={talentSelected}
                                    />
                                )}
                                showsHorizontalScrollIndicator={false}
                                pagingEnabled
                                horizontal
                                onScroll={e => {
                                    const x = e.nativeEvent.contentOffset.x;
                                    setCurrentIndex((x/width).toFixed(0));
                                }}
                                removeClippedSubviews={true}
                            />
                        </View>
                        <View style={{flex: 1}}>
                            <Paginacion data={filteredTalentos} currentIndex={currentIndex}/>
                        </View>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}

const searchStyles = StyleSheet.create({
    searchContainer: {
        padding: 10,
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 3,
    },
    searchInput: {
        height: 40,
        paddingHorizontal: 10,
        fontSize: 16,
    }
});

export default TalentosSeleccion;