<template>
    <Space direction="vertical" align="center" :style="{ width: '100%' }">
        <List :grid="{ column: 5 }" :data-source="books.items">
            <template #renderItem="{ item }">
                <Item :key="item.id">
                    <BookCard :book="item" />
                </Item>
            </template>
        </List>
        <Pagination :current="current" :pageSize="pageSize" :total="total" @change="onPageChange" />
    </Space>
</template>

<script setup>
import { defineProps } from 'vue';
import { List, Pagination, Space } from 'ant-design-vue';
import BookCard from './BookCard.vue';
const { Item } = List;
defineProps({
    books: Object,
    current: Number,
    pageSize: Number,
    onPageChange: Function,
    total: Number,
});

</script>