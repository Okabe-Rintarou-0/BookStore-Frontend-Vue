<template>
    <div :style="{
        height: '30px',
        width: '30px',
        borderRadius: '15px',
        backgroundColor: '#1DA57A',
        textAlign: 'center',
        fontSize: '18px',
        color: 'white',
    }">
        {{ firstChar }}
    </div>
</template>

<script setup>
import { defineProps } from 'vue';
const props = defineProps({
    username: String
});

const firstChar = [...props.username].slice(0)[0];
</script>