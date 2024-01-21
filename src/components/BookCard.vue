<template>
    <RouterLink :to="bookUrl">
        <Card hoverable>
            <template #cover>
                <img alt="" :src="book.cover" />
            </template>
            <Meta :title="book.title" :description="price">
            </Meta>
        </Card>
    </RouterLink>
</template>

<script setup>
import { defineProps } from 'vue'
import { Card } from 'ant-design-vue';
import { RouterLink } from 'vue-router';

const { Meta } = Card;
const props = defineProps({
    book: Object
});

const price = (props.book.price / 100) + '元';
const bookUrl = `/book/${props.book.id}`;
</script>