<template>
    <PrivateLayout>
        <BookInfoCard v-if="loaded" :book="book" :comments="comments" :page-index="pageIndex" :sort="sort"
            @sort-change="handleSortChange" @mutate="handleMutate" @page-change="handlePageChange" />
    </PrivateLayout>
</template>

<script setup>
import PrivateLayout from '@/components/PrivateLayout.vue';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getBookById, getBookComments } from "../service/book";
import BookInfoCard from '@/components/BookInfoCard.vue';

const route = useRoute();
const bookId = route.params.id;
const book = ref(null);
const comments = ref([]);
const loaded = computed(() => book.value && comments.value);
const baseUrl = `/book/${bookId}`;

const loadBook = async () => {
    book.value = await getBookById(bookId);
};
const loadComments = async () => {
    comments.value = await getBookComments(bookId, pageIndex.value, pageSize.value, sort.value);
}

const parseParams = (query) => {
    const pageIndex = Number.parseInt(query?.pageIndex ?? '0');
    const pageSize = Number.parseInt(query?.pageSize ?? '10');
    const sort = query?.sort ?? 'createdTime';
    return [pageIndex, pageSize, sort];
};

const router = useRouter();

let [pageIndex, pageSize, sort] = parseParams(router.currentRoute.query);
pageIndex = ref(pageIndex);
pageSize = ref(pageSize);
sort = ref(sort);

const handleSortChange = (sort) => {
    router.push({
        path: baseUrl, query: {
            pageSize: pageSize.value,
            pageIndex: 0,
            sort
        }
    });
};

const handlePageChange = (page) => {
    router.push({
        path: baseUrl, query: {
            pageSize: pageSize.value,
            pageIndex: page - 1,
            sort: sort.value
        }
    });
};

const handleMutate = () => {
    loadComments();
};

router.beforeEach((to) => {
    [pageIndex.value, pageSize.value, sort.value] = parseParams(to.query);
    loadComments();
});

loadBook();
loadComments();
</script>