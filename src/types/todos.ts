import type { Orders } from "./pagination";

export interface Todo {
    name: string;
    desc: string;
    id: number;
    deadline: string;
    start_date: string;
    status_id: number;
    status: string;
    status_color: string;
}

export interface StatusResSelf {
    name_az: string;
    id: number; 
    name_en: string;
    color: string;
}

export type StatusesResSelf = StatusResSelf[];

export interface TodoResSelf {
    name_az: string;
    desc_az: string;
    name_en: string;
    desc_en: string;
    id: number;
    deadline: string;
    start_date: string;
    status_id: number;
    status: { color: string, name: string };
    status_color: string;
}

export type TodosResSelf = TodoResSelf[];

export type Todos = Todo[];

export type ModalActions = "add" | "edit";

export interface Status {
    name: string; 
    color: string; 
    id: number;
}

export type Statuses = Status[];

export interface TodosState {
    data: Todos;
    loading: boolean;
    perPage: number;
    page: number;
    total: number;
    order: Orders;
    error: boolean;
    showModal: boolean;
    modalAction: ModalActions;
    statuses: Statuses;
    editedId: number | null;
    editedInitialData: Todo | null;
} 

export interface GetOptions {
    page?: number; 
    perPage?: number;
    order?: Orders;
}

export interface TodoPayload {
    name_az: string;
    name_en: string; 
    desc_az?: string;
    desc_en?: string;
    status_id: number;
    deadline: string;
    start_date: string;
}
