<template>
    <Layout :style="{ minHeight: '100vh' }">
        <Header :style="{ backgroundColor: 'white', padding: 0 }">
            <NavBar :user="user"/>
        </Header>
        <Content>
            <div v-if="user">
                <slot></slot>
            </div>
        </Content>
        <Footer :style="{ textAlign: 'center' }">
            <Space direction="vertical">
                <a target="_blank" href="https://github.com/Okabe-Rintarou-0">关于作者</a>
                <div>电子书城 REINS 2024</div>
            </Space>
        </Footer>
    </Layout>
</template>
<script setup>
import { ref } from 'vue';
import { Content, Footer, Header } from 'ant-design-vue/es/layout/layout';
import { getMe } from '../service/user'
import NavBar from './NavBar.vue';
import { Layout, Space } from 'ant-design-vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const user = ref(null);
getMe().then(me => {
    if (!me) {
        router.push({ path: "/login" })
    }
    user.value = me;
});

</script>
  