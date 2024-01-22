<template>
    <PrivateLayout>
        <Card :style="{ margin: '20px' }">
            <CartItemTable :cart-items="cartItems" @mutate="handleMutate" />
        </Card>
    </PrivateLayout>
</template>

<script setup>
import { Card } from 'ant-design-vue';
import PrivateLayout from '@/components/PrivateLayout.vue';
import CartItemTable from '@/components/CartItemTable.vue';
import { ref } from 'vue';
import { getCartItems } from '../service/cart'

const cartItems = ref([]);
const loadItems = async () => {
    cartItems.value = await getCartItems();
};

const handleMutate = () => {
    loadItems();
}

loadItems();

</script>