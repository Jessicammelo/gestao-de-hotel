import { Person } from "./person";

export interface CheckIn{
    checkIn: Date;
    checkOut: Date;
    person: Person;
    vehicle: boolean;
    price: number;

}