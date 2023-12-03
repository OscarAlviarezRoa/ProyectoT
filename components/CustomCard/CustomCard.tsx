import React from "react";
import { CustomCardProps } from "./CustomCard.type";
import { Text, View } from "react-native";
import tw from 'twrnc';

export const CustomCard:React.FC<CustomCardProps>=({device, consumes,date,title,total})=>{
    console.log(title)
    return (
    
        <View style={tw`flex flex-row justify-evenly h-36 rounded`}>
            <View style={tw`rounded-l-lg flex justify-center items-center bg-red-400 text-white font-bold px-2 py-2`}>
            <Text style={tw`text-white font-bold`}>{device}</Text>
        </View><View style={tw`flex flex-col px-2 justify-evenly w-5/6 bg-gray-50 rounded-r-lg`}>
            <View style={tw`flex flex-row justify-between text-gray-300`}>
                 <Text >{title}: </Text>
                 <Text >{total}</Text>
            </View>
            <View style={tw``}>
                {consumes && consumes.map((consume,index)=><View key={index} style={tw`flex flex-row justify-between text-gray-300`}>
                <Text>{consume.title}</Text>
                <Text style={tw`${consume.isPositive?'text-green-300':'text-red-300'}`}>{consume.readValue}</Text>
                </View>)}

            </View>
            
        </View>
        </View>

    )
}