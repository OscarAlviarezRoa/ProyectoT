export interface CustomCardProps {
    device: string,
    title: string,
    total: number,
    date: Date,
    consumes: Array<ReadConsume>,

    
}
export interface ReadConsume {
    title: string,
    readValue: number,
    isPositive: boolean | null,
    }