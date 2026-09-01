import type { ModelReturn, TodoForm } from "./types";
import type { TodoPayload } from "../../../../types/todos";
import { useTodosStore } from "../../../../stores/todos";
import { ref, watch } from "vue";
import dayjs from 'dayjs';
import { initialFormData } from "./data";

export const useModel = (): ModelReturn => {

    const todos = useTodosStore();

    const formRef = ref();

    const form = ref<TodoForm>(initialFormData);

    const setInitialData = () => {
        if (!todos.editedInitialData) {
            form.value = initialFormData;
        } else {

            form.value = {
                name: todos.editedInitialData.name ?? '',
                description: todos.editedInitialData.desc ?? '',

                start_date: todos.editedInitialData.start_date
                    ? dayjs(todos.editedInitialData.start_date)
                    : null,

                deadline: todos.editedInitialData.deadline
                    ? dayjs(todos.editedInitialData.deadline)
                    : null,

                status: todos.editedInitialData.status_id,
            };
        }
    };

    watch(
        () => todos.editedInitialData,
        () => {
            setInitialData();
        },
        {
            immediate: true,
        },
    );

    const handleSubmit = async () => {
        try {
            await formRef.value.validate();

            const payload: TodoPayload = {
                name_az: form.value.name,
                name_en: form.value.name,
                desc_az: form.value.description,
                desc_en: form.value.description,
                start_date: form.value.start_date
                    ? form.value.start_date.format('YYYY-MM-DD HH:mm:ss')
                    : '',
                deadline: form.value.deadline
                    ? form.value.deadline.format('YYYY-MM-DD HH:mm:ss')
                    : '',
                status_id: Number(form.value.status),
            };

            todos.modalAction === "add" ? await todos.addTodo(payload) : await todos.updateTodo(payload);
            todos.closeModal();

        } catch (error) {
            console.error('Validation failed:', error);
        }
    };

    return {
        handleSubmit,
        form,
        formRef
    }

}