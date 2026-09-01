import { defineStore } from "pinia";
import type { TodosState, TodosResSelf, GetOptions, ModalActions, StatusesResSelf, TodoPayload, Todo } from "../types/todos";
import api from "../lib/apiService";
import { initialPerPage, initialOrder } from "../data/pagination";
import { notification } from 'ant-design-vue';
import { initialModalAction } from "../data/actions";

export const useTodosStore = defineStore("todos", {

    state: (): TodosState => ({
        data: [],
        perPage: initialPerPage,
        page: 1,
        total: 0,
        loading: false,
        order: initialOrder,
        error: false,
        showModal: false,
        modalAction: initialModalAction,
        statuses: [],
        editedId: null,
        editedInitialData: null
    }),

    actions: {

        async getStatuses() {

            try {
                const response = await api.get(`/todos/statuses`);

                if (response.status === 200) {
                    const resData: StatusesResSelf = Array.isArray(response?.data?.data) ? response?.data?.data : [];
                    const lang = "en";

                    this.statuses = resData.map((item) => {
                        return {
                            id: item.id,
                            name: item[`name_${lang}`],
                            color: item.color

                        }
                    });
                }
            } catch (error) {

                throw error;
            }
        },

        async addTodo(payload: TodoPayload) {

            try {

                this.loading = true;
                const response = await api.post('/todos', payload);
                this.loading = false;

                if (response?.status === 201) {
                    await this.get();
                    notification.success({
                        message: 'Successfully added',
                        description: 'The todo has been added successfully.',
                    });
                }

            } catch (error) {
                this.loading = false;
                notification.error({
                    message: 'Adding failed',
                    description: 'Something went wrong while adding the todo.',
                });

                throw error;
            }
        },

        async updateTodo(payload: TodoPayload) {

            try {

                this.loading = true;
                const response = await api.put(`/todos/${this.editedId}`, payload);
                this.loading = false;

                if (response?.status === 200) {
                    await this.get();
                    notification.success({
                        message: 'Successfully updated',
                        description: 'The todo has been updated successfully.',
                    });
                }



            } catch (error) {
                this.loading = false;
                notification.error({
                    message: 'Updating failed',
                    description: 'Something went wrong while updated the todo.',
                });

                throw error;
            }
        },

        async openModal(action?: ModalActions, id?: number, initialData?: Todo | null) {
            const modalAction = action ?? initialModalAction;
            const isAdd: boolean = modalAction === 'add';
            this.showModal = true;
            this.modalAction = modalAction;
            this.editedId = isAdd ? null : id ? id : null;
            this.editedInitialData = isAdd ? null : initialData ? initialData : null;
        },

        async closeModal() {
            this.showModal = false;
            this.modalAction = initialModalAction;
            this.editedId = null;
            this.editedInitialData = null;
        },

        async delete(id: number) {
            try {

                this.loading = true;
                const response = await api.delete(`/todos/${id}`);

                if (response.status === 200) {

                    this.data = this.data.filter((item) => item.id !== id);
                    await this.get({ page: 1 });
                    notification.success({
                        message: 'Successfully deleted',
                        description: 'The todo has been deleted successfully.',
                    });
                }

                this.loading = false;
            } catch (error) {
                this.loading = false;
                notification.error({
                    message: 'Delete failed',
                    description: 'Something went wrong while deleting the todo.',
                });

                throw error;
            }
        },

        async get(options?: GetOptions) {

            const reqPage = options?.page ?? this.page;
            const reqPerPage = options?.perPage ?? this.perPage;
            const reqOrder = options?.order ?? this.order;

            this.perPage = reqPerPage;
            this.page = reqPage;
            this.order = reqOrder;

            this.loading = true;

            try {
                const response = await api.get(`/todos?page=${reqPage}&per_page=${reqPerPage}&order=${reqOrder}`);

                if (response?.status === 200) {

                    const resData: TodosResSelf = Array.isArray(response?.data?.data) ? response?.data?.data : [];
                    const lang = "en";

                    this.data = resData.map((item) => {
                        return {
                            name: item[`name_${lang}`],
                            desc: item[`desc_${lang}`],
                            id: item.id,
                            deadline: item.deadline,
                            start_date: item.start_date,
                            status_id: item.status_id,
                            status: item.status.name,
                            status_color: item.status.color

                        }
                    });

                    this.error = false;
                    this.total = response?.data?.total;


                } else this.error = true;


                this.loading = false;

            } catch {
                this.error = true;
                this.loading = false;
            }
        },

        setTodos(todos: TodosState["data"]) {
            this.data = todos;
        },

    },

    getters: {
        modalOkText: (state) => {
            return state.modalAction === 'add' ? 'Add' : 'Edit';
        },
        modalTitle: (state) => {
            return state.modalAction === 'add' ? 'Create Todo' : 'Edit Todo';
        },
        statusOptions: (state) => {
            return state.statuses.map((item) => { return { label: item.name, value: item.id } });
        },
    },


});