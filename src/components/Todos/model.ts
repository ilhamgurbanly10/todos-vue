import { onMounted } from "vue";
import type { ModelReturn } from "./types";
import { useTodosStore } from "../../stores/todos";
import type { Orders } from "../../types/pagination";

export const useModel = (): ModelReturn => {

    const todosStore = useTodosStore();

    onMounted(() => {
        todosStore.getStatuses();
        todosStore.get();
    });

    const handleOrder = (value: Orders) => {
        todosStore.get({
            order: value
        });
    }

    return {
        handleOrder
    }

}