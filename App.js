import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import { Provider} from "react-redux";
import { Store } from './src/Redux/store';


const Stack = createStackNavigator()


export default function App() {



  return (
    <Provider store={Store}>
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
   </Provider>
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

