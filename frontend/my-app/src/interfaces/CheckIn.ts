import { Book } from "./Book";
import { Customer } from "./Customer";

export interface Checkin{
    id?:number,
    book:Book,
    customer:Customer,
    checkin_date?:Date,
    checkout_date?:Date,
    state?:string,
    valor?:number,
    daysLate?:number,
    taxa?:number
}