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
        console.log(todoData)
    //Realtime Database






    const [lista,setLista] = useState([])

    const [graphs,setGraphs] = useState()

    const [cookies,setCookie] = useCookies(["CookieIRMS"])


    // useEffect(() => {

    //   if (!cookies.CookieIRMS) {
    //     setCookie('CookieIRMS', true, { path: '/' });
    //   }
    // }, [cookies.CookieIRMS, setCookie]);

    const query = collection(db, "a0");
    const [docsa0,loading,error] = useCollectionData(query)
    
    useEffect(()=>{
        
        const getLista =async () => {
            try{
                //const a = collection(db,'/a0/b0/84:CC:A8:82:42:03')
                //const querySnapshot = await getDocs(collection(db,'/a0/b0/A4:E5:7C:B8:C2:9D'))
                const querySnapshot = await getDocs(collection(db, "a0", "b0", "A4:E5:7C:B8:C2:9D"));
                const querySnapshot2 = await getDocs(collection(db, "a0"));
                const docRef = doc(db, "a0", "b0");
                const docSnap = await getDoc(docRef); 
                //const city = getDocs(docSnap);   
                //const docSnapshot = await docSnap.get();
                const dispositivos = []
                querySnapshot2.forEach((doc) => {
                  // doc.data() is never undefined for query doc snapshots
                  console.log(doc.id, " => ", doc.data());
                  if (doc.id!=="b0"){
                    dispositivos.push(doc.id)

                  }
                });
                const query = []

                dispositivos.map(async(dispositivo)=>{
                  const querySnapshot = await getDocs(collection(db, "a0", "b0",dispositivo.id));
                  query.push(querySnapshot)
                })


                const docs = []
                const resultadosLista = []

                    query.map((querySnapshot)=>{
                      querySnapshot.forEach((doc)=>{
                        const {IP,IRMS,Potencia,Caudal,Volumen,Consumo,myDouble,myDouble2,myDouble3,myInteger,myMap} = doc.data()
                        docs.push({
                            Caudal,
                            Volumen,
                            Consumo,
                            IP,
                            IRMS,
                            Potencia,
                            myDouble3,
                        })  

                        const resultado = [docs.reduce((acum,item)=>{
                          if(item.myDouble3>acum.myDouble3){
                              acum = item
                          }
                          return acum
                      },docs[0])]


                      resultadosLista.push(resultado)

                      const graphValues = []
                      const sortValues = docs.sort((a,b)=> b.myDouble3-a.myDouble3).slice(0,10)

                      const sortValues2 = sortValues.sort((a,b)=> a.myDouble3-b.myDouble3)
                      
                      setGraphs([...graphs,sortValues2])
                      docs = []

                    })

                    })
                    //setGraph(docs.slice(docs.length-10))
                    


                    
                    // const b = resultado[0].IRMS
                    // console.log(cookies.CookieIRMS)
                    // if (b>50 && cookies.CookieIRMS!='true'){
                      
                      
                    //   handleEmail()
                    //   setCookie("CookieIRMS",'false',{path: "/"})
                    //   console.log(cookies.CookieIRMS)
                    //   console.log(b)

                    // }else{
                      
                      
                      
                    //   setCookie("CookieIRMS",'true',{path: "/"})
                    //   console.log(cookies.CookieIRMS)
                    //   console.log(b)

                    // }
                    // if (b<=50 && cookies.CookieIRMS==false){
                      
                      
                    //   setCookie("CookieIRMS",true)
                    //   console.log(b)

                    // }
                    

                        // const x = docs.slice(newresultado.index,1)
                        // console.log(x)
                        // //setGraph([...graph,newresultado])
                        // graphValues.push(newresultado[0])
                        
                    

                    setLista(resultadosLista);
                    //console.log(graph)
                    //console.log(resultado)
                    if (!loading){
                    console.log(docsa0)}
                    //console.log(docSnapshot)
                    console.log(querySnapshot2)
            }catch(error){
                console.log(error)
            }
            
        }
        setInterval(()=>getLista(),5000)
    },[loading])
    //console.log(graph)
    //Graficacion

    //Graficacion




    // useEffect(()=>{
        
    //     const getLista =async () => {
    //         try{
    //             const querySnapshot = await getDocs(collection(db,'Dispositivos'))
    //             const docs = []
    //                 querySnapshot.forEach((doc)=>{
    //                     const {nombre, consumoh, consumom, promedioh, promedio} = doc.data()
    //                     docs.push({
    //                         id:doc.id,
    //                         nombre,
    //                         consumoh,
    //                         consumom,
    //                         promedioh,
    //                         promedio,
    //                     })

                        
    //                 })
    //                 setLista(docs);
                
    //         }catch(error){
    //             console.log(error)
    //         }
            
    //     }
    //     getLista()
    // },[])
    console.log(lista)
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
        {graphs && graphs.map((graph)=>(<LineChart
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
      borderRadius: 16
    }}
  />))}
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