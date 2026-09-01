import type { Todo } from "../../../../types/todos"
import type { TableColumnsType } from 'ant-design-vue';

export type Columns = TableColumnsType<Todo>;

export interface ModelReturn {
    columns: Columns;
    handlePagination: (pagination: Pagination) => void;
    handleDelete: (id: number) => void;
}

export interface Pagination {
    current?: number; 
    pageSize?: number;
}