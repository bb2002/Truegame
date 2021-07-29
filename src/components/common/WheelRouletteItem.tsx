import React, {useEffect} from 'react';
import {PlayerItem} from "../../libraries/types/Types";
import {View, Text, StyleSheet} from "react-native";

interface WheelRouletteItemProps {
    player: PlayerItem
}

const WheelRouletteItem = ({ player }: WheelRouletteItemProps) => {


    return (
        <View style={Styles.container}>
            <Text style={Styles.text}>{player.playerName}</Text>
        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 60,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontSize: 18,
        fontWeight: "bold",
        color: "black"
    }
})

export default WheelRouletteItem;