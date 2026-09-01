export type Orders = 'ASC' | 'DESC';

export interface OrderOption  {
    value: Orders; 
    label: string;
}

export type OrderOptions = OrderOption[];