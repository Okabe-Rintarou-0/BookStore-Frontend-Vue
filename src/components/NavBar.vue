<template>
    <context-holder />
    <Row class="navbar" justify="start">
        <Col>
        <a href="/">Book Store</a>
        </Col>
        <Col flex="auto">
        <Menu :selectedKeys="activeSection" mode="horizontal">
            <Item v-for="item in navItems" :key="item.value">
                <RouterLink :to="item.value">{{ item.label }}</RouterLink>
            </Item>
        </Menu>
        </Col>

        <Col>
        <Dropdown>
            <Button shape="circle" :icon="h(UserOutlined)">
            </Button>
            <template #overlay>
                <Menu :items="dropMenuItems" @click="handleMenuClick">
                </Menu>
            </template>
        </Dropdown>
        </Col>
    </Row>
</template>
<script setup>
import { logout } from '../service/logout';
import { handleBaseApiResponse } from '../utils/message';
import { computed, defineProps } from 'vue';
import { UserOutlined, AccountBookOutlined, LogoutOutlined } from '@ant-design/icons-vue'
import { h } from 'vue';
import { Button, Col, Dropdown, Menu, Row, message } from 'ant-design-vue';
import { RouterLink, useRouter } from 'vue-router';

const { Item } = Menu;
const [messageApi, contextHolder] = message.useMessage();

let props = defineProps({
    user: Object
});

const navItems = [
    { label: "首页", value: "/" },
    { label: "购物车", value: "/cart" },
    { label: "订单", value: "/order" },
    { label: "排行", value: "/rank" },
    { label: "后端 API 文档", value: "/api-docs" }
];

const router = useRouter();
const handleMenuClick = async (e) => {
    if (e.key === "/logout") {
        let res = await logout();
        handleBaseApiResponse(res, messageApi, () => router.push("/login"));
        return;
    }
};

const dropMenuItems = computed(() => [
    {
        key: "nickname",
        label: props.user?.nickname,
        icon: h(UserOutlined),
    },
    {
        key: "balance",
        label: `余额：${props.user?.balance / 100}元`,
        icon: h(AccountBookOutlined),
    },
    { key: "/logout", label: "登出", icon: h(LogoutOutlined), danger: true },
]);

const parts = window.location.href.split('/');
const activeSection = ['/' + parts[parts.length - 1]];
</script>

<style scoped>
.navbar {
    align-content: center;
    margin-left: auto;
    margin-right: auto;
    padding: 0 50px;
}
</style>