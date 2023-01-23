import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import Home from './screens/Home';

const Stack = createStackNavigator()


export default function App() {



  return (
   <NavigationContainer>
    <Stack.Navigator
     initialRouteName="Login"
     screenOptions={{
    headerTitleAlign: "center",
    headerStyle:{
      backgroundColor:"#0080ff"
    },
    headerTintColor: "#ffffff",
    headerTitleStyle:{
      fontSize: 25,
      fontWeight: "bold"
    }
     }}

     >
      <Stack.Screen 
      name='Login'
      component={Login}
      options={{
        headerShown: false
      }}
     />


    <Stack.Screen 
      name='Home'
      component={Home}
      options={{
        headerShown: false
      }}
     />
    </Stack.Navigator>


   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

