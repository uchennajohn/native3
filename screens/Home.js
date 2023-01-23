import { Alert, StyleSheet, Text, View, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CustomButtons from "../utils/CustomButton"

import SQLite from "react-native-sqlite-storage";




//open or create the SQlite database
const db = SQLite.openDatabase(
    {
        name: "MainDb",
        location: "default"
    },
    ()=> {
        console.log("successfully connected to Database")
    }, (error)=>{console.log(error) 
    })


export default function Home({navigation, route}) {

    const [name, setName] = useState('')
    const [number, setNumber] = useState("")

    useEffect(()=>{
       getData()
    }, [])

//function to read the name thats stored in async storage
const getData= ()=> {
    try {
        // AsyncStorage.getItem("userData")
        // .then(value =>{
        //     if(value != null) {
        //         let user= JSON.parse(value)
        //         setName(user.Name)
        //         setNumber(user.Number)
        //     }
        // })

        db.transaction((tx)=>{
            tx.executeSql(
                "SELECT Name, Number FROM Users",
                [],
                (tx, result)=> {
                    let len =result.rows.length
                    if(len > 0) {
                        console.log('succesfully  logged in')
                        let userName = result.rows.item(0).Name;
                        let userNumber = result.rows.item(0).Number
                        setName(userName)
                        setNumber(userNumber)
                    }
                }
            )
        })
    } catch (error) {
       console.log(error) 
    }
}

//function to update data
const updateData= async()=>{
    if(name.length ===0) {
        Alert.alert("Warning!", "Input field cannot be empty")
    }else{
        try {
            let user={
                Name: name
            }
          //  await AsyncStorage.mergeItem("userData", JSON.stringify(user))  
          db.transaction((tx)=>{
            tx.executeSql(
                "UPDATE Users SET Name=?",
                [name],
                ()=>{
                   Alert.alert("Success!", "Your data has been updated")
                },
                error =>{
                    console.log(error)}
            )
          })
            Alert.alert("Success!", "Your data has been updated")
            navigation.navigate("Home")
        } catch (error) {
            console.log(error)
        }
    }
}

const deleteData= async()=>{
   
        try {
          //  await AsyncStorage.removeItem("userName")  
          db.transaction((tx)=>{
            tx.executeSql(
                "DELETE FROM Users",       //WHERE ID = 1 --- this can use to limit the  delete to a particular id/row
                [],
                ()=>{navigation.navigate("Login") },
                error=>{console.log(error)}
                )
          })
          // navigation.navigate("Login")   
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