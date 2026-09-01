<script setup lang="ts">

import { perPageOptions } from '../../../../data/pagination';
import moment from 'moment';
import { useModel } from './model';
import { useTodosStore } from "../../../../stores/todos";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons-vue';
import { h } from 'vue';
const { columns, handlePagination, handleDelete } = useModel();
const todos = useTodosStore();

</script>

<template>

    <a-table :scroll="{ x: 1024 }" :columns="columns" :data-source="todos.data" :loading="todos.loading" :pagination="{
        current: todos.page,
        pageSize: todos.perPage,
        total: todos.total,
        showSizeChanger: true,
        pageSizeOptions: perPageOptions
    }" row-key="id" @change="handlePagination" :locale="{
        emptyText: todos.error
            ? 'Failed to load todos'
            : 'No todos found'
    }">

        <template #bodyCell="{ column, text, record }">

            <template v-if="column.dataIndex === 'start_date'">
                {{ moment.utc(text).local().format('DD.MM.YYYY HH:mm') }}
            </template>

            <template v-if="column.dataIndex === 'deadline'">
                {{ moment.utc(text).local().format('DD.MM.YYYY HH:mm') }}
            </template>

            <template v-if="column.dataIndex === 'status'">
                <span class="inline-block text-center min-w-[120px] text-white py-2 px-3 rounded"
                    :style="{ backgroundColor: record.status_color }">
                    {{ text }}
                </span>
            </template>

            <template v-if="column.dataIndex === 'edit'">
                <a-button @click="todos.openModal('edit', record.id, record)" type="primary" shape="circle"
                    class="!inline-flex !items-center !justify-center !p-0 !leading-none">
                    <EditOutlined />
                </a-button>
            </template>

            <template v-if="column.dataIndex === 'delete'">

                <a-popconfirm title="Are you sure you want to delete this todo?" ok-text="Delete" cancel-text="Cancel"
                    @confirm="handleDelete(record.id)">
                    <a-button danger type="primary" shape="circle"
                        class="!inline-flex !items-center !justify-center !p-0 !leading-none">
                        <DeleteOutlined />
                    </a-button>
                </a-popconfirm>

            </template>

        </template>

    </a-table>

</template>
