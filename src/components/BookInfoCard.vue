<template>
    <context-holder />
    <Card :style="{ margin: '20px' }">
        <Space direction="vertical">
            <BookDetails :book="book" @addCartItem="handleAddCartItem" />
            <div :style="{ margin: '20px' }">
                <Divider>书籍评论</Divider>
                <Tabs :defaultActiveKey="sort" @change="sort => props.onSortChange(sort)">
                    <TabPane key="createdTime" tab="最新评论" />
                    <TabPane key="like" tab="最热评论" />
                </Tabs>
                <CommentInput placeholder="发布一条友善的评论" @submit="handleAddComment" />
                <BookCommentList :comments="comments.items" @mutate="onMutate" />
            </div>
            <Pagination :current="pageIndex + 1" :pageSize="5" :total="5 * comments.total" @change="onPageChange" />
        </Space>
    </Card>
</template>

<script setup>
import { Card, Divider, Pagination, Space, TabPane, Tabs, message } from 'ant-design-vue';
import { defineProps } from 'vue';
import { addCartItem } from "../service/cart";
import { addBookComment } from "../service/book";
import { handleBaseApiResponse } from "../utils/message";
import BookDetails from './BookDetails.vue';
import CommentInput from './CommentInput.vue';
import BookCommentList from './BookCommentList.vue';

const [messageApi, contextHolder] = message.useMessage();
const handleAddCartItem = async () => {
    let res = await addCartItem(props.book.id);
    handleBaseApiResponse(res, messageApi);
};

const handleAddComment = async (comment) => {
    let res = await addBookComment(props.book.id, comment);
    handleBaseApiResponse(res, messageApi, props.onMutate);
};

const props = defineProps({
    book: Object,
    comments: Object,
    pageIndex: Number,
    sort: String,
    onMutate: Function,
    onPageChange: Function,
    onSortChange: Function,
});
</script>