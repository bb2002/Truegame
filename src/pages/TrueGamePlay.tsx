import React from 'react';
import {SafeAreaView, StyleSheet, Platform} from "react-native";
import WheelRoulette from "../components/common/WheelRoulette";
import TrueGamePlayComp from "../components/gameplay/TrueGamePlay.comp";


const TrueGamePlay = () => {
    return (
        <SafeAreaView style={Styles.container}>
            <TrueGamePlayComp />
        </SafeAreaView>
    );
};

const Styles = StyleSheet.create({
    container: {
        paddingTop: Platform.OS === "android" ? 24 : 0,
        height: "100%"
    }
})

export default TrueGamePlay;