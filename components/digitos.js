import React from "react";
import { StyleSheet, Text, View } from 'react-native';

export default ({minutos,segundo1,segundo2}) =>{
    return (
            <Text style={styles.simpleText}>{minutos}:{segundo1}{segundo2}</Text>
    )
}

const styles = StyleSheet.create({
    simpleText: {
        color: '#fff'
    }
})