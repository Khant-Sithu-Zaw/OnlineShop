import { LatLng } from "leaflet";
import { CartItem } from "./cartitem";

export class Order {
    id!: number;
    items: CartItem[] = [];
    totalPrice: number = 0;
    email!: string;
    name!: string;
    address!: string;
    phone!: string;

}