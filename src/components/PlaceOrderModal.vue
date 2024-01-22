<template>
    <context-holder />
    <Modal title="确认下单" :open="true" @ok="onOk" @cancel="onCancel" :footer="null" :width="800">
        <Form :model="formState" layout="vertical" @finish="handleSubmit" :preserve="false">
            <FormItem name="receiver" label="收货人">
                <Input v-model:value="formState.receiver" />
            </FormItem>
            <FormItem name="tel" label="联系电话">
                <Input v-model:value="formState.tel" />
            </FormItem>
            <FormItem name="address" label="收货地址">
                <TextArea :rows="2" :maxLength="817" v-model:value="formState.address" />
            </FormItem>
            <FormItem>
                <Button type="primary" htmlType="submit">
                    提交
                </Button>
            </FormItem>
        </Form>
    </Modal>
</template>

<script setup>
import { defineProps, reactive } from "vue";
import { Button, Form, FormItem, Input, Modal, message } from "ant-design-vue";
import { placeOrder } from "../service/order";
import { handleBaseApiResponse } from "../utils/message";

const [messageApi, contextHolder] = message.useMessage();
const { TextArea } = Input;

const formState = reactive({
    receiver: '',
    tel: '',
    address: ''
});

const handleSubmit = async () => {
    const address = formState.address;
    const receiver = formState.receiver;
    const tel = formState.tel;
    if (!address || !receiver || !tel) {
        messageApi.error("请填写完整信息！");
        return;
    }
    let orderInfo = {
        address,
        receiver,
        tel,
        itemIds: props.selectedItems.map(item => item.id)
    }
    let res = await placeOrder(orderInfo);
    handleBaseApiResponse(res, messageApi, props.onOk);
};

const props = defineProps({
    selectedItems: Array,
    onOk: Function,
    onCancel: Function,
});
</script>