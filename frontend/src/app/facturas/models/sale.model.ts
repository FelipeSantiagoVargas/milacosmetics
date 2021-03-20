import { Order } from "./orders.model";

export interface Sale{
    orders: Order[],
    date: Date,
}