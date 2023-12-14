import {View, Button, Text, Dimensions, ActivityIndicator, TextInput, StyleSheet} from "react-native";
import tw from 'twrnc';
import { CustomCard } from "../components/CustomCard/CustomCard";
import * as React from 'react';
import {ChangeEvent, useCallback, useEffect} from 'react';
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
import {useRoute} from "@react-navigation/native";



function DeviceScreen({ navigation }) {

    //email
    const router = useRoute()
    const dispositivo = router.params.dispositivo

    const [dispositivoState ,setDispositivoState] = useState(router.params.dispositivo)
    const [isLoading,setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        setDispositivoState(dispositivo)
        setLista(null)
    }, [dispositivo]);
    const [lista,setLista] = useState<Array<{card:{}, graph:[], dispositivoId:string | number}> | null>(null)



    const [inputAlias,setInputAlias ] = useState()
    const handlerAlias = useCallback((text)=>{
        setInputAlias(text)
    },[])




    useEffect(()=>{

        const getLista =async () => {

            try{
                let resultadosLista = []


                const query =  await getDocs(collection(db, "a0", "b0",dispositivoState))
                console.log(dispositivoState)
                let docs = []
                query.forEach((doc)=>{
                    const {IP,IRMS,Potencia,Caudal,Volumen,Consumo,myDouble3} = doc.data()
                    docs.push({
                        Caudal,
                        Volumen,
                        Consumo,
                        IP,
                        IRMS,
                        Potencia,
                        myDouble3,
                    })
                })

                const resultado = [docs.reduce((acum,item)=>{
                    if(item.myDouble3>acum.myDouble3){
                        acum = item
                    }
                    return acum
                },docs[0])]



                const sortValues = docs.sort((a,b)=> b.myDouble3-a.myDouble3).slice(0,10)

                const sortValues2 = sortValues.sort((a,b)=> a.myDouble3-b.myDouble3)
                resultadosLista.push({
                    card:resultado[0],
                    graph: sortValues2,
                    dispositivoId:dispositivo
                })
                setLista(resultadosLista)











            }catch(error){
                console.log(error)
            }

        }
        const intervalId = setInterval(() => getLista(), 5000);

        return () => {
            // Limpia el intervalo al desmontar el componente
            clearInterval(intervalId);
        };
    },[])
    const OnButton = useCallback(async (dispositivo)=>{
        await setDoc(doc(db, "b0",dispositivo), {
            Sensor: 'A',
        });
    },[])
    const OffButton = useCallback(async (dispositivo)=>{
        await setDoc(doc(db, "b0",dispositivo), {
            Sensor: 'B',
        });
    },[])

    if(!lista || isLoading){
        return <View style={tw`flex-1 items-center justify-center`}>
            <ActivityIndicator size="large" color="#7ACFFF" />
        </View>
    }

    return (
        <View style={tw`flex-1 bg-[#F7F7F7]`}>
            <View style={tw`flex flex-1 flex-row justify-center items-center py-4 `}>
                <ScrollView>
                    {lista && lista.map(({card,graph,dispositivoId},index)=>
                        <View key={index}>
                            <View style={tw`flex flex-row  justify-evenly py-2`}>
                                <View style={tw`flex flex-row justify-evenly`}>
                                    <View>
                                        <View style={tw`py-2 px-4`}>
                                            <Button  color="#7ACFFF" title="Encender"
                                                     onPress = {()=>OnButton(dispositivoId)}
                                            />
                                        </View>

                                        <View style={tw`py-2 px-4`}>
                                            <Button color="#7ACFFF" title="Apagar"
                                                    onPress = {()=>OffButton(dispositivoId)}
                                            />
                                        </View>
                                    </View>


                                    <CustomCard key={index} device={card.nombre} title='Lectura' date={new Date()} total={card.myDouble3} consumes={[
                                        {
                                            title:'Corriente PEAK',
                                            readValue: card.IP,
                                            isPositive: true,

                                        },
                                        {
                                            title:'Corriente (S)',
                                            readValue:card.IRMS,
                                            isPositive: true,
                                        },
                                        {
                                            title:'Potencia (W)',
                                            readValue:card.Potencia,
                                            isPositive: null,
                                        },
                                        {
                                            title:'Numero de Medicion',
                                            readValue:card.myDouble3,
                                            isPositive: null,
                                        }
                                    ]




                                    }/>
                                </View>

                            </View>
                            <View style={tw`items-center`}>
                            <LineChart
                                data={{
                                    labels: graph.map(item=>item.myDouble3),
                                    datasets: [
                                        {
                                            data: graph.map(item=>item.IRMS)
                                        }
                                    ]
                                }}
                                width={360} // from react-native
                                height={220}
                                yAxisLabel=""
                                yAxisSuffix="mA"
                                yAxisInterval={1} // optional, defaults to 1
                                chartConfig={{
                                    backgroundColor: "white",
                                    backgroundGradientFrom: "white",
                                    backgroundGradientTo: "white",
                                    decimalPlaces: 2, // optional, defaults to 2dp
                                    color: (opacity = 1) => "#7ACFFF",
                                    labelColor: (opacity = 1) => "black",
                                    style: {
                                        borderRadius: 16
                                    },
                                    propsForDots: {
                                        r: "6",
                                        strokeWidth: "2",
                                        stroke: "#7ACFFF"
                                    }
                                }}
                                bezier
                                style={{
                                    marginVertical: 8,
                                    borderRadius:16
                                }}
                            />
                            </View>
                            <View style={tw`flex flex-row justify-center`}>

                                <View style={tw`items-center`}>

                                
                                    <TextInput
                                        onChangeText={handlerAlias}
                                        value={inputAlias}
                                        style={styles.input}
                                    />

                                    <Button
                                        color="#7ACFFF"
                                        title='agregar alias al dispositivo'
                                        onPress={ ()=>{
                                            setIsLoading(true)

                                            setDoc(doc(db, "c0",dispositivo), {
                                                alias: inputAlias,
                                                dispositivo
                                            }).then(()=>setIsLoading(false));
                                        }}
                                        style={tw`mb-2`}
                                    />

                                </View>
                            </View>


                        </View>)}
                </ScrollView>

            </View>
            <View style={tw`flex flex-row justify-evenly w-full bg-[#7ACFFF] py-2 `}>
                <Button
                    color="#7ACFFF"
                    title="Estadisticas"
                    onPress={() => {

                        navigation.replace('Details')
                    }}
                    style={tw`mb-2`}
                />

                <Button
                    color="#7ACFFF"
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
const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        width:180,
        borderWidth: 1,
        padding: 10,
        backgroundColor:'white',
        borderStyle:'solid',
        borderColor:'#7ACFFF',
        borderRadius:8,


    },
});
export default DeviceScreen;