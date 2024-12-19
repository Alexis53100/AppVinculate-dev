import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({


    flatListItemContainer: {
        flex:1, 
        justifyContent: "center",
        alignItems:"center",
        flexDirection:"column"
    },

    flatListItemBackground: {
        width: '80%',
        height: '90%',
        borderRadius: 10,
    },
    imgTalento: {
        flex:0.5, 
        paddingTop:'5%',
        marginTop:'5%', 
        marginRight:'20%'
    },
    imgInstitucion: {
        height: 55,
        width: 55,
        margin: 5,
    },
    flatListItemContent: {
        flex:0.5,
        marginRight:'20%',
        paddingTop:5
    },



    flatListItemTitulo: {
        fontSize:  24,
    },

    flatListItemFunciones: {
        fontSize:12,
        alignSelf:'flex-start'
    },
    flatListItemAplicacion: {
        fontSize: 12,
    },

    flatListItemInfoButton: {
        position:'absolute',
        bottom:0,
        // bottom:'-5%',
        left:0,
         //justifyContent:"center"
         
     },
     flatListItemHeartButton: {
        position:'absolute',
        bottom:0,
        right:'20%',
         //justifyContent:"center"
         
     },

     flatListItemVerText: {
        color:'white',
        fontSize:40,
        fontWeight: 'bold',
        //textAlign:'center',
        alignSelf:'center'
 
     }, 

     flatListbotonImg: {
        width:50,
        height:50, 
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
    },

    container: {
        flex: 1,
        justifyContent: 'space-between',
    },


    seccionEncabezado: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        paddingBottom: 20,
        paddingTop: 20,
    },
    seccionCuerpo: {
        flex: 1,
    },
    seccionPie: {
        width:'100%',
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    patrocinadoresBtn: {
        backgroundColor: '#BC955B',
        justifyContent:"center",
        alignItems:"center",
    },

    patrocinadoresText: {
        backgroundColor: '#BC955B',
        color: 'black',
        fontSize: 25,
        fontWeight: 'bold',
        marginVertical: 8
    },
    tituloTexto: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        marginTop: 10,
    },

    tituloImg: {
        marginHorizontal: 10,
        marginVertical: 5,
        height:100,
        width:100
    },
    subtituloTexto: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 5,
        marginTop: 20,
    },
    botonCuerpo: {
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    botonImg: {
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
    },
    botonTexto: {
        fontSize: 15,
        paddingBottom: 10,
        paddingTop: 10,
        textAlign: 'center',
    },
    botonTextoDanger: {
        fontSize: 15,
        color: 'white',
        paddingBottom: 10,
        paddingTop: 10,
        textAlign: 'center',
    },
    
    cuerpoTexto: {
        textAlign: 'center',
        marginBottom: 10,
        marginTop: 10,
    },

    flatListItem: {
        borderRadius: 10,
        flexDirection: 'row',
        margin: 5,
        padding: 10,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: 5,
    },
    seccionCuerpoWBorder: {
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 5,
    },

    tituloImgNewAccount: {
        marginLeft: '5%',
        marginRight: '5%',
    },

    textBox: {
        borderColor: '#ccc',
        borderWidth: 2,
        marginBottom: 10,
        marginTop: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
    },
    cuerpoLinks: {
        textAlign: 'center',
        textDecorationLine: "underline",
    },
    buttonLabel:{
        fontSize: 20, 
        fontWeight: 'bold',
        marginBottom: 10, 
        marginTop:10
    },

});