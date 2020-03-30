import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import App from "../App";

const AppStack = createStackNavigator();

import Incidents from './pages/Incidents';
import Detail from './pages/Detail';

export default function Routes(){
    return (
        // sempre vai na volta de todas as rotas
        <NavigationContainer>
            {/* desabilita o header para ser feito meu próprio cabeçalho */}
            <AppStack.Navigator screenOptions={{ headerShown: false }}> 
                {/* recebe o componente da pagina, e tem que ter um name para cada rota */}
                <AppStack.Screen name="Incidents" component={Incidents} />
                <AppStack.Screen name="Detail" component={Detail} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}