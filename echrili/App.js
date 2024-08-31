import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './compenent/Home';
import Dokol from './compenent/Dokol';
import Tasjil from './compenent/Tasjil';
import Add from './compenent/Add';
import Buy from './compenent/Buy';
import Ahla from './compenent/Ahla';
import Cart from './compenent/Cart';
import Chari from './compenent/Chari';
import Users from './compenent/Users';
import Uss from './compenent/Uss';
import Addus from './compenent/Addus';
import Orders from './compenent/Orders';





const Stack = createStackNavigator();


export default function App() {
  return (

    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="الصفحة الرئيسية" component={Home} />
      <Stack.Screen name="Dokol" component={Dokol} />
      <Stack.Screen name="Tasjil" component={Tasjil} />
      <Stack.Screen name="Add" component={Add} />
      <Stack.Screen name="Buy" component={Buy} />
      <Stack.Screen name="Ahla" component={Ahla} />
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Chari" component={Chari} />
      <Stack.Screen name="Users" component={Users} />
      <Stack.Screen name="Uss" component={Uss} />
      <Stack.Screen name="Addus" component={Addus} />
      <Stack.Screen name="Orders" component={Orders} />






 
    </Stack.Navigator>
  </NavigationContainer>
    );
  }