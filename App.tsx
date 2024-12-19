import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from "@react-navigation/native";

import SplashScreen from 'react-native-splash-screen'
import MainStack from './Navigation/MainStack';


function App(): JSX.Element {

  (global as any).isVeda = false;

  SplashScreen.hide();

  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}

export default App;
