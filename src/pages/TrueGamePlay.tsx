import React from 'react';
import {SafeAreaView, StyleSheet, Platform, View, Text} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import TrueGamePlayComp from "../components/gameplay/TrueGamePlay.comp";
import {Header} from "react-native-elements";
import {StackNavigationProp} from "@react-navigation/stack";
import {GameInitParam} from "../libraries/types/PageTypes";

interface TrueGamePlayProps {
    navigation: StackNavigationProp<GameInitParam>
}

const TrueGamePlay = ({ navigation }: TrueGamePlayProps) => {
    return (
        <SafeAreaView style={Styles.container}>
            <TrueGamePlayComp navigation={navigation}/>
        </SafeAreaView>

    );
};

const Styles = StyleSheet.create({
    container: {
        height: "100%"
    }
})

export default TrueGamePlay;