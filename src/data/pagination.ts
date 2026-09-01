import type { Orders, OrderOptions } from "../types/pagination";

export const initialPerPage: number = 10;

export const perPageOptions: string[] = ['3', '5', '10', '25', '50', '100'];

export const initialOrder: Orders = "ASC"; 

export const orderOptions: OrderOptions = [
    {
        label: 'ASC', 
        value: 'ASC'
    }, 
    {
        label: 'DESC', 
        value: 'DESC'
    }
]