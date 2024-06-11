<script setup lang="ts">
import { RouterView } from 'vue-router'

// 在非生产环境下动态导入并使用 vconsole
if (import.meta.env.MODE !== 'production') {
  import('vconsole').then(({ default: VConsole }) => {
    new VConsole();
    console.log('Running with VConsole in development/test mode');
  }).catch((error) => {
    console.error('Failed to load VConsole:', error);
  });
}
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
