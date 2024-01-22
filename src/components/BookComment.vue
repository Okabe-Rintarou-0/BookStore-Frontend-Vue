<template>
    <ListItem :key="comment.id">
        <context-holder />
        <ListItemMeta>
            <template #title>
                <div :style="{ color: 'grey' }">{{ comment.username }}</div>
            </template>
            <template #avatar>
                <UsernameAvatar :username="comment.username" />
            </template>
            <template #description>
                <Space direction="vertical" :style="{ width: '100%' }">
                    <p :style="{ fontSize: '16px', color: 'black', margin: '0px' }">{{ replyMessage }}{{ comment.content }}
                    </p>
                    <Space>
                        {{ formatTime(comment.createdAt) }}
                        <LikeButton :defaultNumber="comment.like" :liked="comment.liked" @like="handleLikeComment"
                            @unlike="handleUnlikeComment" />
                        <a :style="{ color: 'grey', fontSize: '14px' }" @click.prevent="handleReply">回复</a>
                    </Space>
                    <CommentInput v-if="isReplying" :placeholder="`回复 ${comment.username}：`" @submit="handleSubmitReply" />
                </Space>
            </template>
        </ListItemMeta>
    </ListItem>
</template>

<script setup>
import { defineProps, computed } from 'vue';
import { ListItem, ListItemMeta, Space, message } from 'ant-design-vue';
import UsernameAvatar from './UsernameAvatar.vue';
import CommentInput from './CommentInput.vue';
import { formatTime } from "../utils/time";
import { likeComment, replyComment, unlikeComment } from "../service/comment";
import { handleBaseApiResponse } from "../utils/message";
import LikeButton from './LikeButton.vue';

const [messageApi, contextHolder] = message.useMessage();
const handleReply = () => {
    props.onReply?.();
};

const handleSubmitReply = async (content) => {
    let res = await replyComment(commentId, content);
    handleBaseApiResponse(res, messageApi, props.onMutate);
};

const handleLikeComment = async () => {
    let res = await likeComment(commentId);
    handleBaseApiResponse(res, messageApi);
    return res.ok;
};

const handleUnlikeComment = async () => {
    let res = await unlikeComment(commentId);
    handleBaseApiResponse(res, messageApi);
    return res.ok;
};

const props = defineProps({
    comment: Object,
    isReplying: Boolean,
    onMutate: Function,
    onReply: Function
});

const replyMessage = computed(() => props.comment.reply ? `回复 ${props.comment.reply}：` : '');
const commentId = props.comment.id;
</script>