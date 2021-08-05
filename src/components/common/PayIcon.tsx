import React from 'react';
import {ImageBackground, StyleSheet, Text} from "react-native";

const PayIcon = () => {
    return (
        <ImageBackground source={require("../../../assets/icons/pay.png")} style={Styles.container}>
            <Text style={Styles.text}>PRO</Text>
        </ImageBackground>
    );
};

const Styles = StyleSheet.create({
    container: {
        width: 90,
        height: 25,
        justifyContent: "center"
    },
    text: {
        fontSize: 14,
        fontWeight: "bold",
        color: "white",
        marginLeft: 16,
        textAlign: "center",
        textShadowColor: "#8c8c8c",
        textShadowOffset: { width: 1, height: -1 },
        textShadowRadius: 2
    }
})

export default PayIcon;