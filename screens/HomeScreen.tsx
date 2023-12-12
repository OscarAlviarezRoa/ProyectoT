import * as React from 'react';
import {View, Text, Button, TextInput, StyleSheet, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useState } from "react"; 
import { firebaseConfig} from "../services/firebase";
import { collection, getFirestore, addDoc, getDocs, setDoc, doc } from 'firebase/firestore'
import { initializeApp } from "firebase/app";
import ImageHome from '../assets/home.jpeg'
import tw from 'twrnc';


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


  return (
    <View style={styles.container}>
        <Text style={tw`text-2xl sm:text-md text-gray-600 pt-2 px-2`}>Sistema de control de dispositivos electronicos</Text>
      <View >
          <Image style={styles.imagen} source={ImageHome}/>
          <Button color="#7ACFFF"
                  title="Informe general"
                  onPress={() => {
                      console.log("Intentando navegar a DetailScreen");
                      navigation.navigate('Detail');
                  }}
          />
      </View>




        <View style={tw` flex flex-row justify-evenly w-full bg-[#7ACFFF] py-2 `}>
            <Button color="#7ACFFF"
                    title="Control de dispositivos"
                    onPress={() => navigation.navigate('Details')}
            />
            <Button color="#7ACFFF"
                    title="Go to Login"
                    onPress={() => navigation.navigate('Login')}
            />
        </View>
    </View>
  );



}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    imagen: {
        width: 400,
        height: 400,
        resizeMode: 'cover',
    },
});
export default HomeScreen;