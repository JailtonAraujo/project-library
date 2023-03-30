import { Book } from "./Book";
import { Customer } from "./Customer";

export interface CheckOut {
    id?:number,
    book:Book,
    customer:Customer,
    checkInId:number,
    dateCheckOut?:Date,
    iasAtraso?:number,
    valorPago?:number,
    taxaAtraso?:number
}