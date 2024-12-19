import { StyleSheet } from "react-native";


// Grey ligth backgroundColor: "#d8d8d8", 
// Create a new style sheet for the login page
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column'
        
    },
    tituloTexto: {
        position: "relative",
        color: 'white',
        textAlign: 'center',
        fontSize: 60,
        fontWeight: 'bold',
        top: -60 ,
    },
    subtituloTexto: {
        color: 'white',
        textAlign: 'left',
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 0,
    },
    botonCuerpo: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
    },

    botonImg: {
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


    cuerpoTexto: {
        color: 'white',
        textAlign: 'center',
        margin: 20,
    },
    cuerpoLinks: {
        color: 'white',
        textAlign: 'center',
        textDecorationLine: "underline",
    },
    cuerpoPie: {
        color: 'black',
        textAlign: 'right',
        fontSize: 10,
        marginRight: 10
    },
    cajasTexto: {
        backgroundColor: 'white',
        borderColor: '#ccc',
        borderWidth: 2,
        marginBottom: 10,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
    },
    imgSEPH: {
        width: 250,
        left: 2,
    },
    imgMujerLaptopAmarilla: {
        position: "absolute",
        height: 350,
        width: 200,
        top: 100,
        left: 200,
    },
    imgHombreCelularAzul: {
        position: "absolute",
        height: 250,
        width: 200,
        top: 550,
        left: 0,
    },
    horizontalElementTitle: {
        height: 80,
        flexDirection: 'row',
        justifyContent:"center",
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
      },

    horizontalElement: {
        height: 53,
        backgroundColor: 'rgba(246, 246, 246, 1)', 
        flexDirection: 'row',
        justifyContent:"space-between",
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      },
  })
