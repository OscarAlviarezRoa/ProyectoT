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


import { getDatabase } from "firebase/database";
import { ref, set, onValue } from "firebase/database";

import { useCollectionData } from "react-firebase-hooks/firestore";


const appFirebase = initializeApp(firebaseConfig)
const db = getFirestore(appFirebase)



import { useCookies } from "react-cookie";



function DetailScreen({ navigation }) {

    //email

    const handleEmail = () => {
        fetch("http://localhost:3000/sendEmail",{
            method:"POST",
            mode: "no-cors",
            headers: {
                'Access-Control-Allow-Origin': '*',
            }
        })

    }

    //Realtime Database

    const [todoData,setTodoData] = useState([]);

    const calldb = (async()=>{
        const citiesCol = collection(db, 'test');
        const citySnapshot = await getDocs(citiesCol);
        const cityList = citySnapshot.docs.map(doc => doc.data());
        setTodoData(cityList);



    })
    useEffect (()=>{

        calldb()

    },[])






    const [lista,setLista] = useState<Array<{card:{}, graph:[], dispositivoId:string | number}> | null>(null)

    const [general,setGeneral ] = useState<Array<{card:{}, graph:[], dispositivoId:string | number}> | null>(null)
    const [cookies,setCookie] = useCookies(["CookieIRMS"])




    const query = collection(db, "a0");

    useEffect(()=>{

        const getLista =async () => {
            try{

                const querySnapshot2 = await getDocs(collection(db, "a0"));

                const dispositivos = []
                querySnapshot2.forEach((doc) => {
                    if (doc.id!=="b0"){
                        dispositivos.push(doc.id)

                    }
                });
                let resultadosLista = []
                dispositivos.map(async (dispositivo,index)=>{
                    try{

                        const query =  await getDocs(collection(db, "a0", "b0",dispositivo))

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


                    }catch (e){
                        console.log(e)
                    }

                })











            }catch(error){
                console.log(error)
            }

        }
        setInterval(()=>getLista(),5000)
    },[])
    useEffect(() => {
        if( lista !==null){
            const resumenGeneral = []
            let Potencia= 0
            let IRMS = 0
            let IP = 0

            lista.map((item,index)=>{
                if(typeof  item.card.Potencia ==='number'){
                    Potencia =Potencia + item.card.Potencia

                }
                if(typeof  item.card.IRMS ==='number'){
                    IRMS=IRMS + item.card.IRMS

                }
                if(typeof  item.card.IP ==='number'){
                    IP=IP + item.card.IP

                }

            })









            const sortValues = lista.sort(({card},{card:cardB})=> cardB.myDouble3-card.myDouble3).slice(0,10).map((item)=>item.graph)

            const sortValues2 = sortValues.sort((a,b)=> a.myDouble3-b.myDouble3)
            console.log(sortValues2)

            const promedio = Array.from({ length: sortValues2[0].length }, () => ({ IRMS: 0, myDouble3: 0 }));

            sortValues2.forEach((graph) => {
                graph.forEach((coordenada, index) => {
                    promedio[index].IRMS += coordenada.IRMS;
                    promedio[index].myDouble3 += coordenada.myDouble3;
                });
            });

            const numGraphs = sortValues2.length;
            promedio.forEach((coordenada) => {
                coordenada.IRMS /= numGraphs;
                coordenada.myDouble3 /= numGraphs;
            });






            let cardNew = {
                Potencia,
                IRMS,
                IP
            }
            resumenGeneral.push({
                card:cardNew,
                graph: promedio,
                dispositivoId:''
            })

            setGeneral(resumenGeneral)

        }
    }, [lista]);
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
    if(!general){
        return <View style={tw`flex-1 items-center justify-center`}>
            <ActivityIndicator size="large" color="#F08080" />
        </View>
    }



    return (
        <View style={tw`flex-1 bg-red-50`}>
            <View style={tw`flex flex-1 flex-row flex-wrap justify-center items-center py-4 `}>
                {general && general.map(({card,graph,dispositivoId},index)=><View key={index}>
                    <View key={index} style={tw`flex flex-row  justify-evenly py-2`}>
                        <View>
                            <CustomCard key={index} device={card.nombre} title='Lectura' date={new Date()} total={card.myDouble3} consumes={[
                                {
                                    title:'Corriente Max',
                                    readValue: card.IP,
                                    isPositive: true,

                                },
                                {
                                    title:'Corriente (s)',
                                    readValue:card.IRMS,
                                    isPositive: true,
                                },
                                {
                                    title:'Potencia',
                                    readValue:1,
                                    isPositive: null,
                                },

                            ]




                            }/>
                        </View>

                    </View>

                    <LineChart
                        data={{
                            labels: graph.map(item=>item.myDouble3),
                            datasets: [
                                {
                                    data: graph.map(item=>item.IRMS)
                                }
                            ]
                        }}
                        width={Dimensions.get("window").width} // from react-native
                        height={220}
                        yAxisLabel=""
                        yAxisSuffix="mA"
                        yAxisInterval={1} // optional, defaults to 1
                        chartConfig={{
                            backgroundColor: "#F7F9F9",
                            backgroundGradientFrom: "#F7F9F9",
                            backgroundGradientTo: "#F7F9F9",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => "yellow",
                            labelColor: (opacity = 1) => "black",
                            style: {
                                borderRadius: 16
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#ffa726"
                            }
                        }}
                        bezier
                        style={{
                            marginVertical: 8,
                            borderRadius:16
                        }}
                    />


                </View>)}

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

export default DetailScreen;