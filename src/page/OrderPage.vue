<template>
    <PrivateLayout>
        <Card :style="{ margin: '20px' }">
            <OrderTable :orders="orders" />
        </Card>
    </PrivateLayout>
</template>

<script setup>
import { Card } from 'ant-design-vue';
import PrivateLayout from '@/components/PrivateLayout.vue';
import { ref } from 'vue';
import { getOrders } from "../service/order";
import OrderTable from '@/components/OrderTable.vue';

const orders = ref([]);

const loadOrders = async () => {
    orders.value = await getOrders();
}

loadOrders();
</script>