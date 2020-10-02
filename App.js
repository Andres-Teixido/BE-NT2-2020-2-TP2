import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {TouchableOpacity, Button, StyleSheet, Text, View } from 'react-native';
import {vibrate} from './utils'
import Modo from "./components/modo";
import Digitos from "./components/digitos";
import Configuracion from "./components/config";

export default function App() {

  const [run, setRun] = useState(false);
  let [modo, setModo] = useState(' ');
  let [minutosCorto, setMinutosCorto] = useState(5);
  let [minutosLargo, setMinutosLargo] = useState(25);
  let minL=minutosLargo;
  let minC=minutosCorto;
  let [minutos, setMinutos] = useState(0);
  let [segundo1, setSegundo1] = useState(0);
  let [segundo2, setSegundo2] = useState(0);
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
            <Text style={styles.buttonText}>{"Reset/Reload"}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.buttonText}>__________________________________________________________________</Text>
        <Text style={styles.buttonText}>Configuración</Text>
        <Text style={styles.buttonText}>__________________________________________________________________</Text>

        <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={() => changeMinuto(1,minutosLargo,minutosCorto)}>
              <Text style={styles.buttonText}>{'+'}</Text>
              </TouchableOpacity>
              <Text style={styles.counterText}>{minutosLargo}</Text>
              <TouchableOpacity style={styles.button} onPress={() => changeMinuto(2,minutosLargo,minutosCorto)}>
              <Text style={styles.buttonText}>{'-'}</Text>
              </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={() => changeMinuto(3,minutosLargo,minutosCorto)}>
              <Text style={styles.buttonText}>{'+'}</Text>
              </TouchableOpacity>
              <Text style={styles.counterText}>{minutosCorto}</Text>
              <TouchableOpacity style={styles.button} onPress={() => changeMinuto(4,minutosLargo,minutosCorto)}>
              <Text style={styles.buttonText}>{'-'}</Text>
              </TouchableOpacity>
        </View>

      </View>
    </View>
  );

  function changeMinuto(caso){
    // console.log('caso = '+caso)
    switch(caso){
      case 1:
        minL = minL + 1;
      break;
      case 2:
        if(minL>0 && minL>minC){
          minL = minL - 1;
        }
      break;
      case 3:
        minC = minC + 1;
      break;
      case 4:
        if(minC>0){
          minC = minC - 1;
        }
      break;
    }
    setMinutosLargo(minutosLargo = minL);
    setMinutosCorto(minutosCorto = minC);
    // console.log('minL = ' + minL + ' minC = ' + minC);
    // console.log('minLargo = ' + minutosLargo + ' minCorto = ' + minutosCorto);
  }

  function startStopButton(){
    if(run==false){
      // Inicio el cronómetro
      setRun(true);
      cargoMinutos();
      setStartStopText("Stop");
      setTimer(setInterval(
        () =>{
          // console.log(minutos+":"+segundo1+segundo2);
          if(segundo2 > 0){
            segundo2 -= 1;
          }else{
            if(segundo1 > 0 || minutos > 0){
              segundo2 = 9;
              if(segundo1 > 0){
                segundo1 -= 1;
              }else{
                if(minutos > 0){
                  minutos -= 1;
                  segundo2 = 9;
                  segundo1 = 5;
                }
              }  
            }else{
              console.log("###   SWAP   ###")
              vibrate();
              swapModo();
              cargoMinutos();
            }
          }
          setMinutos(minutos);
          setSegundo1(segundo1);
          setSegundo2(segundo2);
        },1000
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
      setModo(modo = 'Corto');
    }else{
      setModo(modo = 'Largo');
    }
  }

  function cargoMinutos() {
    setSegundo1(0);
    setSegundo2(0);
    if(modo=='Corto'){
      console.log('Corto');
      setMinutos(minutos = minutosCorto);
    }else{
      setModo(modo = 'Largo');
      console.log('Largo');
      setMinutos(minutos = minutosLargo);
    }
  }

  function resetButton() {
    console.log("Reset")
    setRun(false);
    setModo(modo = ' ');
    setTimer(clearInterval)
    setStartStopText('Start')
    setTimer(null)
    cargoMinutos();
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
