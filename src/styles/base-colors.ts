import { StyleSheet } from "react-native";

const veda = (global as any).isVeda;

// Grey ligth backgroundColor: "#d8d8d8", 
// Create a new style sheet for the login page

const styles = StyleSheet.create({
    botonCuerpo: {
        backgroundColor: '#BC955B',
    },
    botonCuerpoDanger: {
        backgroundColor: 'red',
    },
    botonTexto: {
        color: '#691b31',
    },
    horizontalElementTitle:{
        backgroundColor: "#691B31", 
    },
    icon:{ 
        color: '#691b31'
    },
    mensajeBackground: {
        backgroundColor: '#691831',
    },
    tituloTexto: {
        color: 'white'
    },
    seccionEncabezado: {
        backgroundColor: '#691B31',
    },
    flatListItemBackground: {
        backgroundColor:'#DDC9A3',

    },
    seccionPie: {
        backgroundColor: '#691B31',
    },
    flatListItem: {
        backgroundColor: '#A02142',
    },
    flatListItemTitulo: {
        color: '#231F1E',
    },

});

const stylesVeda = StyleSheet.create({
    botonCuerpo: {
        backgroundColor: '#d8d8d8',
    },
    botonCuerpoDanger: {
        backgroundColor: '#e23a08',
        color: 'white',
    },

    botonTexto: {
        color: '#231F1E',
    },
    horizontalElementTitle:{
        backgroundColor: "#d8d8d8", 
    },
    icon:{ 
        color: '#231F1E'
    },
    mensajeBackground: {
        backgroundColor: '#ffffff',
    },
    tituloTexto: {
        color: 'white'
    },
    seccionEncabezado: {
        backgroundColor: '#231F1E', 
    },
    flatListItemBackground: {
        backgroundColor:'#808080',

    },
    seccionPie: {
        backgroundColor: '#6F6C6A',
    },
    flatListItem: {
        backgroundColor: '#6F6C6A',
    },
    flatListItemTitulo: {
        color: 'white',
    },



});

export const stylesBase = veda ? stylesVeda : styles;