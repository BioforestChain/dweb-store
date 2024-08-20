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

const initData = ref(false)

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

  initData.value = true
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
  <div class="container mx-auto p-3">
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
    <div class="mb-5 grid grid-cols-1 gap-4 content-evenly sm:grid-cols-2 md:grid-cols-3">
      <template v-if="initData">
        <template v-if="apps.length > 0">
          <div
            v-for="app in apps"
            class="flex justify-around border-b-2 pb-2 max-w-96"
            :key="app.name"
            @click="openApp(app)"
          >
            <div class="bg-white shadow-md rounded-xl overflow-hidden">
              <img
                :src="app.logo"
                class="card_img_img"
                width="64"
                height="64"
                @error="(e) => onError(e)"
                alt="icon"
              />
            </div>
            <div :class="['card_mid']">
              <div :class="['card_name']">{{ app.name }}</div>
              <div :class="['card_des']">{{ app.description }}</div>
            </div>
            <div :class="['card_arr_box']">
              <div :class="['card_arrow2']">
                <img src="/media/icon_arrow.svg" class="card_arrow_img" alt="icon" />
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div :class="['no_container']">
            <img src="/media/placeholder.svg" :class="['no_img']" />
            <span :class="['no_span']">没有应用信息，刷新一下试试吧</span>
          </div>
        </template>
      </template>
      <template v-else>
        <div :class="['no_container']">
          <img src="/media/icon_loading.png" :class="['icon_loading', 'rotate-element']" />
          <span :class="['no_span']">loading..</span>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.card_mid {
  width: 182px;
  margin-left: 12px;
  margin-right: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card_name {
  font-size: 16px;
  font-weight: bold;
  line-height: normal;
  letter-spacing: normal;
  color: #000000;
  margin-bottom: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card_des {
  font-size: 13px;
  line-height: normal;
  letter-spacing: normal;
  color: rgba(0, 0, 0, 0.45);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card_arr_box {
  display: flex;
  align-items: center;
}

.card_arrow2 {
  width: 44px;
  height: 32px;
  border-radius: 20px;
  background-color: rgba(0, 104, 255, 0.06);
  display: flex;
  align-items: center;
  justify-content: center;
}
.no_img {
  width: 120px;
  height: 120px;
  margin-bottom: 16px;
}

.icon_loading {
  width: 40px;
  height: 40px;
  margin-bottom: 10px;
}

.rotate-element {
  animation: rotateAnimation 4s linear infinite; /* 应用旋转动画 */
}

/* 定义旋转动画 */
@keyframes rotateAnimation {
  from {
    transform: rotate(0deg); /* 从0度开始旋转 */
  }
  to {
    transform: rotate(360deg); /* 旋转一周（360度） */
  }
}

.no_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 91px;
}

.no_span {
  font-size: 15px;
  font-weight: normal;
  line-height: normal;
  text-align: center;
  letter-spacing: normal;
  color: rgba(0, 0, 0, 0.45);
}

.topBar_img {
  width: 40px;
  height: 40px;
}

.post_img {
  width: 120px;
  height: 24px;
}

.post_img2 {
  width: 136px;
  height: 32px;
}

.card_img_img {
  width: 64px;
  height: 64px;
  transform: scale(0.8);
}

.card_arrow_img {
  width: 20px;
  height: 20px;
}
</style>
