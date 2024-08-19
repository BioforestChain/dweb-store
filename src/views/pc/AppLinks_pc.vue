<template>
  <!-- 弹窗 -->
  <div v-if="showTip" class="post_tip">
    <img src="/media/icon_info_blue.svg" :class="['post_tip_info']" />
    <div>当前 Dweb Metaverse 仅支持在移动端 DwebBrowser 中安装程序。请在手机登录网址重试。</div>
    <img src="/media/icon_x.svg" :class="['post_tip_x']" />
  </div>
  <!-- 主内容 -->
  <!-- topbar -->
  <div :class="['container2']">
    <div :class="['bgColor_top']"></div>
    <div :class="['bgColor_bottom']"></div>
    <div :class="['topBar']">
      <div class="alignCenter" @click="$router.push('/')">
        <img src="/media/logo.svg" class="topBar_img" alt="logo" />
        <span :class="['topBar_title']">Dweb Metaverse</span>
      </div>

      <div class="alignCenter topbar_linkContaine" @click="$router.push('/linkPc')">
        <img src="/media/icon_link.svg" class="topBar_link_icon" alt="link" />
        <span class="topBar_link">链接</span>
      </div>
    </div>

    <!-- 应用信息 -->
    <div class="applistContainer">
      <div class="linkBox">
        <img src="/media/icon_back_pc.svg" @click="$router.push('/')" />
        <span> Web3元宇宙生态基金会工具库 </span>
        <span></span>
      </div>
      <!-- 集合列表 -->
      <div class="appCelection" v-for="(item, index) in all_products" :key="index">
        <!-- 集合背景 -->
        <div
          class="bg"
          :style="`background: linear-gradient(180deg, ${item.themeColor} 21%, ${hexToRgb(
            item.themeColor,
            0.45
          )} 62%, rgba(247, 249, 253, 0) 100%)`"
        ></div>
        <!-- 集合标题 -->
        <div class="titleBox">
          <img :src="item.icon" />
          <span class="title">{{ item.name }}</span>
          <span class="number">{{ item.applist.length }}</span>
        </div>
        <!-- 集合应用列表 -->
        <div class="appListBox">
          <div class="appBlock" v-for="appinfo in item.applist" :key="appinfo.name">
            <div class="flex flex-row items-center">
              <div class="flex justify-center items-center">
                <div class="imgBox">
                  <img :src="appinfo.logo" @error="(e) => onError(e)" alt="icon" />
                </div>
              </div>
              <span class="appName">
                {{ appinfo.name }}
              </span>
            </div>
            <!-- 按钮列表 -->
            <div class="btnsBox">
              <div class="btn" v-if="appinfo.website" @click="jumpWebsite(appinfo)">
                <img src="/media/icon-website.svg" alt="icon" />
                <span>官网</span>
              </div>
              <div class="btn" v-if="appinfo.metadata" @click="openApp()">
                <img src="/media/icon-download.svg" alt="icon" />
                <span>下载</span>
              </div>
              <div class="btn" v-if="appinfo.community" @click="jumpCommunity(appinfo)">
                <img src="/media/icon-community.svg" alt="icon" />
                <span>社区</span>
              </div>
              <div class="btn" v-if="appinfo.tracker" @click="jumpBrowser(appinfo)">
                <img src="/media/icon-browser.svg" alt="icon" />
                <span>浏览器</span>
              </div>
            </div>
          </div>
        </div>
        <!-- end -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import applistService from '../../component/applist'
import { hexToRgb } from '../../help/index'
import { type AppInfo, type ProductSetByType } from '../../type/app'
import defaultImg from '/media/placeholder.svg'

const all_products = ref<ProductSetByType[] | undefined>([])

const showTip = ref(false)

const timer = ref(0)

onMounted(async () => {
  try {
    const d = (await applistService.getAllProduct()) as ProductSetByType[]
    all_products.value = d
    console.log('获取所有产品--------', d)
  } catch (error) {
    console.error('获取所有产品失败--------', error)
  }
})

const openApp = () => {
  showTip.value = true

  if (timer.value) {
    clearTimeout(timer.value)
  }

  timer.value = setTimeout(() => {
    showTip.value = false
  }, 2000)
}

const jumpWebsite = (appInfo: AppInfo) => {
  console.log('跳转官网')
  applistService.jumpWebsite(appInfo)
}

const jumpCommunity = (appInfo: AppInfo) => {
  console.log('跳转社区')
  applistService.jumpCommunity(appInfo)
}

const jumpBrowser = (appInfo: AppInfo) => {
  console.log('跳转浏览器')
  applistService.jumpBrowser(appInfo)
}

// 图片加载失败时，显示默认图片
const onError = (e: Event) => {
  const target = e.target as HTMLImageElement
  target.src = defaultImg
}
</script>
<style scoped lang="scss">
.container2 {
  position: relative;
  overflow: hidden;
  z-index: 10;
  display: flex;
  justify-content: center;
  min-height: 100vh;
}
.bgColor_top {
  position: absolute;
  opacity: 0.8;
  left: -140px;
  top: -140px;
  width: 280px;
  height: 280px;
  background: #34f1ff;
  filter: blur(150px);
}

.bgColor_bottom {
  position: absolute;
  opacity: 0.8;
  right: -140px;
  top: 11px;
  width: 280px;
  height: 280px;
  background: #0068ff;
  filter: blur(150px);
}

.topBar {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 1440px;
  height: 72px;
  padding-left: 32px;
  padding-right: 32px;
  opacity: 1;
  box-sizing: border-box;
  display: flex;
  align-items: center;

  background: rgba(255, 255, 255, 0.6);

  backdrop-filter: blur(32px);
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

.topBar_link_icon {
  width: 16px;
  height: 16px;
}

.topbar_linkContaine {
  width: 80px;
  height: 32px;
  border-radius: 20px;
  background-color: rgba(0, 104, 255, 0.06);
  justify-content: center;
  cursor: pointer;
}

.topBar_link {
  font-family: Source Han Sans;
  font-size: 16px;
  font-weight: normal;
  line-height: normal;
  text-align: right;
  letter-spacing: 0em;

  color: #0068ff;
  margin-left: 2px;
}

.topBar_title {
  font-size: 28px;
  font-weight: bold;
  line-height: normal; /* 这里的 "normal" 可能需要根据你的设计替换为实际的 line-height 值 */
  letter-spacing: normal; /* 这里的 "normal" 可能需要根据你的设计替换为实际的 letter-spacing 值 */
  color: #000; /* 或者你想要的黑色颜色 */
  margin-left: 4px;
}

// 应用信息
.applistContainer {
  width: 100%;
  height: auto;
  z-index: 1;
  margin-top: 94px;
  margin-bottom: 90px;

  .linkBox {
    width: 800px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    img {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }

    span {
      font-size: 18px;
      font-weight: 500;
      line-height: normal;
      cursor: pointer;

      color: #0068ff;
    }
  }
}

.appCelection {
  width: 800px;
  min-height: 200px;
  position: relative;
  overflow: hidden;
  margin-bottom: 16px;
  background-color: #f7f9fd;
  border-radius: 16px;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.08);
  z-index: -10;
  margin: 0 auto;
  margin-top: 12px;

  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 800px;
    height: 150px;
    z-index: -10;
  }

  .titleBox {
    height: 54px;
    display: flex;
    align-items: center;
    img {
      width: 28px;
      height: 28px;
      margin-left: 24px;
      margin-right: 8px;
    }

    .title {
      font-size: 20px;
      font-weight: bold;
      line-height: normal;
      color: #ffffff;
    }
    .number {
      font-size: 20px;
      font-weight: 300;
      line-height: normal;

      color: #ffffff;
      margin-left: 4px;
    }
  }

  .appListBox {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    padding-left: 16px;
  }

  .appBlock {
    width: 378px;
    height: 116px;
    box-sizing: border-box;
    padding: 12px;
    margin-bottom: 12px;
    margin-right: 12px;
    border-radius: 8px;
    background-color: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.08);

    .imgBox {
      width: 48px;
      height: 48px;
      border: 1px solid rgba(0, 0, 0, 0.08);
      border-radius: 16px;
      overflow: hidden;
      background-color: #ffffff;
      img {
        width: 48px;
        height: 48px;
        transform: scale(0.8);
      }
    }

    .appName {
      font-size: 16px;
      font-weight: bold;
      line-height: normal;

      color: #000000;
      margin-left: 8px;
    }
  }

  .btnsBox {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 8px;
    margin-top: 12px;

    .btn {
      height: 32px;
      border-radius: 20px;
      background: rgba(0, 104, 255, 0.06);
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      img {
        width: 14px;
        height: 14px;
        margin-right: 2px;
      }

      span {
        font-size: 12px;
        font-weight: normal;

        color: #0068ff;
      }
    }
  }
}

// 弹窗
.post_tip {
  position: fixed;
  left: 394px;
  top: 88px;
  width: 652px;
  height: 40px;
  border-radius: 12px;
  opacity: 1;

  background: rgba(255, 255, 255, 0.8);

  box-sizing: border-box;
  border: 0.5px solid rgba(0, 104, 255, 0.32);

  backdrop-filter: blur(10px);
  font-size: 14px;
  font-weight: normal;
  line-height: normal;
  letter-spacing: 0em;

  color: #0068ff;

  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;

  .post_tip_info {
    width: 14px;
    height: 14px;
    margin-right: 4px;
  }

  .post_tip_x {
    width: 14px;
    height: 14px;
    top: 13px;
    right: 12px;
  }
}
</style>
