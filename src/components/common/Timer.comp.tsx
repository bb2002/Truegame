import React, {useEffect, useState} from 'react';
import {StyleSheet, TouchableOpacity, View, Text, Vibration} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import useInterval from "../../hooks/useInterval";

interface TimerCompProps {
    time: number
    color: string
}

const TimerComp = ({ time, color }: TimerCompProps) => {
    const [sTime, setSTime] = useState(time)
    const [running, setRunning] = useState(false)

    const PATTERN = [1000, 2000, 1000, 2000]

    useInterval(() => {
        if(running) {
            if(sTime - 1 === 0) {
                setSTime(0)
                setRunning(false)
                Vibration.vibrate(PATTERN, false)
            } else {
                setSTime(sTime - 1)
            }
        }

    }, 1000)


    return (
        <TouchableOpacity onPress={() => {
            if(sTime > 0) {
                setRunning(!running)
            }
        }}>
            <View style={Styles.container}>
                <Ionicons name="timer" size={36} color={color} />
                <Text style={{ color: color, fontSize: 24 }}>{sTime} 초</Text>
            </View>
        </TouchableOpacity>
    );
};

const Styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        padding: 16
    }
})

export default TimerComp;