import React from "react";
import { StyleSheet, Pressable, Text } from "react-native";


const PressButton =(props)=> {
    return(
        <Pressable
        onPress={props.onPressFunction}
        android_ripple={{ color: "blue" }}
        style={({ pressed }) => [
            styles.button, { backgroundColor: pressed ? "#00ff00" : props.color },
        {...props.style, }
        ]}
      >
        <Text style={styles.text}>{props.title}</Text>
      </Pressable>
    )
}

const styles = StyleSheet.create({
    button:{
        width: 150,
        height: 50,
        borderRadius: 10,
        marginTop: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    text:{
        color:"#ffffff",
        fontSize: 20, 
        margin: 10,
        textAlign: "center"
    }
})

export default PressButton