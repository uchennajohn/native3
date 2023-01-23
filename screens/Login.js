import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, TextInput, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButtons from "../utils/CustomButton"

function Login({navigation}) {

    const [name, setName] = useState("")

    useEffect(()=>{
        getData()
     }, [])
 
 //function to read the name thats stored in async storage
 const getData= ()=> {
     try {
         AsyncStorage.getItem("userName")
         .then(value =>{
             if(value != null) {
                navigation.navigate("Home")
             }
         })
     } catch (error) {
        console.log(error) 
     }
 }


    

    const setData= async()=>{
        if(name.length ===0) {
            Alert.alert("Warning!", "Input field cannot be empty")
        }else{
            try {
                await AsyncStorage.setItem("userName", name)  
                navigation.navigate("Home")
            } catch (error) {
                console.log(error)
            }
        }
    }
    return (
        <View style={styles.body}>
            <Image 
                 style={styles.image} 
                 source={require('../assets/logo-red.png')}/>
                 <Text style={styles.text}>Async Storage</Text>
                 
                   <TextInput 
                      style={styles.input} 
                      placeholder="Enter your Name"
                      onChangeText={(value)=> setName(value)}
                      />

                   <CustomButtons 
                    title='Login' 
                    color="#1eb900"
                    onPressFunction={setData}
                    />
        </View>
    );
}

const styles = StyleSheet.create({
    body:{
        flex: 1,
        alignItems: "center",
        justifyContent:"center",
        backgroundColor: "#0080ff"
    }, 
    image:{
       width: 100,
       height: 100,
      
       
    },
    text:{
        fontSize: 30,
        color: "#ffffff"
    },
    input:{
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: "#ffffff",
        height: 40,
        width: "70%",
        marginTop: 10,
        fontSize: 20,
        textAlign: "center"
        
    }
})

export default Login;