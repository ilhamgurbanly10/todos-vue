<script setup lang="ts">

import Table from './components/Table';
import { useModel } from './model';
import { orderOptions } from '../../data/pagination';
import { useTodosStore } from "../../stores/todos";
import Modal from './components/Modal';

const { handleOrder } = useModel();
const todosStore = useTodosStore();

</script>

<template>

    <div class="flex items-center justify-end">
        <div class="inline-flex items-center gap-2">
            <label for="pageOrder">Order: </label>
            <a-select id="pageOrder" :value="todosStore.order" :options="orderOptions" @change="handleOrder" />
        </div>
    </div>

    <Table class="mt-5" />

    <div class="flex items-center justify-end mt-5">
        <a-button :disabled="!todosStore.statuses.length" @click="todosStore.openModal()" type="primary">
            Add
        </a-button>
    </div>

    <Modal />

</template>
