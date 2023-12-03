import * as React from 'react';
import { View, Text, Button,TextInput, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from "react"; 
import { firebaseConfig} from "../services/firebase";
import { collection, getFirestore, addDoc, getDocs, setDoc, doc } from 'firebase/firestore'
import { initializeApp } from "firebase/app";




//Real time database

import { database2 } from '../services/firebase Realtime';
import { getDatabase, child, get } from "firebase/database";
import { Suspense, useEffect } from "react";
import { onValue, ref } from "firebase/database";

//Envial Email

import email from 'react-native-email'

const appFirebase = initializeApp(firebaseConfig)
const db = getFirestore(appFirebase)

function HomeScreen({ navigation }) {

  //Realtime Database
  console.log(database2)

  const [projects, setProjects] = useState([]);

  // useEffect(() => {
    

  //   const query = ref(database2, "Enchufe1");
  //   return onValue(query, (snapshot) => {
  //     const data = snapshot.val();

  //     if (snapshot.exists()) {
  //       setProjects([])
  //       Object.values(data).map((project) => {
  //         setProjects((projects) => [...projects, project]);
  //       });
  //     }
  //   });
  // }, []);
  // console.log(projects)

  //Realtime Database

  const [buscarProductos, setBuscarProductos] = useState(false)

  const initialState = {
    nombre:'',
    consumoh:'',
    consumom:'',
    promedioh:'',
    promedio:''

}

const handleEmail = () => {
  const to = ['tiaan@email.com', 'foo@bar.com'] // string or array of email addresses
  email(to, {
      // Optional additional arguments
      cc: ['bazzy@moo.com', 'doooo@daaa.com'], // string or array of email addresses
      bcc: 'mee@mee.com', // string or array of email addresses
      subject: 'Show how to use',
      body: 'Some body right here'
  }).catch(console.error)
}
const [state, setState] = useState(initialState)

const handleChangeText = (value, name)=> {
    setState({...state, [name]:value})

}

const saveProduct =async() => {
    console.log(state)

    try{
        setBuscarProductos(true)
        //const cityRef = doc(db, '/a0/b0/84:CC:A8:82:42:03', 'ReleSensor');
        await setDoc(doc(db, "b0","84:0D:8E:A8:25:CE"), {
          Sensor: 'A',
        });
        //await addDoc(collection(db, 'Dispositivos'),{...state})

    }
    catch{
        console.error('error');
        

    }setBuscarProductos(false)
  }
    
    const saveProduct2 =async() => {
      console.log(state)
  
      try{
          setBuscarProductos(true)
          //const cityRef = doc(db, '/a0/b0/84:CC:A8:82:42:03', 'ReleSensor');
          await setDoc(doc(db, "b0","84:0D:8E:A8:25:CE"), {
            Sensor: 'B',
          });
          //await addDoc(collection(db, 'Dispositivos'),{...state})
  
      }
      catch{
          console.error('error');
          
  
      }
      setBuscarProductos(false)

      
}
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text></Text>
      <View>
        {/* <TextInput/> */}
                {/* <TextInput 
                    placeholder="Nombre"
                    onChangeText={(value)=>handleChangeText(value,'nombre')}
                    style = {styles.input}
                    value={state.nombre}
                />
                <TextInput 
                    placeholder="Consumo 15 h"
                    onChangeText={(value)=>handleChangeText(value,'consumoh')}
                    style = {styles.input}
                    value={state.consumoh}
                />
                <TextInput 
                    placeholder="Consumo Mensual"
                    onChangeText={(value)=>handleChangeText(value,'consumom')}
                    style = {styles.input}
                    value={state.consumom}
                />
                <TextInput 
                    placeholder="Promedio"
                    onChangeText={(value)=>handleChangeText(value,'promedioh')}
                    style = {styles.input}
                    value={state.promedioh}
                />
                <TextInput 
                    placeholder="Promedio Hora"
                    onChangeText={(value)=>handleChangeText(value,'promedio')}
                    style = {styles.input}
                    value={state.promedio}
                /> */}
            </View>
            <Button color="#F08080" title="Encender"
                onPress = {saveProduct}
            />
            <Button color="#F08080" title="Apagar"
                onPress = {saveProduct2}
            />

            <View style={styles.container}>
                <Button title="Send Mail" onPress={handleEmail} />
            </View>
      <Button color="#F08080"
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      <Button color="#F08080"
        title="Go to Login"
        onPress={() => navigation.navigate('Login')}
      />
    </View>
  );

  
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
}
});

export default HomeScreen;