import { OrderItem } from "../models/orderitem";

export interface IOrder {
    username: string;
    email: string;
    address: string;
    phone: string;
    status: string;
    orderItem: OrderItem[];
    totalPrice: number;
}