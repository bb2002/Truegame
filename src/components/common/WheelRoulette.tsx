import React, {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, View} from "react-native";
import {PlayerItem} from "../../libraries/types/Types";
import { AntDesign } from '@expo/vector-icons';
import WheelRouletteItem from "./WheelRouletteItem";
import {sleep} from "../../libraries/Utils";

interface WheelRouletteProps {
    players: PlayerItem[]
    rolling: boolean
    freeRotateNum: number       // 무료하게 도는 거리
    duration: number            // 도는 시간
    containerStyle: any
    onPlayerSelected: (player: PlayerItem) => void
}



const WheelRoulette = ({ players, freeRotateNum, duration, rolling, containerStyle, onPlayerSelected }: WheelRouletteProps) => {
    const [rollPaper, setRollPaper] = useState<PlayerItem[]>([])

    const topDown = -(players.length * freeRotateNum * 60) + 120
    const currentPos = useRef(new Animated.Value(topDown)).current

    useEffect(() => {
        // 롤지를 생성합니다.
        const tmp = [] as PlayerItem[]

        for(let i = 0; i < freeRotateNum; ++i) {
            tmp.push(...players)
        }

        setRollPaper(tmp)
    }, [freeRotateNum, players])

    useEffect(() => {
        if(rolling) {
            const target = Math.floor(Math.random() * (players.length))

            Animated.timing(currentPos, {
                toValue: topDown + ((rollPaper.length - 1) * 60) - (target * 60),
                duration: duration,
                useNativeDriver: true
            }).start()


            sleep(duration).then(() => {
                onPlayerSelected(players[target])
            })

        } else {
            Animated.timing(currentPos, {
                toValue: topDown,
                duration: 1000,
                useNativeDriver: true
            }).start()
        }
    }, [rolling])

    return (
        <View style={{...Styles.container, ...containerStyle}}>
            <View style={Styles.arrow}>
                <AntDesign name="caretright" size={24} color="black" />
                <View style={{ flex: 1 }} />
                <AntDesign name="caretleft" size={24} color="black" />
            </View>
            <Animated.View
                style={{
                    width: "100%",
                    height: 180,
                    transform: [
                        {
                            translateY: currentPos
                        }
                    ]
                }}>
                {
                    rollPaper.map((value, index) => <WheelRouletteItem player={value} key={index} />)
                }
            </Animated.View>
        </View>
    );
};

WheelRoulette.defaultProps = {
    freeRotateNum: 2,
    duration: 1000,
    containerStyle: {}
}

const Styles = StyleSheet.create({
    container: {
        overflow: "hidden",
        backgroundColor: "white"
    },
    arrow: {
        position: "absolute",
        width: "100%",
        height: 60,
        top: 60,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 1,
        borderTopWidth: 1,
        borderBottomColor: "#b4b4b4",
        borderTopColor: "#b4b4b4"
    }
})

export default WheelRoulette;