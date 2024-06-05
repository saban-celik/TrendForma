import React from 'react';
import 'regenerator-runtime/runtime';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigator from './proje/BottomNavigator';
import CartScreen from './proje/CartScreen';
import LoginScreen from './proje/LoginScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen 
          name="LoginScreen" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="BottomNavigator" 
          component={BottomNavigator} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="CartScreen" 
          component={CartScreen} 
          options={{ title: 'Sepet' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
