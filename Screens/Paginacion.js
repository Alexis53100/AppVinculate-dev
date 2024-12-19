import { React } from 'react'
import { StyleSheet, Text, View, Dimensions } from "react-native";


const Paginacion = ({data, currentIndex}) => {

    const veda = global.isVeda;

const currentIndexColorBg = veda ? '#231F1E':'#A02142';     
const indexColorBg = veda ? '#6F6C6A':'#BC955B';     

    const {width, height} = Dimensions.get('screen');
    return(
        
        <View style = { [styles.container, {width}] }>
            {data.map((_, idx) => {
                return (<View key={idx.toString()} 
                            style={[styles.dot, 
                                {
                                    width:currentIndex==idx? 30:8,
                                    height: currentIndex==idx? 11:8,
                                    borderRadius:currentIndex==idx? 5:4,
                                    marginLeft:5,
                                    backgroundColor:currentIndex==idx? currentIndexColorBg:indexColorBg        
                                }]} 
                        />);
            })}
        </View>
    );
}

export default Paginacion;

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        position:'absolute',
        justifyContent: 'center',
        alignItems:'center'
    },
})