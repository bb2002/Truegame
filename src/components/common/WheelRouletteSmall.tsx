import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet, Text, View} from "react-native";
import {sleep} from "../../libraries/Utils";

interface WheelRouletteSmallProps {
    strings: string[]
    rolling: boolean,
    duration: number,
    ignoreIndex?: number
    onItemSelected: (value: string, index: number) => void
}

const WheelRouletteSmall = ({ strings, rolling, duration, ignoreIndex, onItemSelected }: WheelRouletteSmallProps) => {
    const currentPos = useRef(new Animated.Value(0)).current

    useEffect(() => {
        if(rolling) {
            // 당첨자 선출
            let target = 0;
            while(true){
                target = Math.floor(Math.random() * (strings.length))
                if(ignoreIndex === undefined) break
                if(ignoreIndex !== target) break
            }

            Animated.timing(currentPos, {
                toValue: -(54 * target + 54 * strings.length),
                duration: duration,
                useNativeDriver: true
            }).start()

            onItemSelected(strings[target], target)
        } else {
            Animated.timing(currentPos, {
                toValue: 0,
                duration: duration,
                useNativeDriver: true
            }).start()
        }
    }, [rolling, ignoreIndex])

    return (
        <View style={Styles.container}>
            <Animated.View
                style={{
                    height: 54,
                    transform: [
                        {
                            translateY: currentPos
                        }
                    ]
                }}>
                {
                    [...strings, ...strings].reverse().map((value, index) =>
                        <View style={Styles.textContainer} key={index}>
                            <Text style={Styles.text}>{value}</Text>
                        </View>
                    )
                }
            </Animated.View>
        </View>
    );
};

const Styles = StyleSheet.create({
    container: {
        height: 54,
        backgroundColor: "#FC512C",
        borderRadius: 8,
        overflow: "hidden"
    },
    textContainer: {
        height: 54,
        alignItems: "center",
        justifyContent: "center"
    },
    text: {
        textAlign: "center",
        fontSize: 20,
        color: "white",
        fontWeight: "bold",
        fontFamily: 'netmarbleB'
    }
})

WheelRouletteSmall.defaultProps = {
    onItemSelected: (value: string, index: number) => {}
}

export default WheelRouletteSmall;