<script setup lang="ts">
defineProps({
  title: String,
  subTitle: String,
  svgUrl: String
})
</script>

<template>
  <div class="bg-header bg-center bg-no-repeat bg-cover p-5">
    <div
      class="flex flex-col md:flex-row justify-between md:justify-start text-2xl font-bold text-black mb-5"
    >
      <div class="mb-2 mr-1">{{ title }}</div>
      <div>{{ subTitle }}</div>
    </div>
    <div class="flex-col">
      <div class="w-48 p-1 bg-regal-blue rounded-3xl flex justify-center">
        <img :src="svgUrl" class="post_img" alt="post_text" />
      </div>
      <div class="flex mt-5 items-center">
        <img src="/home/icon_info.svg" :class="['post_bottom_img']" alt="icon" />
        <span class="text-gray-400">应用将安装于 Dweb Browser 中</span>
      </div>
    </div>
  </div>
</template>
