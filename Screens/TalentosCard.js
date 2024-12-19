import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions} from 'react-native';
import { styles } from '../src/styles/app-theme';
import { stylesBase } from "../src/styles/base-colors";


export default TalentosCard = ({ item,goToDetails,talentSelected }) => {

    const {width, height} = Dimensions.get('screen');
    
    const handleNavigation = () =>{
        goToDetails(item);
    };

    const handleTalentSelected = () =>{
        talentSelected(item);
    };

    return (
        
        <View style = { [styles.flatListItemContainer,styles.flatListItemElevation ,
                        {   
                            width:width, 
                            height: height/ 2 + 20
                        }] }>
            <View disabled={true} style={[ styles.flatListItemBackground, stylesBase.flatListItemBackground ]} >

                <View style = { [styles.flatListItemContainer,{width, height}] }>
            
                    <Image style = { [styles.imgTalento,{} ] } resizeMode="contain" source = {require('../Componentes/img/talento.png')} />
                
                    <View style = { [styles.flatListItemContent, {}] }>
                        <Text style = { [styles.flatListItemTitulo, {}] }> { item.nombreTalento }</Text>
                    </View>
                        <View style={{flexDirection:"row", width:'100%'}}>
                            <TouchableOpacity style={styles.flatListItemInfoButton} 
                                onPress = {()=>handleNavigation()} 
                                >
                                    <Image style = { styles.flatListbotonImg } source = {require('../Componentes/img/info.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.flatListItemHeartButton} 
                                onPress = {()=>handleTalentSelected()} 
                                >
                                <View style={styles.flatListItemHeartView}>
                                    <Image style = { styles.flatListbotonImg } source = {require('../Componentes/img/heart.png')} />
                                    
                                </View>
                            </TouchableOpacity>
                            
                        </View>
                </View>


            </View>   
        </View>
    );

}


