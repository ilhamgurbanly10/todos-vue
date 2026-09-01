import type { Todo } from "../../../../types/todos"
import type { TableColumnsType } from 'ant-design-vue';
import type { Ref } from 'vue';
import dayjs from 'dayjs';

export type Columns = TableColumnsType<Todo>;

export interface TodoForm {
    name: string;
    description: string;
    deadline: dayjs.Dayjs | null;
    start_date: dayjs.Dayjs | null;
    status: number | undefined;
}

export interface ModelReturn {
    formRef: Ref<any>;
    form: Ref<TodoForm>;
    handleSubmit: () => Promise<void>;
}

export interface Pagination {
    current?: number; 
    pageSize?: number;
}