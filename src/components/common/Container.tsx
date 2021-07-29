import React from 'react';
import {Platform, SafeAreaView, StatusBar, StyleSheet, View} from "react-native";

const Container = ({ children, style }: any) => {
    return (
        <SafeAreaView style={{...Styles.container, ...style}}>
            { children }
        </SafeAreaView>
    );
};

const Styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

export default Container;