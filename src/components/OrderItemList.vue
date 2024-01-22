<template>
    <List :data-source="orderItems">
        <template #renderItem="{ item }">
            <ListItem :key="item.id">
                <ListItemMeta :title="item.book.title" :description="`数量：${item.number}`">
                    <template #avatar>
                        <Avatar shape="square" :size="80" :src="item.book.cover" />
                    </template>
                </ListItemMeta>
            </ListItem>
        </template>
    </List>
</template>

<script setup>
import { defineProps } from 'vue';
import { Avatar, List, ListItem, ListItemMeta } from 'ant-design-vue';

const props = defineProps({
    orderItems: Array
});

</script>