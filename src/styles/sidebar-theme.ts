import { StyleSheet } from "react-native";

const veda = (global as any).isVeda;

const styles = StyleSheet.create({ 
    menuContainer:{
      flex:1,
    },
  
    tituloTexto: {
      fontSize: 20,
      textAlign: 'center',
      fontWeight: 'bold',
      paddingVertical:20,
      marginBottom: 20,
      //marginVertical: 10,
    },
  
    seccionEncabezado: {

      flexDirection: 'row',
      justifyContent: 'center',
      alignItems:'center',
      paddingBottom: 5,
      paddingTop: 10,
  },
  
  
  
    menuBoton:{
      marginVertical: 10,
      marginLeft: 10,
      paddingBottom: 5,
      borderRadius: 5,
  
    },
    menuTexto: {
      color: 'grey',
      textAlign: 'center',
      fontSize: 15,
      //fontWeight: 'bold',
      marginTop: 5,
      marginLeft: 5,
  },
  
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  
  logoutButton: {
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    //backgroundColor: '#b3b',
  },
  logoutTexto: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
    marginLeft: 5,
    marginTop: 3,
  },
    
});

const stylesColorBase = StyleSheet.create({ 
  
    tituloTexto: {
      color: 'white',
      backgroundColor: '#691B31',
    },
  
    seccionEncabezado: {
      backgroundColor: '#691B31',
  },
  
    menuTexto: {
      color: 'grey',
  },

  
  logoutTexto: {
    color: '#691B31',
  },
    
});

const stylesColorVeda = StyleSheet.create({ 
    tituloTexto: {
        color: 'white',
        backgroundColor: '#6F6C6A',
      },
    
      seccionEncabezado: {
        backgroundColor: '#6F6C6A',
    },
    
      menuTexto: {
        color: 'grey',
    },
  
    
    logoutTexto: {
      color: '#231F1E',
    },
      
  });

const styleColors = veda ? stylesColorVeda : stylesColorBase;
export {styles, styleColors};
