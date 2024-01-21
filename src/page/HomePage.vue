<template>
    <PrivateLayout>
        <Card :style="{ margin: '20px' }">
            <Space direction="vertical" size="large" :style="{ width: '100%' }">
                <InputSearch placeholder="输入关键字" @search="handleSearch" enterButton size="large" />
                <BookList :books="books" :page-size="pageSize" :total="total" :current="pageIndex + 1"
                    :on-page-change="handlePageChange" />
            </Space>
        </Card>
    </PrivateLayout>
</template>

<script setup>
import { ref, computed } from 'vue';
import { Card, InputSearch, Space } from 'ant-design-vue';
import PrivateLayout from '../components/PrivateLayout.vue'
import { useRouter } from 'vue-router';
import BookList from '@/components/BookList.vue';
import { searchBooks } from '../service/book'

const parseParams = (query) => {
    const keyword = query?.keyword ?? '';
    const pageIndex = Number.parseInt(query?.pageIndex ?? '0');
    const pageSize = Number.parseInt(query?.pageSize ?? '10');
    return [keyword, pageIndex, pageSize];
};

const router = useRouter();
let [keyword, pageIndex, pageSize] = parseParams(router.currentRoute.query);
keyword = ref(keyword);
pageIndex = ref(pageIndex);
pageSize = ref(pageSize);
const books = ref({ items: [], total: 0 });
const total = computed(() => pageSize.value * books.value.total);
const loadBooks = async () => {
    books.value = await searchBooks(keyword.value, pageIndex.value, pageSize.value);
};
loadBooks();

const handlePageChange = (page) => {
    router.push({
        path: '/', query: {
            ...router.currentRoute.query,
            pageIndex: page - 1
        }
    });
}

const handleSearch = (keyword) => {
    router.push({
        path: '/', query: {
            ...router.currentRoute.query,
            pageIndex: 0,
            keyword
        }
    });
}

router.beforeEach((to) => {
    [keyword.value, pageIndex.value, pageSize.value] = parseParams(to.query);
    loadBooks();
});
</script>
