<script lang="ts" setup>
import applistService from '@/component/applist'
import CarouseItem from '@/component/CarouseItem.vue'
import Dialog from '@/component/DialogDownloadBroser.vue'
import Header from '@/component/Header.vue'
import { type AppInfo } from '@/type/app'
import { Carousel } from 'ant-design-vue'
import { onMounted, ref, watch } from 'vue'

const apps = ref([] as AppInfo[])
const apps_all = ref([] as AppInfo[])

// 是否正在加载数据
const isLoading = ref(false)
const ref_dialog = ref<any>(null)

onMounted(async () => {
  // 修复safira 双击放大
  fixStyleBug()
  try {
    const applist = await applistService.getApplist()
    //  数据解析
    apps_all.value = applist
    // apps作用于真实显示的应用
    apps.value = apps_all.value
    console.log('获取到的应用信息--------', apps.value)
  } catch (error) {
    console.error('获取应用信息失败--------', error)
  }

  isLoading.value = true
})

const fixStyleBug = () => {
  let lastTouchEnd = 0
  document.documentElement.addEventListener(
    'touchend',
    function (event) {
      let now = Date.now()
      if (now - lastTouchEnd <= 300) {
        event.preventDefault()
      }
      lastTouchEnd = now
    },
    false
  )
}

/**搜索应用内容*/
const inputValue = ref('')
watch(inputValue, (value) => {
  if (value === '') {
    apps.value = apps_all.value
  } else {
    apps.value = apps_all.value.filter((app) => {
      return app.name.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1
    })
  }
})

// 图片加载失败时，显示默认图片
const onError = (e: Event) => {
  const target = e.target as HTMLImageElement
  target.src = '/media/placeholder.svg'
}

/**打开应用*/
const openApp = (app: AppInfo) => {
  applistService.jumpApp(app, () => {
    console.log('拉起dewebrower失败, 弹窗下载app')
    if (ref_dialog.value) {
      ref_dialog.value.showPopup()
    }
  })
}
</script>

<template>
  <!-- 下载dweb_browser应用弹窗 -->
  <Dialog ref="ref_dialog"></Dialog>
  <Header></Header>
  <div class="container mx-auto px-3">
    <Carousel class="shadow-xl rounded-2xl overflow-hidden">
      <CarouseItem
        title="欢迎来到"
        subTitle="Dweb Metaverse"
        svgUrl="/media/banner_font.svg"
      ></CarouseItem>
      <CarouseItem
        title="Web3元宇宙"
        subTitle="生态基金会工具库"
        svgUrl="/media/banner_font2.svg"
      ></CarouseItem>
    </Carousel>
    <div class="flex justify-between mt-5">
      <span class="text-xl font-bold text-black">应用</span>
      <div class="flex justify-between items-center">
        <div
          class="flex items-center bg-white backdrop-opacity-5 rounded-lg border border-white p-1 shadow-sm"
        >
          <img src="/media/icon_search.svg" class="mr-1" width="20" height="20" alt="icon" />
          <input
            v-model="inputValue"
            class="text-sm text-black outline-none"
            placeholder="搜索应用"
          />
          <span class="text-sm text-regal-blue pl-2 border-l-2 divide-indigo-300">搜索</span>
        </div>
        <div class="text-sm text-tran-gray ml-3">{{ `全部 ${apps.length || 0}` }}</div>
      </div>
    </div>
    <div class="mt-5 pb-5 min-h-80">
      <template v-if="isLoading">
        <div
          v-if="apps.length > 0"
          class="grid grid-cols-[repeat(auto-fill,_24rem)] gap-x-4 justify-center"
        >
          <div
            v-for="app in apps"
            class="flex justify-between items-center border-b-2 py-2 mt-2 w-96"
            :key="app.name"
            @click="openApp(app)"
          >
            <div class="flex">
              <div
                class="bg-white shadow-md rounded-xl overflow-hidden w-16 h-16 flex justify-center items-center"
              >
                <img
                  :src="app.logo"
                  class="scale-75"
                  width="64"
                  height="64"
                  @error="(e) => onError(e)"
                  alt="icon"
                />
              </div>
              <div class="flex flex-col justify-center items-start ml-5 active:scale-95">
                <div class="text-md font-bold text-black mb-1 overflow-hidden">{{ app.name }}</div>
                <div class="text-xs text-tran-gray">{{ app.description }}</div>
              </div>
            </div>
            <div
              class="flex justify-center items-center w-11 h-8 bg-[#0066ff20] rounded-3xl shadow active:shadow-inner transition-shadow cursor-pointer"
            >
              <img src="/media/icon_arrow.svg" width="20" height="20" alt="icon" />
            </div>
          </div>
        </div>
        <template v-else>
          <div class="flex flex-col items-center justify-center mt-36">
            <img src="/media/placeholder.svg" class="mb-4" width="120" height="120" />
            <span class="text-xs text-tran-gray">没有应用信息，刷新一下试试吧</span>
          </div>
        </template>
      </template>
      <template v-else>
        <div class="flex flex-col items-center justify-center mt-36">
          <img src="/media/icon_loading.png" class="mb-2.5 animate-spin" width="40" height="40" />
          <span class="text-md font-bold text-gray-400">loading...</span>
        </div>
      </template>
    </div>
  </div>
</template>
