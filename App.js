import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {TouchableOpacity, Button, StyleSheet, Text, View } from 'react-native';
import {vibrate} from './utils'
import Modo from "./components/modo";
import Digitos from "./components/digitos";

export default function App() {

  const [run, setRun] = useState(false);
  const [modo, setModo] = useState("Largo");
  let min;
  let [minutos, setMinutos] = useState(2);
  let seg1;
  let [segundo1, setSegundo1] = useState(0);
  let seg2;
  let [segundo2, setSegundo2] = useState(0);
  let dec;
  let [decimas, setDecimas] = useState(0);
  const [startStopText, setStartStopText] = useState('Start');
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    // console.log("Hola .... aqui inicia mi componente!")
  })

  return (
    <View style={styles.body}>
      <View style={styles.tContainer}>
        <Text style={styles.buttonText}>Cronómetro Pomodoro</Text>
        <Modo modo={modo}/>
        <Text style={styles.counterText}> 
          <Digitos 
            minutos={minutos}
            segundo1={segundo1}
            segundo2={segundo2}
          />
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={startStopButton}>
            <Text style={styles.buttonText}>{startStopText}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={resetButton}>
            <Text style={styles.buttonText}>{"Reset"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  );

  function startStopButton(){
    if(run==false){
      // Inicio el cronómetro
      setRun(true)
      setStartStopText("Stop");
      // dec = decimas;
      // min = minutos;
      // seg1 = segundo1;
      // seg2 = segundo2;
      // console.log(min+":"+seg+":"+dec);
      setTimer(setInterval(
        () =>{
          // dec = dec - 1;
          console.log(minutos+":"+segundo1+segundo2);
          // segundo2 -= 1;
          if(segundo2 > 0){
            segundo2 -= 1;
          }else{
            if(segundo1 > 0 || minutos > 0){
              segundo2 = 9;
              if(segundo1 > 0){
                // console.log("SEGUNDO1 > 0")
                segundo1 -= 1;
              }else{
                if(minutos > 0){
                  // console.log("Minutos > 0")
                  minutos -= 1;
                  segundo2 = 9;
                  segundo1 = 5;
                }
              }  
            }else{
              console.log("###   FIN   ###")
              setStartStopText("Start");
              setRun(false);
              setTimer(clearInterval);
            }
          }
          setMinutos(minutos);
          setSegundo1(segundo1);
          setSegundo2(segundo2);
        },100
      ));
    }else{
      // Stop cronómetro
      setStartStopText("Start");
      setRun(false);
      setTimer(clearInterval)
    }
  }

  function swapModo(){
    if(modo=='Largo'){
      setModo('Corto');
    }else{
      setModo('Largo');
    }
  }

  function cargoMinutos() {
    setSegundo1(0);
    setSegundo2(0);
    if(modo=='Largo'){
      setMinutos(25);
    }else{
      serMinutos(5);      
    }
    setRun(false);
  }

  function resetButton() {
    console.log("Reset")
    setRun(false);
    setModo('Largo');
    setTimer(clearInterval)
    setStartStopText('Start')
    setTimer(null)
    cargoMinutos();
    // this.setState(this.state);
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
});
