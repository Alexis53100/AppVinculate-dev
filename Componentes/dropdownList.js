import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { vinculateApi } from '../src/api/vinculateAPI';
import { Dropdown } from 'react-native-element-dropdown';
//import  estadosMx from '../Componentes/files/estadosMX.json';
//import  municipiosMx from '../Componentes/files/municipiosMXMin.json';

const DropdownEstadosComponent = ({onEstadoSelect, onMunicipioSelect}) => {
    
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingMun, setIsLoadingMun] = useState(false);
    const [estadosMx, setEstadosMx] = useState(null);
    const [municipiosMx, setMunicipiosMx] = useState([]);
    const [estado, setEstado] = useState('');
    const [municipio, setMunicipio] = useState(null);
    const [isFocus, setIsFocus] = useState(false);



    const handleEstado = (estado_id)=>{
      setIsLoadingMun(true);

      vinculateApi.post(`/municipios?id_estado=${estado_id}`, {})
      .then(function (response) {
          if(response.data.codigo === 1) {
            const municipiosObj = response.data.data.municipios;
            
            let municipiosArr = []
            
            for (let index = 0; index < municipiosObj.length; index++) {
              municipiosArr.push({
                value: municipiosObj[index].MUNICIPIO_ID,
                label: municipiosObj[index].MUNICIPIO,
              });
              
            }   
            setMunicipiosMx(municipiosArr);
          } else {
              Alert.alert(response.data.texto);
          }
      })
      .catch(function (error) {
          console.error(error);
      })
      .finally(function () {
        setIsLoadingMun(false);
      });
    }

  useEffect(() => {
      vinculateApi.post('/estados', {})
      .then(function (response) {
          if(response.data.codigo === 1) {
              setEstadosMx(response.data.data.estados);
          } else {
              Alert.alert(response.data.texto);
          }
      })
      .catch(function (error) {
          console.error(error);
      })
      .finally(function () {
        setIsLoading(false);
      });
  }, []);

  return (
    <View style={styles.container}>

        {
            isLoading?
              <ActivityIndicator size={'large'}/>
                    :
            <>
              <Dropdown
              style={[styles.dropdown, isFocus && { borderColor: 'grey' },  {marginVertical: 10}]}
              //containerStyle={{ height: 70 }}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={ isLoading ? [] : estadosMx}
              maxHeight={300}
              labelField="ESTADO"
              valueField="ESTADO_ID"
              placeholder={!isFocus ? 'Estado' : '...'}
              searchPlaceholder="Buscar..."
              value={estado}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setEstado(item.ESTADO_ID);
                handleEstado(item.ESTADO_ID);
                setIsFocus(false);
                onEstadoSelect(item.ESTADO_ID);
              }}
              />

    {
      isLoadingMun?
      <ActivityIndicator size={'large'}/>
      :
        <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'grey' },  {marginTop: 10}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        dropdownPosition="top"
        data={municipiosMx}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Municipio' : '...'}
        searchPlaceholder="Buscar..."
        value={municipio}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setMunicipio(item.value);
          setIsFocus(false);
          onMunicipioSelect(item.value);
        }}
        />
      }
      

        </>
      }

    </View>
  );
};

export default DropdownEstadosComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0'
  },
  dropdown: {
    borderColor: '#ccc',
    borderWidth: 2,
    //paddingBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    size: 20,
    height: 50,
    //paddingTop: 10,
  },
  icon: {
    marginRight: 5,
  },
  
  placeholderStyle: {
    fontSize: 15,
    //color: '#ccc',
  },
  selectedTextStyle: {
    fontSize: 15,
    color: '#000',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    //height: 800,
    fontSize: 16,
  },
});