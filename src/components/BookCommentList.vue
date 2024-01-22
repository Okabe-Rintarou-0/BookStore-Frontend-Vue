<template>
    <Space direction="vertical" :style="{ width: '100%' }">
        <List itemLayout="horizontal" :dataSource="comments">
            <template #renderItem="{ item }">
                <BookComment :comment="item" :isReplying="replying === item.id" @mutate="handleMutate"
                    @reply="() => handleReplyComment(item)" />
            </template>
        </List>
    </Space>
</template>

<script setup>
import { List, Space } from 'ant-design-vue';
import BookComment from './BookComment.vue';
import { ref, defineProps } from 'vue';

const replying = ref(-1);

const handleReplyComment = (comment) => {
    replying.value = comment.id;
}

const handleMutate = () => {
    props.onMutate?.();
    replying.value = -1;
};

const props = defineProps({
    comments: Array,
    onMutate: Function
});

</script>