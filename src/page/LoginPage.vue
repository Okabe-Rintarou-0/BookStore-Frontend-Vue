<template>
    <context-holder />
    <BasicLayout>
        <Row align="middle" justify="end" :style="containerStyle">
            <Col span="7">
            <Card class="login-form-container" :bordered="false">
                <Space direction="vertical" align="center" :style="{ width: '100%' }">
                    <Space size="large" :style="{ width: '100%' }">
                        <img src="/logo.webp" alt="" :style="{ height: '44px' }" />
                        <h1 :style="{ fontSize: '30px', margin: '0px' }">Book Store</h1>
                    </Space>
                    <p :style="{ textAlign: 'center', color: 'rgba(0, 0, 0, 0.75)' }">电子书城</p>
                </Space>
                <Form :model="formState" @finish="handleFinish" :style="{ marginTop: '20px' }">
                    <FormItem>
                        <Input v-model:value="formState.username" placeholder="请输入用户名" :style="{ height: '40px' }">
                        <template #prefix>
                            <UserOutlined />
                        </template>
                        </Input>
                    </FormItem>
                    <FormItem>
                        <InputPassword v-model:value="formState.password" type="password" placeholder="请输入密码"
                            :style="{ height: '40px' }">
                            <template #prefix>
                                <LockOutlined />
                            </template>
                        </InputPassword>
                    </FormItem>
                    <Row justify="space-between" :style="{ marginBottom: '20px' }">
                        <Col><a>新账号？前往注册</a></Col>
                        <Col><a>忘记密码</a></Col>
                    </Row>
                    <FormItem>
                        <Button type="primary" html-type="submit" :style="{ width: '100%', height: '40px' }">
                            登录
                        </Button>
                    </FormItem>
                </Form>
            </Card>
            </Col>
        </Row>
    </BasicLayout>
</template>

<script setup>
import { login } from '../service/login';
import { handleBaseApiResponse } from '../utils/message';
import { message } from 'ant-design-vue';
import { reactive } from 'vue';
import BasicLayout from '@/components/BasicLayout.vue';
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue'
import { Button, Card, Col, Form, FormItem, Input, InputPassword, Row, Space } from 'ant-design-vue';
import { useRouter } from 'vue-router';

const [messageApi, contextHolder] = message.useMessage();
const router = useRouter();
const containerStyle = {
    padding: '80px',
    height: '80vh',
    backgroundSize: '80vh',
    backgroundImage: "url('login.png')"
};
const formState = reactive({
    username: '',
    password: '',
});
const handleFinish = async () => {
    const username = formState.username;
    const password = formState.password;
    if (!username || !password) {
        return messageApi.error("用户名或密码不得为空！", 0.8);
    }
    let res = await login(username, password);
    handleBaseApiResponse(res, messageApi, () => router.push("/"));
};
</script>

<style scoped>
.login-form-container {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
</style>