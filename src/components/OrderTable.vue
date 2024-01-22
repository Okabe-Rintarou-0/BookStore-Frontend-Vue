<template>
    <Table :columns="columns" :data-source="items">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'createdAt'">
                {{ formatTime(record.createdAt) }}
            </template>
        </template>
        <template #expandedRowRender="{ record }">
            <OrderItemList :order-items="record.items" />
        </template>
    </Table>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import { Table } from 'ant-design-vue';
import { formatTime } from '@/utils/time';
import OrderItemList from './OrderItemList.vue';

const columns = [
    { title: '收货人', dataIndex: 'receiver', key: 'receiver', },
    { title: '联系方式', dataIndex: 'tel', key: 'tel', },
    { title: '收货地址', dataIndex: 'address', key: 'address', },
    { title: '下单时间', dataIndex: 'createdAt', key: 'createdAt', },
];
const props = defineProps({
    orders: Array
});

const items = computed(() => props.orders.map(order => ({ ...order, key: order.id })));
</script>