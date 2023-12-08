import {View, Button, Text, Dimensions, ActivityIndicator} from "react-native";
import tw from 'twrnc';
import { CustomCard } from "../components/CustomCard/CustomCard";
import * as React from 'react';
import {useCallback, useEffect} from 'react';
import { useState } from "react";
import { firebaseConfig } from "../services/firebase";
import { collection, getFirestore, addDoc, getDocs, query, orderBy, getDoc, doc,setDoc } from 'firebase/firestore'
import { initializeApp } from "firebase/app";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";

// Realtime Database

import { getDatabase } from "firebase/database";
import { ref, set, onValue } from "firebase/database";

import { useCollectionData } from "react-firebase-hooks/firestore";

import { ScrollView } from "react-native";
import { useNavigation } from '@react-navigation/native';


const appFirebase = initializeApp(firebaseConfig)
//const database = getDatabase(appFirebase)
const db = getFirestore(appFirebase)

//Realtime Database

// const starCountRef = ref(database, 'posts/' + postId + '/starCount');
// onValue(starCountRef, (snapshot) => {
//   const data = snapshot.val();
//   updateStarCount(postElement, data);
// });

//email
import { useCookies } from "react-cookie";



function DetailsScreen({ navigation }) {

    const [dispositivos,setDispositivos]= useState([])
    const navigations = useNavigation()

  const showDevice = useCallback((dispositivo:string)=>{
      navigations.navigate('Device',{
          dispositivo
      })

  },[])
    useEffect(()=>{

        const getLista =async () => {


            const querySnapshot2 = await getDocs(collection(db, "a0"));

            const dispositivos = []
            querySnapshot2.forEach((doc) => {
                if (doc.id!=="b0"){
                    dispositivos.push(doc.id)

                }
            });
            setDispositivos(dispositivos)





        }
        getLista()
    },[])


    if(!dispositivos){
        return <View style={tw`flex-1 items-center justify-center`}>
            <ActivityIndicator size="large" color="#F08080" />
        </View>
    }

    return (
        <View style={tw`flex-1 bg-red-50`}>
            <View style={tw`flex flex-1 flex-row flex-wrap justify-center items-center py-4 `}>

                {
                    dispositivos && dispositivos.map(dispositivo=>(
                        <View style={tw`flex `}>
                            <View style={tw`px-2`}>
                                <Button
                                    onPress={()=>showDevice(dispositivo)}

                                    color="#F08080"
                                    title={dispositivo}/>
                            </View>




                        </View>
                    ))
                }
            </View>
            <View style={tw`flex flex-row justify-evenly w-full bg-[#F08080] py-2 `}>
                <Button
                    color="#F08080"
                    title="Estadisticas"
                    onPress={() => navigation.push('Details')}
                    style={tw`mb-2`}
                />

                <Button
                    color="#F08080"
                    title="Go to Home"
                    onPress={() => navigation.navigate('Home')}
                    style={tw`mb-2`}
                />
            </View>
        </View>
    );
}

//lista

//mostrar datos de los arreglos

export default DetailsScreen;