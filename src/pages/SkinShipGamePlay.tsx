import React from 'react';
import {Platform, SafeAreaView, StyleSheet, Text, View} from "react-native";
import Container from "../components/common/Container";
import WheelRouletteSmall from "../components/common/WheelRouletteSmall";
import SkinShipGamePlayComp from "../components/gameplay/SkinShipGamePlay.comp";
import {Header} from "react-native-elements";
import { Ionicons } from '@expo/vector-icons';
import {StackNavigationProp} from "@react-navigation/stack";
import {GameInitParam} from "../libraries/types/PageTypes";

interface SkinShipGamePlayProps {
    navigation: StackNavigationProp<GameInitParam>
}

const SkinShipGamePlay = ({ navigation }: SkinShipGamePlayProps) => {
    return (
        <Container style={{backgroundColor: "#691F99"}}>
            <View style={Styles.containerInner}>
                <SkinShipGamePlayComp navigation={navigation}/>
            </View>
        </Container>
    );
};

const Styles = StyleSheet.create({
    containerInner: {
        flex: 1,
        margin: 24,
        borderRadius: 16,
        backgroundColor: "#BB6BC7"
    },
})

export default SkinShipGamePlay;