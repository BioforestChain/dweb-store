<template>
  <Dialog ref="ref_dialog"></Dialog>
  <!-- 主内容 -->
  <div>
    <div
      class="absolute w-[390px] h-[844px] opacity-100 left-0 top-0 bg-gradient-to-b from-[#C3F5FE] via-[#DBE9FD] via-27% to-[#F7F9FD] to-95% -z-10"
    ></div>
    <div
      class="w-[390px] h-[48px] text-[18px] font-medium text-theme2 text-center leading-[48px] bg-[rgba(255,255,255,0.2)]"
    >
      <img
        class="absolute left-[16px] top-[16px] w-[16px] h-[16px]"
        src="/src/assets/media/icon_back.svg"
        @click="$router.push('/')"
      />
      Web3元宇宙生态基金会工具库
    </div>
    <div class="p-[16px]">
      <!-- 集合列表 -->
      <div
        class="w-[358px] min-h-[200px] relative overflow-hidden m-b-[16px] bg-bg rounded-[16px] box-border border-[0.5px] border-solid border-[rgba(0,0,0,0.08)] z-10"
        v-for="(item, index) in all_products"
        :key="index"
      >
        <!-- 集合背景 -->
        <div
          class="absolute left-0 top-0 w-[358px] h-[150px] -z-10"
          :style="`background: linear-gradient(180deg, ${item.themeColor} 21%, ${hexToRgb(
            item.themeColor,
            0.45
          )} 62%, rgba(247, 249, 253, 0) 100%)`"
        ></div>
        <!-- 集合标题 -->
        <div class="h-[57px] flex items-center">
          <img
            class="w-[28px] h-[28px] ml-[21px] mr-[8px]"
            :src="item.icon"
          />
          <span class="text-[20px] tracking-normal text-[#FFFFFF]">{{
            item.name
          }}</span>
          <span class="text-[20px] font-light ml-[4px] tracking-normal text-[#FFFFFF]">{{
            item.applist.length
          }}</span>
        </div>
        <!-- 集合应用列表 -->
        <div
          class="w-[334px] box-border h-[124px] p-[12px] mb-[8px] ml-[12px] rounded-[8px] bg-[#FFFFFF] border-[0.5px] border-solid border-[rgba(0,0,0,0.08)]"
          v-for="appinfo in item.applist"
          :key="appinfo.name"
        >
          <div class="flex flex-row items-center">
            <div class="flex justify-center items-center">
              <div
                class="w-[56px] h-[56px] border-[0.5px] border-solid border-[rgba(0,0,0,0.08)] rounded-[16px] overflow-hidden bg-[#ffffff]"
              >
                <img
                  :src="appinfo.logo"
                  class="w-[56px] h-[56px] transform scale-[0.8]"
                  @error="(e) => onError(e)"
                  alt="icon"
                />
              </div>
            </div>
            <span class="text-[16px] font-bold tracking-normal text-[#000000] ml-[8px]">
              {{ appinfo.name }}
            </span>
          </div>
          <!-- 按钮列表 -->
          <div class="flex flex-row justify-between gap-[8px] mt-[10px]">
            <div
              class="h-[32px] rounded-[20px] bg-bg-btn flex-[1] flex items-center justify-center"
              v-if="appinfo.website"
              @click="jumpWebsite(appinfo)"
            >
              <img
                src="/src/assets/media/icon-website.svg"
                class="w-[16px] h-[16px] mr-[3px]"
                alt="icon"
              />
              <span class="text-[14px] tracking-normal text-[#0068FF]">官网</span>
            </div>
            <div
              class="h-[32px] rounded-[20px] bg-bg-btn flex-[1] flex items-center justify-center"
              v-if="appinfo.metadata"
              @click="openApp(appinfo)"
            >
              <img
                src="/src/assets/media/icon-download.svg"
                class="w-[16px] h-[16px] mr-[3px]"
                alt="icon"
              />
              <span class="text-[14px] tracking-normal text-[#0068FF]">下载</span>
            </div>
            <div
              class="h-[32px] rounded-[20px] bg-bg-btn flex-[1] flex items-center justify-center"
              v-if="appinfo.community"
              @click="jumpCommunity(appinfo)"
            >
              <img
                src="/src/assets/media/icon-community.svg"
                class="w-[16px] h-[16px] mr-[3px]"
                alt="icon"
              />
              <span class="text-[14px] tracking-normal text-[#0068FF]">社区</span>
            </div>
            <div
              class="h-[32px] rounded-[20px] bg-bg-btn flex-[1] flex items-center justify-center"
              v-if="appinfo.tracker"
              @click="jumpBrowser(appinfo)"
            >
              <img
                src="/src/assets/media/icon-browser.svg"
                class="w-[16px] h-[16px] mr-[3px]"
                alt="icon"
              />
              <span class="text-[14px] tracking-normal text-[#0068FF]">浏览器</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { type ProductSetByType, type AppInfo } from '../../type/app'
import defaultImg from '../../assets/media/placeholder.svg'
import applistService from '../../component/applist'
import Dialog from './dialog_downloadBroser.vue'
import { hexToRgb } from '../../help/index'

const all_products = ref<ProductSetByType[] | undefined>([])

const ref_dialog = ref<any>(null)

onMounted(async () => {
  try {
    const d = (await applistService.getAllProduct()) as ProductSetByType[]
    all_products.value = d
    console.log('获取所有产品--------', d)
  } catch (error) {
    console.error('获取所有产品失败--------', error)
  }
})

const jumpWebsite = (appInfo: AppInfo) => {
  applistService.jumpWebsite(appInfo)
}

const jumpCommunity = (appInfo: AppInfo) => {
  applistService.jumpCommunity(appInfo)
}

const jumpBrowser = (appInfo: AppInfo) => {
  applistService.jumpBrowser(appInfo)
}

// 打开应用
const openApp = (app: AppInfo) => {
  applistService.jumpApp(app, () => {
    console.log('拉起dewebrower失败, 弹窗下载app')
    if (ref_dialog.value) {
      ref_dialog.value.showPopup()
    }
  })
}

// 图片加载失败时，显示默认图片
const onError = (e: Event) => {
  const target = e.target as HTMLImageElement
  target.src = defaultImg
}
</script>
