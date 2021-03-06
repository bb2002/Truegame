import React from 'react';
import {StyleSheet, View} from "react-native";
import {AntDesign} from '@expo/vector-icons';
import Container from "../components/common/Container";
import {Button} from "react-native-elements";
import PlayerInitComp from "../components/gameinit/PlayerInit.comp";
import useGameInit from "../hooks/useGameInit";
import LevelInitComp from "../components/gameinit/LevelInit.comp";
import {StackNavigationProp} from "@react-navigation/stack";
import {GameInitParam} from "../libraries/types/PageTypes";
import { useFonts } from 'expo-font';

interface GameInitProps {
    navigation: StackNavigationProp<GameInitParam>
}

const GameInit = ({ navigation }: GameInitProps) => {
    const { gameInit, setGamePage } = useGameInit()

    return (
        <View style={{ flex: 1 }}>
            <Container style={Styles.containerOuter}>
                <View style={Styles.containerInner}>
                    {
                        gameInit.page === 0 && (
                            <PlayerInitComp />
                        )
                    }

                    {
                        gameInit.page === 1 && (
                            <LevelInitComp
                                navigation={navigation}/>
                        )
                    }

                    {
                        function() {
                            if(gameInit.page === 0) {
                                if(gameInit.players.length >= 2) {
                                    return <Button
                                        title="레벨 선택"
                                        type="clear"
                                        titleStyle={{fontFamily: 'netmarbleM'}}
                                        onPress={() => setGamePage(1)}
                                        icon={<AntDesign name="staro" size={18} color="#2288DD" />}
                                    />
                                }
                            }
                        }()
                    }
                </View>
            </Container>
        </View>
    );
};

const Styles = StyleSheet.create({
    containerOuter: {
        backgroundColor: "#f1c40f"
    },
    containerInner: {
        flex: 1,
        margin: 24,
        backgroundColor: "#ffffff",
        borderRadius: 16
    }
})

export default GameInit;