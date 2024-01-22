<template>
    <Space direction="vertical" :style="{ width: '100%' }">
        <TextArea :autoFocus="true" :placeholder="placeholder" v-model:value="text" />
        <Row justify="end">
            <Col><Button type="primary" @click="handleSubmit">发布</Button></Col>
        </Row>
    </Space>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import { Space, Input, Row, Col, Button } from 'ant-design-vue';
const { TextArea } = Input;

const text = ref('');
const handleSubmit = () => {
    props.onSubmit?.(text.value);
    text.value = '';
}

const props = defineProps({
    placeholder: String,
    onSubmit: Function
});

</script>