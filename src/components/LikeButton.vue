<template>
    <Space size="small">
        <a @click.prevent="handleLikeOrUnlike">
            <LikeFilled v-if="isLiked" />
            <LikeOutlined v-else />
        </a>
        {{ number }}
    </Space>
</template>

<script setup>
import { Space } from 'ant-design-vue';
import { LikeFilled, LikeOutlined } from '@ant-design/icons-vue'
import { defineProps, ref } from 'vue';

const props = defineProps({
    defaultNumber: Number,
    liked: Boolean,
    onLike: Function,
    onUnlike: Function
});

const handleLikeOrUnlike = async () => {
    if (!isLiked.value) {
        if (await props.onLike?.()) {
            isLiked.value = true;
            number.value += 1;
        }
    } else if (await props.onUnlike?.()) {
        isLiked.value = false;
        number.value -= 1;
    }
}

const number = ref(props.defaultNumber);
const isLiked = ref(props.liked);

</script>