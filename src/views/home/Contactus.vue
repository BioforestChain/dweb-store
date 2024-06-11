<template>
  <!-- 主内容 -->
  <div>
    <div
      class="absolute w-[390px] h-[1000px] opacity-100 left-0 top-0 bg-gradient-to-b from-[#C3F5FE] via-[#DBE9FD] via-27% to-[#F7F9FD] to-95% -z-10"
    ></div>
    <div
      class="w-[390px] h-[48px]"
    >
      <img
        class="absolute left-[16px] top-[16px] w-[16px] h-[16px]"
        src="/src/assets/media/icon_back.svg"
        @click="$router.push('/')"
      />
    </div>

    <div class="px-[16px] py-[32px]">
      <div class="flex items-center mb-[20px]">
        <img class="w-[32px] h-[32px] mr-[8px]" src="../../assets/media/tellus.svg" alt="icon">
        <span class="text-[28px] font-bold leading-[normal] tracking-normal">在线反馈</span>
      </div>
      <iframe class="w-full h-[800px] border-none" src="https://developer.bfmeta.org/zh/dweb%e5%ba%94%e7%94%a8/">

      </iframe>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>
