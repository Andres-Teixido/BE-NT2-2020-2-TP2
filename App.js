import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity, Button } from 'react-native';
import {vibrate} from './utils'
import Modo from "./components/modo";
// import Timer from "./components/timer";

export default function App() {

  const [run, setRun] = useState(false);

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     modo: 'Largo',
  //     run: false,
  //     timer: null,
  //     minutos: 0,
  //     minutosLargo: 25,
  //     minutosCorto: 5,
  //     segundos: 0,
  //     cent: 0,
  //     startStopText: 'Start',
  //   }
  //   this.startStopButton = this.startStopButton.bind(this);
  //   this.resetButton = this.resetButton.bind(this);
  // }
  
  // render() {
  return (

    <View style={styles.body}>
      <View style={styles.tContainer}>
        <Text style={styles.buttonText}>Cronómetro Pomodoro</Text>
        <Modo modo={this.state.modo}/>
        <Text style={styles.counterText}>
          {this.state.minutos} {this.state.segundos} {this.state.cent}
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={startStopButton}>
            <Text style={styles.buttonText}>{this.state.startStopText}</Text>
          </TouchableOpacity>
          <Button 
            title="Reset"
            onPress={resetButton}
            />
        </View>
      </View>
    </View>
  );

  function startStopButton() {
    if(!this.state.run){
      this.cargoMinutos();
    }
    if (this.state.timer == null){
      // Iniciar Crono
      this.state.startStopText = 'Stop';
      this.setState(this.state);

      this.state.timer = setInterval(() => {
        this.state.cent -= 1;
        if(this.state.cent < 0){
          if(this.state.segundos>0 || this.state.minutos>0){
            this.state.cent = 9;
            this.state.segundos -= 1;
            if(this.state.segundos == -1){
              if(this.state.minutos>0){
                this.state.segundos = 59;
                this.state.minutos -= 1;
                if(this.state.minutos == -1){
                  this.state.minutos = 0;
                }
              }
            }
          }else{
            // Esto causa que el teléfono vibre.
            vibrate();
            // Cambiar de cronómetro
            // this.swapTimer();
            this.state.run = false;
            this.swapModo();
            this.cargoMinutos();          
          }
        }
        this.setState(this.state);
      }, 100);
    }else{
      clearInterval(this.state.timer);
      this.state.timer = null;
      this.state.startStopText = 'Start';
      this.setState(this.state);
    }
  }

  function swapModo(){
    if(this.state.modo=='Largo'){
      this.state.modo = 'Corto';
    }else{
      this.state.modo = 'Largo';
    }
  }

  function cargoMinutos() {
    this.state.cent = 0;
    this.state.segundos = 0;
    if(this.state.modo=='Largo'){
      this.state.minutos = this.state.minutosLargo;
    }else{
      this.state.minutos = this.state.minutosCorto;      
    }
    this.state.run = true;
  }

  function resetButton() {
    setRun(false);
    // this.state.run = false;
    // this.state.modo = 'Largo';
    // clearInterval(this.state.timer);
    // this.state.startStopText = 'Start';
    // this.cargoMinutos();
    // this.state.timer = null;
    // this.setState(this.state);
  }

  // }
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
