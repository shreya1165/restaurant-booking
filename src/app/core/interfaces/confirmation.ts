export interface Confirmation{
    message:string,
    title:string
}

export interface ActionBooked{
    id: number;
    date: Date;
    slot: string;
    numberOfPersons: string;
    option: string;
    restaurantName: string;
}