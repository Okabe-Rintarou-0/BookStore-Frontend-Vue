<template>
  <ConfigProvider :theme="{
    token: {
      colorPrimary: '#1DA57A', colorInfo: '#1DA57A'
    }
  }">
    <RouterView />
  </ConfigProvider>
</template>

<script>
import { ConfigProvider } from 'ant-design-vue';
import { RouterView } from 'vue-router';

export default {
  components: {
    ConfigProvider,
    RouterView
  }
}
</script>
