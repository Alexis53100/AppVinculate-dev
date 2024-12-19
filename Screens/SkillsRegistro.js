import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, ScrollView, SafeAreaView, StyleSheet, Switch, Text, TouchableOpacity, View, TextInput } from 'react-native';
import { vinculateApi } from '../src/api/vinculateAPI';
import { styles } from '../src/styles/app-theme';
import { stylesBase } from '../src/styles/base-colors';
import Icon from 'react-native-vector-icons/Ionicons';

const SkillsRegistro = ({ navigation, route }) => {

    const veda = global.isVeda;
    const backgroundCardColor = veda ? '#d8d8d8' : '#DDC9A3';
    const trackCardColor = veda ? '#231F1E' : '#A02142';

    const { usuario, idUsuario, idEmpresa, empresaData } = route.params;
    const [isLoading, setIsLoading] = useState(true);
    const [listaSkills, setListaSkills] = useState([]);
    const [search, setSearch] = useState('');

    const prepararListaSkills = (skills) => {
        let lista = [];
        for (let skill of skills) {
            skill.switch = false;
            lista.push(skill);
        }
        setListaSkills(lista);
    };

    useEffect(() => {
        vinculateApi.post('/buscarSkills',
            {
                idEmpresa: idEmpresa
            })
            .then(function (response) {
                if (response.data.codigo === 1) {
                    prepararListaSkills(response.data.skils);
                } else {
                    console.log(response.data.texto);
                }
            })
            .catch(function (error) {
                console.error(error);
            })
            .finally(function () {
                setIsLoading(false);
            });
    }, []);

    const actualizarSkill = (value, index) => {
        const tempSkills = [...listaSkills];
        tempSkills[index].switch = value;
        setListaSkills(tempSkills);
    };

    const normalize = (s) => {
        return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    }

    const listarSkills = ({ item, index }) => {
        if (normalize(item.nombreSkill).toLowerCase().includes(normalize(search).toLowerCase()) ||
            normalize(item.descripcionSkill).toLowerCase().includes(normalize(search).toLowerCase())) {
            return (

                <View style={[stylesCard.card, { backgroundColor: backgroundCardColor }]}>
                    <Image source={require('../Componentes/img/skill.png')} style={stylesCard.image} />
                    <View style={stylesCard.textContainer}>
                        <Text style={stylesCard.title}>{item.nombreSkill}</Text>
                        <Text style={stylesCard.subtitle}>{item.descripcionSkill}</Text>
                    </View>
                    <Switch
                        trackColor={{ false: '#e3e3e3', true: trackCardColor }}
                        onValueChange={(value) => actualizarSkill(value, index)}
                        value={item.switch}
                    />
                </View>

            );
        } else {
            return null;
        }
    };

    const registrarSkillsEmpresa = () => {
        let idSkills = [];
        for (let skill of listaSkills) {
            if (skill.switch) {
                idSkills.push(skill.idSkill);
            }
        }
        if (idSkills.length > 0) {
            console.log('***** registrar idSkills -> ');
            console.log(idSkills);
            vinculateApi.post('/registrarSkillsEmpresa',
                {
                    idEmpresa: idEmpresa,
                    skills: `[${idSkills}]`
                })
                .then(function (response) {
                    if (response.data.codigo === 1) {
                        Alert.alert('Aviso Registro Skills', 'Skills registrados con éxito.');
                    } else {
                        Alert.alert('Advertencia Registro Skills', response.data.texto);
                    }
                    navigation.navigate('CoreNavigation', {
                        usuario: usuario,
                        idUsuario: idUsuario,
                        idEmpresa: idEmpresa,
                        idSkills: idSkills,
                        empresaData: empresaData,
                    });
                })
                .catch(function (error) {
                    console.error(error.message);
                })
                .finally(function () {
                });
        } else {
            Alert.alert('Advertencia', 'No se han seleccionado skills relacionados con su empresa.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.seccionEncabezado, stylesBase.seccionEncabezado, { paddingHorizontal: 10 }]} >
                <Image style={styles.imgInstitucion} source={require('../Componentes/img/factory128-val.png')} />
                <Text style={[styles.tituloTexto, stylesBase.tituloTexto, {}]}>Empresa Validada</Text>
            </View>
            <View style={[styles.seccionCuerpo, styles.seccionCuerpoWBorder]} >
                <View style={{ flexDirection: 'row', justifyContent: 'center' }} >
                    <Image style={{ height: 48, resizeMode: 'stretch', width: 48 }} source={require('../Componentes/img/skills128.png')} />
                    <Text style={styles.subtituloTexto}>Habilidades</Text>
                </View>
                <Text style={styles.cuerpoTexto}>Conoce y selecciona los habilidades que más necesitas para tu empresa, esto nos ayudará a generar recomendaciones adecuadas para tu empresa.</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 15}}
                    onChangeText={text => setSearch(text)}
                    value={search}
                    placeholder="Buscar habilidad"
                />
                {
                    isLoading ?
                        <ActivityIndicator size={'large'} />
                        :
                        <FlatList
                            data={listaSkills}
                            keyExtractor={item => item.idSkill}
                            renderItem={listarSkills}
                            showsVerticalScrollIndicator={false}
                        />


                }
            </View>
            <View style={[styles.seccionPie, stylesBase.seccionPie, { justifyContent: 'center' }]} >
                <TouchableOpacity
                    style={[styles.botonCuerpo, stylesBase.botonCuerpo, { paddingLeft: 10, paddingRight: 10 }]}
                    onPress={() => {
                        registrarSkillsEmpresa();
                    }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image style={[styles.botonImg, { height: 32, resizeMode: 'stretch', width: 32 }]} source={require('../Componentes/img/Save-as32.png')} />
                        <Text style={styles.botonTexto} >Guardar e Iniciar Vinculación</Text>
                    </View>

                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}



const stylesCard = StyleSheet.create({
    container: {
        flex: 1,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        marginBottom: 15
    },
    image: {
        width: 50,
        height: 50,
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
        paddingHorizontal: 10

    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'justify',
        marginBottom: 5
    },
    subtitle: {
        fontSize: 14,
        textAlign: 'justify'
    },
});


export default SkillsRegistro;