import { View,Button,Text, Dimensions } from "react-native";
import tw from 'twrnc';
import { CustomCard } from "../components/CustomCard/CustomCard";
import * as React from 'react';
import { useEffect } from 'react';
import { useState } from "react"; 
import { firebaseConfig } from "../services/firebase";
import { collection, getFirestore, addDoc, getDocs, query, orderBy, getDoc, doc } from 'firebase/firestore'
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
        // const startCountRef = ref(database, '/test');
        // // const querySnapshot2 = getDocs(collection(database,'test')).then((Response)=>{
        // //     console.log(Response)
        // // })
        // console.log(startCountRef);
        // onValue(startCountRef, (snapshot)=> {
        // const data = snapshot.val();
        // const newPosts = Object.keys(data).map(key=> ({
        //     id:key,
        //     ...data[key]
        // }));
        // console.log(newPosts);
        // console.log('error');
        // setTodoData(newPosts);
    // })
    calldb()

    },[])
    //Realtime Database






    const [lista,setLista] = useState([])

    const [graphs,setGraphs] = useState([])

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
                let docs = []
                let resultadosLista = []
                let graphValues= []
                dispositivos.map((dispositivo)=>{
                    try{
                         getDocs(collection(db, "a0", "b0",dispositivo)).then((query)=>{
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

                             setGraphs([...graphs,sortValues2])
                             setLista([...lista,resultado[0]])


                             docs = []

                         });
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




    return (
        <View style={tw`bg-red-50`}>
      <View style={tw`flex flex-row flex-wrap justify-center items-center py-4`}>
        {lista && lista.map((card,index)=><CustomCard key={index} device={card.nombre} title='Lectura' date={new Date()} total={card.myDouble3} consumes={[
            {
                title:'Corriente',
                readValue: card.IP,
                isPositive: true,
        
            },
            {
                title:'Potencia',
                readValue:card.IRMS,
                isPositive: true,
            },
            {
                title:'Consumo',
                readValue:card.Potencia,
                isPositive: null,
            },
            {
                title:'Consumo Periodo',
                readValue:card.myDouble3,
                isPositive: null,
            }
        ]



        }/>)}
          {graphs && graphs.map((graph)=>(
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
          ))}
      </View>
        <View>
        <Text></Text>

        <Button color="#F08080"
            title="Estadisticas"
            onPress={() => navigation.push('Details')} 
          />
          
          <Button color="#F08080" title="Go to Home" onPress={() => navigation.navigate('Home') } />
        </View>
        {
            todoData.map((item, index)=>{
                return(
                    <View key={index}>
                        <Text>{item.nombre}</Text>
                    </View>

                )

            })
        }
      </View>
    );
  }

    //lista
   
    //mostrar datos de los arreglos

  export default DetailsScreen;