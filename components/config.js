import React from "react";
import {TouchableOpacity, StyleSheet, Text, View } from 'react-native';

export default ({run,minutosCorto, minutosLargo,fun1,fun2,fun3,fun4}) =>{

    if(!run){
        return (
            <View style={styles.body}>
            <View style={styles.tContainer}>
                <Text style={styles.buttonText}>__________________________________________________________________</Text>
                <Text style={styles.buttonText}>Configuración</Text>
                <Text style={styles.buttonText}>__________________________________________________________________</Text>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={fun1}>
                    <Text style={styles.buttonText}>{'+'}</Text>
                  </TouchableOpacity>
                  <Text style={styles.counterText}>{minutosLargo}</Text>
                  <TouchableOpacity style={styles.button} onPress={fun2}>
                    <Text style={styles.buttonText}>{'-'}</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={fun3}>
                    <Text style={styles.buttonText}>{'+'}</Text>
                  </TouchableOpacity>
                  <Text style={styles.counterText}>{minutosCorto}</Text>
                  <TouchableOpacity style={styles.button} onPress={fun4}>
                    <Text style={styles.buttonText}>{'-'}</Text>
                  </TouchableOpacity>
                </View>

            </View>
          </View>
        )
    }else{
        return false;
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
      tContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonContainer: {
        flexDirection: 'row',
        padding: 20,
      },
      button: {
        backgroundColor: '#331DF4',
        marginHorizontal: 15,
        height: 40,
        justifyContent: 'center',
        width: 75,
        alignItems: 'center',
      },
      buttonText: {
        color: '#fff'
      },
      body: {
        flex: 1,
        backgroundColor: '#221D41',
        justifyContent: 'center',
      },
      counterText: {
        color: '#fff',
        fontSize: 40,
        fontWeight: 'bold',
      }
})