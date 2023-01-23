import { Alert, StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomButtons from "../utils/CustomButton"


export default function Home({navigation, route}) {

    const [name, setName] = useState('')
    const [number, setNumber] = useState("")

    useEffect(()=>{
       getData()
    }, [])

//function to read the name thats stored in async storage
const getData= ()=> {
    try {
        AsyncStorage.getItem("userData")
        .then(value =>{
            if(value != null) {
                let user= JSON.parse(value)
                setName(user.Name)
                setNumber(user.Number)
            }
        })
    } catch (error) {
       console.log(error) 
    }
}

const updateData= async()=>{
    if(name.length ===0) {
        Alert.alert("Warning!", "Input field cannot be empty")
    }else{
        try {
            let user={
                Name: name
            }
            await AsyncStorage.mergeItem("userData", JSON.stringify(user))  
            Alert.alert("Success!", "Your data has been updated")
            navigation.navigate("Home")
        } catch (error) {
            console.log(error)
        }
    }
}

const deleteData= async()=>{
   
        try {
            await AsyncStorage.removeItem("userName")  
           navigation.navigate("Login")   
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <View style={styles.body}>
      <Text style={styles.text}> Welcome Home {name}!</Text>
      <Text style={styles.text}> and your number is {number}</Text>

      <TextInput 
        style={styles.input} 
        placeholder="Update your Name"
        onChangeText={(value)=> setName(value)}
        value={name}
        
        />

        <CustomButtons  
        title="update"
        color="#ff7f00"
        onPressFunction={updateData}
        />


        <CustomButtons
        title="Delete"
        color="#ff7399"
        onPressFunction={deleteData} />
    </View>
  )
}

const styles = StyleSheet.create({
    body:{
        flex: 1,
        alignItems: "center",
        justifyContent:"center",
        backgroundColor: "#008099"
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