export interface OrderHistory {

    items: {
        id: number;
        name: string;
        price: string;
        quantity: number;
    }[];
    totalPrice: string;
    orderDate: string;
    status: string;
}