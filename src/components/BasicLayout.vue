<template>
    <Layout :style="{ minHeight: '100vh' }">
        <Header :style="{ backgroundColor: 'white', padding: 0 }">
            <NavBar />
        </Header>
        <Content>
            <slot></slot>
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
import { Content, Footer, Header } from 'ant-design-vue/es/layout/layout';
import NavBar from './NavBar.vue';
import { Layout, Space } from 'ant-design-vue';
</script>
  