<script setup lang="ts">

import { useTodosStore } from '../../../../stores/todos';
import { useModel } from './model';
const todos = useTodosStore();
const {
    handleSubmit,
    form, 
    formRef
} = useModel();

</script>

<template>
    <a-modal :open="todos.showModal" :title="todos.modalTitle" :ok-text="todos.modalOkText" cancel-text="Cancel"
        @ok="handleSubmit" @cancel="todos.closeModal()">
        <a-form ref="formRef" layout="vertical" :model="form">
            <a-form-item label="Name" name="name" :rules="[
                {
                    required: true,
                    message: 'Please enter the todo name',
                },
            ]">
                <a-input v-model:value="form.name" placeholder="Enter todo name" />
            </a-form-item>

            <a-form-item label="Description" name="description">
                <a-textarea v-model:value="form.description" placeholder="Enter description" :rows="4" />
            </a-form-item>

            <a-form-item label="Start Date" name="start_date" :rules="[
                {
                    required: true,
                    message: 'Please enter the start date',
                }
            ]">
                <a-date-picker v-model:value="form.start_date" show-time format="DD.MM.YYYY HH:mm"
                    placeholder="Select start date and time" style="width: 100%" />
            </a-form-item>

            <a-form-item label="Deadline" name="deadline" :rules="[
                {
                    required: true,
                    message: 'Please enter the deadline',
                }
            ]">
                <a-date-picker v-model:value="form.deadline" show-time format="DD.MM.YYYY HH:mm"
                    placeholder="Select deadline and time" style="width: 100%" />
            </a-form-item>

            <a-form-item label="Status" name="status" :rules="[
                {
                    required: true,
                    message: 'Please select a status',
                },
            ]">
                <a-select v-model:value="form.status" placeholder="Select status" style="width: 100%"
                    :options="todos.statusOptions" />
            </a-form-item>
        </a-form>
    </a-modal>
</template>
