import { View, Text } from 'react-native'
import React from 'react'
import Splash from './Splash';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Home';


const Stack = createNativeStackNavigator();

function Stacknavigations() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Spalsh" component={Splash} />
                <Stack.Screen name="Home" component={Home} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Stacknavigations