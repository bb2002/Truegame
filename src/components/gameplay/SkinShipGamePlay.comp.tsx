import React, {useState} from 'react';
import WheelRouletteSmall from "../common/WheelRouletteSmall";
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {AntDesign, Ionicons} from '@expo/vector-icons';
import useGameInit from "../../hooks/useGameInit";
import {StackNavigationProp} from "@react-navigation/stack";
import {GameInitParam} from "../../libraries/types/PageTypes";

interface SkinShipGamePlayCompProps {
    navigation: StackNavigationProp<GameInitParam>
}

const SkinShipGamePlayComp = ({ navigation }: SkinShipGamePlayCompProps) => {
    const { gameInit } = useGameInit()
    const [rolling, setRolling] = useState(false)
    const [ignoreIndex, setIgnoreIndex] = useState(-1)

    return (
        <View style={Styles.container}>
            <Ionicons name="arrow-back" size={32} color="white" onPress={() => {
                navigation.goBack()
            }}/>

            <WheelRouletteSmall
                rolling={rolling}
                strings={gameInit.players.map(value => value.playerName)}
                duration={1500}
                onItemSelected={(value, index) => setIgnoreIndex(index)}
                />
            <Text style={Styles.textOfConst}>님이</Text>
            <WheelRouletteSmall
                rolling={rolling && ignoreIndex !== -1}
                strings={gameInit.players.map(value => value.playerName)}
                duration={1500}
                ignoreIndex={ignoreIndex}/>
            <Text style={Styles.textOfConst}>님의</Text>
            <WheelRouletteSmall
                rolling={rolling}
                strings={["볼", "다리", "발", "머리", "어깨", "무릎"]}
                duration={1500} />
            <Text style={Styles.textOfConst}>에</Text>
            <WheelRouletteSmall
                rolling={rolling}
                strings={["키스하기", "핥기"]}
                duration={1500} />
            <TouchableOpacity style={{
                marginLeft: "auto",
                marginRight: "auto",
                marginTop: 64 }}
                              onPress={() => {
                                  setRolling(!rolling)
                                  setIgnoreIndex(-1)
                              }}>
                {
                    rolling ? (
                        <AntDesign name="back" size={24} color="white" />
                    ) : (

                        <ImageBackground
                            source={require("../../../assets/icons/level_skinship_icon.png")}
                            style={{
                                width: 96,
                                height: 96,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                            <Text style={{
                                fontSize: 24,
                                color: "white",
                                fontWeight: "bold",
                                backgroundColor: "#691F99"
                            }}>클릭</Text>
                        </ImageBackground>
                    )
                }
            </TouchableOpacity>

        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        padding: 16
    },
    textOfConst: {
        fontSize: 24,
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        marginVertical: 16
    }
})

export default SkinShipGamePlayComp;