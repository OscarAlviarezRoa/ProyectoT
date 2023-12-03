import { CustomCardProps } from "../components/CustomCard/CustomCard.type";

export const Cards:Array<CustomCardProps>=[{
    consumes:[
    {
        title:'Promedio',
        readValue: 4.47,
        isPositive: true,

    },
    {
        title:'Promedio Por hora',
        readValue:0.18,
        isPositive: true,
    },
    {
        title:'Consumo en 15 horas',
        readValue:2,
        isPositive: null,
    },
    {
        title:'Consumo Periodo',
        readValue:31,
        isPositive: null,
    }],
    title:"Lectura",
    total: 5549,
    date: new Date(),
}
]