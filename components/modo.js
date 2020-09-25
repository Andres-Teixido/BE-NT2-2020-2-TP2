import React from "react";
import { StyleSheet, Text, View } from 'react-native';

export default ({modo}) =>{
    return (
        <View>
            <Text style={styles.simpleText}>{modo}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    simpleText: {
        color: '#fff'
    }
})