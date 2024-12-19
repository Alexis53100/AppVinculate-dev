import { StyleSheet } from "react-native";


export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    seccionCuerpo: {
        paddingBottom: 350,
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 400,
    },
    seccionPie: {
      bottom:5,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
  },
    botonCuerpo: {
        //position:'absolute',
        paddingHorizontal: 10,
        backgroundColor: '#BC955B',
        bottom: 1,
        borderRadius: 10,
        flexDirection: 'row',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
        
        //justifyContent: 'center',
    },
    botonImg: {
        position:'absolute',
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
    },
    botonTexto: {
      fontSize: 20,
      paddingBottom: 10,
      paddingTop: 10,
      textAlign: 'center',
    },
})