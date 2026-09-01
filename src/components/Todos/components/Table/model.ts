import type { ModelReturn, Columns, Pagination } from "./types";
import { useTodosStore } from "../../../../stores/todos";

export const useModel = (): ModelReturn => {

    const todosStore = useTodosStore();

    const columns: Columns = [
        {
            title: '#',
            key: 'index',
            customRender: ({ index }) => {
                return index + 1;
            },
            width: 60,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: 300,
        },
        {
            title: 'Description',
            dataIndex: 'desc',
            key: 'desc',
            width: 300,
        },
        {
            title: 'Start Date',
            dataIndex: 'start_date',
            key: 'start_date',
            width: 300,
        },
        {
            title: 'Deadline',
            dataIndex: 'deadline',
            key: 'deadline',
            width: 300,
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            width: 200,
        },
        {
            title: 'Edit',
            dataIndex: 'edit',
            key: 'edit',
            width: 50,
        },
         {
            title: 'Delete',
            dataIndex: 'delete',
            key: 'delete',
            width: 50,
        },
    ];

    const handlePagination = (
        pagination: Pagination
    ) => {
        todosStore.get({
            page: pagination.current, 
            perPage: pagination.pageSize
        });
    };

    const handleDelete = (id: number) => {
        todosStore.delete(id);
    }

    return {
        columns,
        handlePagination, 
        handleDelete
    }

}