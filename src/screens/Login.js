import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, TextInput, Alert, AppRegistry } from "react-native";
//import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomButtons from "../../utils/CustomButton"
import SQLite from "react-native-sqlite-storage";
import {useSelector, useDispatch} from "react-redux";
import { setName, setNumber } from "../Redux/actions";




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



function Login({navigation}) {

    const {name, number} = useSelector(state=>state.userReducer)
    const dispatch= useDispatch()


    //const [name, setName] = useState("")
    //const [number, setNumber] = useState("")



    useEffect(()=>{
        createTable()
        getData()
     }, [])



     //function to crete database table
    const createTable=()=>{
        db.transaction((tx)=> {
            tx.executeSql(
                'INSERT TABLE IF NOT EXIST '
                + "Users "
                +"(ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Number INTEGER)"
            )
        })
    }



 
 //function to read the name thats stored in async storage
 const getData= ()=> {
     try {
        //  AsyncStorage.getItem("userData")
        //  .then(value =>{
        //      if(value != null) {
        //         navigation.navigate("Home")
        //      }
        //  })
        db.transaction((tx)=>{
            tx.executeSql(
                "SELECT Name, Number FROM Users",
                [],
                (tx, result)=> {
                    let len =result.rows.length
                    if(len > 0) {
                       navigation.navigate("Home")
                    }
                }
            )
        })
     } catch (error) {
        console.log(error) 
     }
 }


    

    const setData= async()=>{
        if(name.length ==0 || number.length==0) {
            Alert.alert("Warning!", "Input field cannot be empty")
        }else{
            try {
                dispatch(setName(name));
                dispatch(setNumber(number));
            //     let user={
            //         Name: name,
            //         Number:number
            //     }
               // await AsyncStorage.setItem("userData", JSON.stringify(user))  
              await db.transaction(async(tx)=>{

                    // await  tx.executeSql(
                    //         "INSERT INTO Users (Name, Number) VALUES (' " +name +" ' " + number + ")"
                    //     )

                    await tx.executeSql(
                        'INSERT INTO Users (Name, Number) VALUES (?, ?',
                        [name, number]
                    )
               })
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
                 source={require('../../assets/logo-red.png')}/>
                 <Text style={styles.text}>Async Storage</Text>
                 
                   <TextInput 
                      style={styles.input} 
                      placeholder="Enter your Name"
                      onChangeText={(value)=>dispatch(setName(name))}
                      />

                    <TextInput 
                      style={styles.input} 
                      placeholder="Enter your number"
                      keyboardType="numeric"
                      onChangeText={(value)=> dispatch(setNumber(number))}
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
       margin: 20
      
       
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