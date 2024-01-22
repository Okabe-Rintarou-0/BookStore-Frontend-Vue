<template>
    <context-holder />
    <PlaceOrderModal v-if="showModal" @cancel="handleCloseModal" @ok="handleOrderSubmit" :selectedItems="selectedItems" />
    <Table :columns="columns" :data-source="items" :row-selection="{ onChange: handleSelectChange }">
        <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'action'">
                <Button type="primary" @click="() => handleDeleteItem(record.id)">删除</Button>
            </template>
            <template v-else-if="column.key === 'price'">
                {{ record.book.price / 100 }}
            </template>
            <template v-else-if="column.key === 'title'">
                <a>{{ record.book.title }}</a>
            </template>
            <template v-else-if="column.key === 'number'">
                <InputNumber :min="1" :value="record.number" @change="number => { handleNumberChange(record.id, number) }">
                </InputNumber>
            </template>
        </template>
        <template #expandedRowRender="{ record }">
            <Row justify="space-between" :gutter="8">
                <Col :span="4">
                <Image :src="record.book.cover" :height="200" />
                </Col>
                <Col :span="20">
                <p>{{ record.book.description }}</p>
                </Col>
            </Row>
        </template>
    </Table>
    <p>总价：{{ totalPrice }}元</p>
    <Button type="primary" :disabled="selectedItems.length === 0" @click="handleOpenModal">立刻下单</Button>
</template>

<script setup>
import { Button, Table, Row, Col, Image, message, InputNumber } from 'ant-design-vue';
import { ref, defineProps, computed } from 'vue';
import { changeCartItemNumber, deleteCartItem } from "../service/cart";
import { handleBaseApiResponse } from "../utils/message";
import PlaceOrderModal from './PlaceOrderModal.vue';

const [messageApi, contextHolder] = message.useMessage();
const selectedItems = ref([]);
const showModal = ref(false);
const columns = [
    { title: '书名', dataIndex: 'book', key: 'title', },
    { title: '数量', dataIndex: 'number', key: 'number', },
    { title: '价格', dataIndex: 'book', key: 'price', },
    { title: '操作', dataIndex: '', key: 'action', },
];
const handleDeleteItem = async (id) => {
    let res = await deleteCartItem(id);
    handleBaseApiResponse(res, messageApi, props.onMutate);
    if (res.ok) {
        selectedItems.value = selectedItems.value.filter(item => item.id !== id);
    }
}

const handleOpenModal = () => {
    showModal.value = true;
};

const handleCloseModal = () => {
    showModal.value = false;
}

const handleSelectChange = (_, items) => {
    selectedItems.value = items;
};

const handleOrderSubmit = () => {
    showModal.value = false;
    props.onMutate?.();
}

const props = defineProps({
    cartItems: Array,
    onMutate: Function
});

const items = computed(() => props.cartItems.map(item => ({ ...item, key: item.id })));

const handleNumberChange = async (id, number) => {
    let res = await changeCartItemNumber(id, number);
    if (res.ok) {
        props.cartItems.find(item => item.id === id).number = number;
        const selected = selectedItems.value.find(item => item.id === id);
        if (selected) {
            selected.number = number;
        }
    }
}

const totalPrice = computed(() => {
    const prices = selectedItems.value.map(item => item.book.price * item.number);
    return prices.length > 0 ?
        prices.reduce((prev, cur) => prev + cur) / 100 : 0;
});
</script>
