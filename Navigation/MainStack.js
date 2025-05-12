import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";


import CuentaNueva from "../Screens/CuentaNueva";
import CuentaRegistro from "../Screens/CuentaRegistro";
import AvisoPrivacidad from "../Screens/AvisoPrivacidad";
import RecuperarContrasenia from "../Screens/RecuperarContrasenia";
import EmpresaValidada1 from "../Screens/EmpresaValidada1";
import EmpresaValidada2 from "../Screens/EmpresaValidada2";
import SkillsRegistro from "../Screens/SkillsRegistro";

import { CoreNavigation } from "./CoreNavigation";
import LogIn from "../Screens/LogIn";
import MensajeBienvenida from "../Screens/MensajeBienvenida";

const Stack = createNativeStackNavigator();


const MainStack = () => {
    return (
       
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}>

                <Stack.Screen name='Login' component={ LogIn } />
                <Stack.Screen name='CuentaNueva' component={ CuentaNueva } />
                <Stack.Screen name='CuentaRegistro' component={ CuentaRegistro } />
                <Stack.Screen name='AvisoPrivacidad' component={ AvisoPrivacidad } />
                <Stack.Screen name='MensajeBienvenida' component={ MensajeBienvenida } />
                <Stack.Screen name='EmpresaValidada1' component={ EmpresaValidada1 } />
                <Stack.Screen name='EmpresaValidada2' component={ EmpresaValidada2 } />
                <Stack.Screen name="RecuperarContrasenia" component={RecuperarContrasenia} />
                <Stack.Screen name='SkillsRegistro' component={ SkillsRegistro } />
                <Stack.Screen name='CoreNavigation' component={ CoreNavigation } />

            </Stack.Navigator>
    )
}

export default MainStack;