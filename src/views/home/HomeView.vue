<script lang="ts" setup>
import { type AppInfo } from '@/type/app'
import { onMounted, ref, watch } from 'vue'

// import testImg from '/media/allApp.png'
import applistService from '@/component/applist'

// 组件
// import 'vant/es/image-preview/style';

// 自写组件
import Dialog from './dialog_downloadBroser.vue'

const apps = ref([] as AppInfo[])
const apps_all = ref([] as AppInfo[])
const inputValue = ref('')
const inputFocus = ref(false)
const scrollAnchor = ref()

const showImageViewer = ref(false)
const isLandscape = ref(false)

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

watch(inputValue, (value) => {
  filterApps(value)
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

const filterApps = (value: string) => {
  if (value === '') {
    apps.value = apps_all.value
  } else {
    apps.value = apps_all.value.filter((app) => {
      return app.name.toLocaleLowerCase().indexOf(value.toLocaleLowerCase()) > -1
    })
  }
}

// 点击输入框时，获取焦点
const handleFocus = () => {
  inputFocus.value = true
  // console.log('focus11', document.documentElement.scrollTop, window.pageYOffset, document.body.scrollTop)

  // 获取焦点后，滚动到目标元素
  const targetElement = scrollAnchor.value

  if (targetElement) {
    // 使用原生 JavaScript 的 scrollTo 方法滚动到目标元素的位置
    targetElement.scrollIntoView({
      behavior: 'auto', // 可以使用 'auto' 或 'smooth' 控制滚动动画
      block: 'start' // 滚动到目标元素的起始位置
    })
  }
}

// 失去焦点时，清空输入框内容
const handleBlur = () => {
  inputFocus.value = false

  inputValue.value = ''
}

// 图片加载失败时，显示默认图片
const onError = (e: Event) => {
  const target = e.target as HTMLImageElement
  target.src = '/media/placeholder.svg'
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

// 阻止滚动事件传播
const handleScroll = (event: { stopPropagation: () => void }) => {
  event.stopPropagation()
}

// const images = [testImg];

const closeImageViewer = () => {
  showImageViewer.value = false
  isLandscape.value = false
  document.body.style.overflow = 'auto'
}

const openImageViewer = () => {
  showImageViewer.value = true
}

/** 是否旋转图片 */
const toggleLandscape = () => {
  isLandscape.value = !isLandscape.value
}

const showTip = ref(false)
const email = '224545yu88@gmail.com'

const openToast = () => {
  showTip.value = true
}

const closeToast = () => {
  showTip.value = false
}

const copyEamil = () => {
  // 创建一个临时输入框
  const tempInput = document.createElement('input')
  // 将文本内容赋值给临时输入框的值
  tempInput.value = email
  // 将临时输入框添加到文档中
  document.body.appendChild(tempInput)
  // 选中临时输入框中的文本内容
  tempInput.select()
  // 执行复制操作
  document.execCommand('copy')
  // 移除临时输入框
  document.body.removeChild(tempInput)

  alert('邮箱已复制到剪贴板')
}
</script>

<template>
  <!-- 下载dweb弹窗 -->
  <Dialog ref="ref_dialog"></Dialog>

  <!-- 联系我们弹窗 -->
  <div v-if="showTip" class="toast_overlay" @click="closeToast"></div>
  <div v-if="showTip" class="toast">
    <img src="/media/close_black.svg" class="close" @click="closeToast" />
    <!-- 这里放置弹窗内容 -->
    <div class="title">Dweb Metaverse</div>
    <div class="subTitle">区块链，NFT，交易，钱包</div>

    <img src="/media/toast_message.svg" class="img_message" />

    <div class="email_container">
      <span>{{ email }}</span>
      <img src="/media/copy.svg" @click="copyEamil" />
    </div>
  </div>

  <!-- <van-image-preview class="imageDialog" v-model:show="showImageViewer" :close-on-click-image="false" :close-on-click-overlay="false" :show-index="false" :images="images">
    <template v-slot:cover>
      <div
        @click="closeImageViewer"
        class="absolute bottom-[40px] left-[159px] pointer-events-auto rounded-[20px] opacity-100 box-border border-[0.5px] border-solid border-[rgba(255,255,255,0.45)]"
      >
        <div class="flex justify-center items-center flex-row w-[70px] h-[28px]">
          <img src="/media/close.svg" class="w-[16px] h-[16px] mr-[2px]" alt="close" />
          <div class="text-white text-[14px]">关闭</div>
        </div>
      </div>
      <img
          @click="toggleLandscape"
          src="/media/landscape.svg"
          class="absolute bottom-[40px] right-[32px] pointer-events-auto"
          alt="landscape"
        />
    </template>
  </van-image-preview> -->
  <!-- 全部app图片查看器 -->
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

  <!-- 页面 -->
  <main relative>
    <div :class="['container2']">
      <div :class="{ bgColor: true }"></div>
      <div :class="['topBar']">
        <div class="alignCenter">
          <img src="/media/logo.svg" class="topBar_img" alt="logo" />
          <span :class="['topBar_title']">Dweb Metaverse</span>
        </div>
        <!-- <div class="alignCenter topbar_linkContaine" @click="$router.push('/link')">
          <img src="/media/icon_link.svg" class="topBar_link_icon" alt="link" />
          <span class="topBar_link">链接</span>
        </div> -->
      </div>

      <van-swipe class="post_container" :autoplay="3000" indicator-color="white">
        <van-swipe-item class="p-[24px] !w-[342px] !h-[220px] box-border">
          <img src="/media/headerBg.png" class="post_container_bg" alt="post_container_bg" />
          <div :class="['post_title_box']">
            <div>欢迎来到</div>
            <div>Dweb Metaverse</div>
          </div>

          <div :class="['post_img_box']">
            <img src="/media/banner_font.svg" class="post_img" alt="post_text" />
          </div>
        </van-swipe-item>

        <!-- <van-swipe-item
          class="p-[24px] !w-[342px] !h-[220px] box-border"
          @click="openImageViewer()"
        >
          <img
            src="/media/headerBg.png"
            class="post_container_bg"
            alt="post_container_bg"
          />
          <div :class="['post_title_box']">
            <div>Web3元宇宙</div>
            <div>生态基金会工具库</div>
          </div>

          <div :class="['post_img_box', 'w-[136px]']">
            <img src="/media/banner_font2.svg" class="post_img2" alt="post_text" />
          </div>
        </van-swipe-item> -->

        <template>
          <!-- <div class="custom-indicator flex flex-row">
            <div
              class="w-[8px] h-[4px] mr-[4px] mb-[8px] rounded-[2px]"
              :class="[active === 0 ? '!bg-[#0068FF]' : 'bg-[rgba(0,_0,_0,_0.12)]']"
            ></div>
            <div
              class="w-[8px] h-[4px] mr-[4px] mb-[8px] rounded-[2px]"
              :class="[active === 1 ? '!bg-[#0068FF]' : 'bg-[rgba(0,_0,_0,_0.12)]']"
            ></div>
          </div> -->
          <div :class="['post_bottom']">
            <img src="/media/icon_info.svg" :class="['post_bottom_img']" alt="icon" />
            <span :class="['post_bottom_span']">应用将安装于 Dweb Browser 中</span>
          </div>
        </template>
      </van-swipe>
      <!-- <div ref="scrollAnchor" class="scrollAnchor"></div> -->
      <div ref="scrollAnchor" style="width: 100%; height: 0%"></div>

      <div :class="['content_title']">
        <span v-if="!inputFocus" :class="['content_title_span']">应用</span>
        <div :class="['content_title_serarch_box']">
          <img src="/media/icon_search.svg" :class="['content_title_search_icon']" alt="icon" />
          <input
            v-model="inputValue"
            @focus="handleFocus"
            @blur="handleBlur"
            :class="['content_title_input', inputFocus ? 'inputFocus' : '']"
            placeholder="搜索应用"
          />
          <img
            v-if="inputValue.length > 0"
            src="/media/icon_inputX.svg"
            class="content_title_input_close"
          />
          <!-- <span v-if="inputFocus" class="content_title_search_span">搜索</span> -->
        </div>
        <!-- <div :class="['content_title_right']">{{ '全部 ' + apps.length || 0 }}</div> -->
      </div>

      <div :class="['content_container']">
        <template v-if="initData">
          <template v-if="apps.length > 0">
            <div
              v-for="app in apps"
              :class="['content_card']"
              :key="app.name"
              @click="openApp(app as AppInfo)"
            >
              <div :class="['card_image_box']">
                <div :class="['card_img']">
                  <img :src="app.logo" class="card_img_img" @error="(e) => onError(e)" alt="icon" />
                </div>
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
              <div :class="['card_line']"></div>
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

      <!-- <div class="buttons">
          <div @click="$router.push('/contactus')">
            <div class="img_tellus"></div>
            <span>在线反馈</span>
          </div>
          <div @click="openToast">
            <div class="img_contactus"></div>
            <span>联系我们</span>
          </div>
      </div> -->
    </div>
  </main>
</template>

<style scoped lang="scss">
:global(.van-image-preview__cover) {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.container {
  overflow-x: hidden;
  position: relative;
  min-height: 100vh;
  background: #f7f9fd;
  width: 370px;
}

.container2 {
  position: relative;
  overflow: hidden;
  z-index: 1;
  background: #f6f8fd;
}

.bgColor {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  z-index: -1;
  background: linear-gradient(167deg, #c3f5fe 0%, #dbe9fd 27%, #f7f9fd 95%);
}

.toast_overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3); /* 半透明遮罩 */
  z-index: 999; /* 遮罩层在顶部 */
}

.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 10px;
  z-index: 1000; /* 弹窗在遮罩层之上 */
  width: 342px;
  height: 320px;
  border-radius: 16px;
  background-image: url('/media/toastBg.png'); /* 设置背景图片 */
  background-color: white; /* 设置背景颜色为白色 */
  background-size: cover;
  background-position: center;
  /* 背景图片是否重复 */
  background-repeat: no-repeat;
  background-attachment: local;

  // display: flex;
  // justify-content: center;
  // flex-direction: row;
  .close {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 24px;
    top: 24px;
    cursor: pointer;
  }

  .img_message {
    width: 112px;
    height: 112px;

    margin-top: 12px;
    margin-left: 115px;
  }

  .title {
    font-family: Source Han Sans;
    font-size: 24px;
    font-weight: bold;
    line-height: normal;
    text-align: center;
    letter-spacing: 0em;

    font-variation-settings: 'opsz' auto;
    font-feature-settings: 'kern' on;
    color: #0068ff;

    margin-top: 40px;
    text-align: center;
  }

  .subTitle {
    font-family: Source Han Sans;
    font-size: 14px;
    font-weight: normal;
    line-height: normal;
    text-align: center;
    letter-spacing: 0em;

    font-feature-settings: 'kern' on;
    color: #000000;

    margin-top: 4px;
    text-align: center;
  }

  .email_container {
    width: 294px;
    height: 48px;
    border-radius: 28px;
    opacity: 1;

    background: rgba(0, 104, 255, 0.06);

    margin-top: 8px;
    margin-left: 24px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 24px;
    box-sizing: border-box;

    span {
      font-family: Source Han Sans;
      font-size: 14px;
      font-weight: normal;
      line-height: normal;
      letter-spacing: 0em;

      font-feature-settings: 'kern' on;
      color: #000000;
    }

    img {
      width: 16px;
      height: 16px;
      cursor: pointer;
    }
  }
}

.buttons {
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  margin-bottom: 32px;
  justify-content: space-around;

  div {
    width: 177px;
    height: 40px;
    border-radius: 20px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 104, 255, 0.06);
    .img_tellus {
      width: 18px;
      height: 18px;
      background: url('/media/tellus1.png');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-attachment: local;
    }
    .img_contactus {
      width: 18px;
      height: 18px;
      background: url('/media/message1.png');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-attachment: local;
    }
    span {
      font-family: Source Han Sans;
      font-size: 14px;
      font-weight: normal;
      line-height: normal;
      letter-spacing: 0em;
      color: #0068ff;
    }
  }
}

.topBar {
  width: 342px;
  height: 48px;
  padding-left: 24px;
  padding-right: 24px;
  margin-top: 24px;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
}

.alignCenter {
  display: flex;
  align-items: center;
  /* justify-content: center; */
}

.topBar_title {
  font-size: 24px;
  font-weight: bold;
  line-height: normal; /* 这里的 "normal" 可能需要根据你的设计替换为实际的 line-height 值 */
  letter-spacing: normal; /* 这里的 "normal" 可能需要根据你的设计替换为实际的 letter-spacing 值 */
  color: #000; /* 或者你想要的黑色颜色 */
  margin-left: 4px;
}

.topBar_link_icon {
  width: 16px;
  height: 16px;
}

.topBar_link {
  font-family: Source Han Sans;
  font-size: 14px;
  font-weight: normal;
  line-height: normal;
  text-align: right;
  letter-spacing: 0em;

  color: #0068ff;
  margin-left: 2px;
}

.topbar_linkContaine {
  width: 66px;
  height: 28px;
  border-radius: 20px;
  background-color: rgba(0, 104, 255, 0.06);
  justify-content: center;
  /* background: #0068FF; */
}

.post_container {
  box-sizing: border-box;
  width: 342px;
  height: 220px;
  border-radius: 16px;
  opacity: 1;
  margin-left: 24px;
  background-size: cover;
  background-position: center;
  background-attachment: local;
  position: relative;
  overflow: hidden;
  border: 0.5px solid rgba(0, 0, 0, 0.08);
  z-index: 1;
}

.post_container_bg {
  width: 342px;
  height: 220px;
  border-radius: 16px;
  background-size: cover;
  background-position: center;
  background-attachment: local;
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 1;
}

.post_title_box {
  font-size: 28px;
  font-weight: bold;
  line-height: normal; /* 这里的 "normal" 可能需要根据你的设计替换为实际的 line-height 值 */
  letter-spacing: normal; /* 这里的 "normal" 可能需要根据你的设计替换为实际的 letter-spacing 值 */
  color: #000; /* 或者你想要的黑色颜色 */
  height: 79px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.post_img_box {
  margin-top: 12px;
  width: 144px;
  height: 32px;
  border-radius: 18px;
  opacity: 1;
  background-color: #0068ff;
  box-sizing: border-box;
  border: 0.5px solid rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-indicator {
  position: absolute;
  padding-left: 24px;
  left: 0;
  bottom: 32px;
}

.post_bottom {
  position: absolute;
  padding-left: 24px;
  left: 0;
  bottom: 0;
  width: 342px;
  height: 32px;
  background-color: rgba(0, 0, 0, 0.02);
  box-sizing: border-box;
  backdrop-filter: blur(16px); /* 使用适当的值来模拟 "backdrop-blur-lg" */
  display: flex;
  align-items: center;
}

.post_bottom_img {
  width: 16px;
  height: 16px;
  margin-right: 4px;
}

.post_bottom_span {
  font-size: 13px;
  font-weight: normal;
  line-height: 18px;
  letter-spacing: normal;
  color: rgba(0, 0, 0, 0.45);
}

.content_title {
  display: flex;
  align-items: center;
  padding: 0 24px; /* 或者根据需要调整左右内边距 */
  justify-content: space-between;
  margin-top: 24px;
  margin-bottom: 7px;
}

.content_title_span {
  font-size: 22px;
  font-weight: bold;
  line-height: normal; /* 你可以根据需要替换 "normal" 为具体的行高值 */
  letter-spacing: normal;
  color: #000; /* 或者你想要的黑色颜色 */
}

.content_title_serarch_box {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  box-sizing: border-box;
  border: 0.5px solid rgba(0, 0, 0, 0.08);
  /* width: 232px; */
  height: 32px;
  border-radius: 16px;
  padding: 0px 16px;
  position: relative;
}

.content_title_input {
  border: none;
  background: none;
  box-shadow: none;

  width: 156px;
  height: 20px;
  font-size: 14px;
  font-weight: normal;
  line-height: normal;
  letter-spacing: 0em;
  color: rgba(0, 0, 0);
}

.content_title_input::placeholder {
  color: rgba(0, 0, 0, 0.45);
}

.content_title_input:focus {
  overflow: none;
  outline: none;
  width: 282px;
}

.content_title_input_close {
  position: absolute;
  right: 16px;
  top: 6px;
  width: 20px;
  height: 20px;
}

.content_title_search_icon {
  width: 20px;
  height: 20px;
  margin-right: 8px;
}

.content_title_search_span {
  font-size: 14px;
  font-weight: normal;
  line-height: normal;
  letter-spacing: 0em;

  color: #0068ff;
  padding-left: 12px;
  border-left: 1px solid rgba(0, 0, 0, 0.06);
}

.content_container {
  padding-left: 24px;
  padding-right: 24px;
  margin-bottom: 36px;
  min-height: 100vh;
}

.content_card {
  display: flex;
  width: 342px;
  min-height: 92px;
  position: relative;
}

.card_image_box {
  display: flex;
  justify-content: center;
  align-items: center;
}

.card_img {
  width: 64px;
  height: 64px;
  border: 0.5px solid rgba(0, 0, 0, 0.08);
  border-radius: 16px;
  overflow: hidden;
  background-color: #ffffff;
  overflow: hidden;
}

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

.card_line {
  position: absolute;
  left: 76px;
  bottom: 0;
  width: 266px;
  height: 0;
  opacity: 0.06;
  border: 0.5px solid #000000;
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

.scrollAnchor {
  width: 100%;
  height: 0%;
  position: relative;
  top: -10px;
}
</style>
