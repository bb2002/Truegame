import React from 'react';
import {Gender, PlayerItem} from "../../libraries/types/Types";
import {ScrollView, StyleSheet, Text} from "react-native";
import PlayerInputCont from "../common/PlayerInputCont";
import {Button} from "react-native-elements";
import {AntDesign} from "@expo/vector-icons";
import Toast from 'react-native-root-toast';
import useGameInit from "../../hooks/useGameInit";

const PlayerInitComp = () => {
    const { gameInit, setPlayers } = useGameInit()

    const onPlayerSettingChanged = (form: PlayerItem) => {
        const tmp = [...gameInit.players]

        for(let i = 0; i < tmp.length; ++i) {
            if(tmp[i].index === form.index) {
                tmp[i] = form
            }
        }

        setPlayers(tmp)
    }

    const onDeletePressed = (form: PlayerItem) => {
        const tmp = gameInit.players.filter((pi) => pi.index !== form.index)
        setPlayers(tmp)
    }

    return (
        <ScrollView style={Styles.playerListContainer}>
            {
                gameInit.players.length === 0 ? (
                    <Text style={{ textAlign: "center", fontSize: 12, color: "gray", marginTop: 16 }}>
                        '+' 버튼을 눌러 새로운 사용자를 추가하세요!
                    </Text>
                ) : (
                    gameInit.players.map((value) => (
                        <PlayerInputCont
                            form={value}
                            setForm={onPlayerSettingChanged}
                            key={value.index}
                            onDeletePressed={() => onDeletePressed(value)} />
                    ))
                )

            }
            <Button
                type="clear"
                icon={<AntDesign name="plus" size={24} color="#2288DD" />}
                onPress={() => {
                    if(gameInit.players.length + 1 >= 16) {
                        Toast.show("최대 15명 까지 추가 할 수 있습니다.")
                    } else {
                        setPlayers([...gameInit.players,
                            {
                                playerName: `플레이어 ${gameInit.players.length + 1}`,
                                playerGender: Gender.MEN,
                                index: gameInit.players.length
                            }
                        ])
                    }

                }} />
        </ScrollView>
    );
};

const Styles = StyleSheet.create({
    playerListContainer: {
        flex: 1
    }
})

export default PlayerInitComp;