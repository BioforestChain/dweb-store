<script lang="ts" setup>
import { ref } from 'vue'

// 是否旋转图片
const isLandscape = ref(false)

/** 是否旋转图片 */
const toggleLandscape = () => {
  isLandscape.value = !isLandscape.value
}

const showImageViewer = ref(false)
const closeImageViewer = () => {
  showImageViewer.value = false
  isLandscape.value = false
  document.body.style.overflow = 'auto'
}

const openImageViewer = () => {
  showImageViewer.value = true
}

// 阻止滚动事件传播
const handleScroll = (event: { stopPropagation: () => void }) => {
  event.stopPropagation()
}
</script>

<template>
  <div
    v-if="showImageViewer"
    class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black z-50"
    @wheel.prevent="handleScroll"
  >
    <img
      src="/media/allApp.png"
      :class="[{ 'rotate-90': isLandscape }, isLandscape ? 'max-h-[342px]' : 'max-h-[201px]']"
      ref="image"
      alt="Image"
      class="transition-transform transform origin-center"
    />
    <div
      @click="closeImageViewer"
      class="absolute bottom-[40px] left-[159px] rounded-[20px] opacity-100 box-border border-[0.5px] border-solid border-[rgba(255,255,255,0.45)]"
    >
      <div class="flex justify-center items-center flex-row w-[70px] h-[28px]">
        <img src="/media/close.svg" class="w-[16px] h-[16px] mr-[2px]" alt="close" />
        <div class="text-white text-[14px]">关闭</div>
      </div>
    </div>
    <img
      @click="toggleLandscape"
      src="/media/landscape.svg"
      class="absolute bottom-[40px] right-[32px]"
      alt="landscape"
    />
  </div>
</template>
