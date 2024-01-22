<template>
    <PrivateLayout>
        <Card :style="{ margin: '20px' }">
            <BookRankChart :books="books" :style="{height: '500px'}"/>
        </Card>
    </PrivateLayout>
</template>

<script setup>
import { Card } from 'ant-design-vue';
import PrivateLayout from '@/components/PrivateLayout.vue';
import { ref } from 'vue';
import { getTop10BestSellingBooks } from "../service/book";
import BookRankChart from '@/components/BookRankChart.vue';

const loadBooks = async () => {
    books.value = await getTop10BestSellingBooks();
}

const books = ref([]);
loadBooks();
</script>