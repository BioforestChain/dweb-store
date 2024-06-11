<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue'
import { type AppInfo, type ConfigData } from '../../type/app'
import defaultImg from '../../assets/media/placeholder.svg'
import img_allApp from '../../assets/media/allApp.png'
import applistService from '../../component/applist'

const apps = ref([] as AppInfo[])

const apps_all = ref([] as AppInfo[])

const inputValue = ref('')

const showTip = ref(false)

const showImageViewer = ref(false)

const email = '224545yu88@gmail.com'

onMounted(async () => {
  
  try {
    const applist = await applistService.getApplist()
    //  数据解析
    apps_all.value = applist
    // apps作用于真实显示的应用
    apps.value = apps_all.value
    console.log('获取到的应用信息--------', apps.value)
  } catch (error) {
    console.error('获取应用信息失败--------', error);
  }

})

watch(
  inputValue,
  (value) => {
    filterApps(value)
  }
)

const onError = (e: Event) => {
  const target = e.target as HTMLImageElement
  target.src = defaultImg
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

const openApp = (app: AppInfo) => {
  applistService.jumpApp(app, null)

  // applistService.jumpApp(app, () => {
  //   console.log('pc端打开应用失败，无提示')
  //   // if (ref_dialog.value) {
  //   //   ref_dialog.value.showPopup()
  //   // }
  // })
}

const openToast = () => {
    showTip.value = true
}

const closeToast = () => {
    showTip.value = false
}

const copyEamil = () => {
  // 创建一个临时输入框
  const tempInput = document.createElement('input');
  // 将文本内容赋值给临时输入框的值
  tempInput.value = email;
  // 将临时输入框添加到文档中
  document.body.appendChild(tempInput);
  // 选中临时输入框中的文本内容
  tempInput.select();
  // 执行复制操作
  document.execCommand('copy');
  // 移除临时输入框
  document.body.removeChild(tempInput);

  alert('邮箱已复制到剪贴板');
}

const setVisible = (visible: boolean) => {
  showImageViewer.value = visible
}
</script>


<template>
  <!-- 弹窗 -->
  <!-- <div v-if="showTip" class="post_tip">
    <img src="../../assets/media/icon_info_blue.svg" :class="['post_tip_info']">
    <div>当前 Dweb Metaverse 仅支持在移动端 DwebBrowser 中安装程序。请在手机登录网址重试。</div>
    <img src="../../assets/media/icon_x.svg" :class="['post_tip_x']">
  </div> -->
  <div v-if="showTip" class="toast_overlay" @click="closeToast"></div>
  <div v-if="showTip" class="toast">
    <img src="../../assets/media/close_black.svg" class="close" @click="closeToast">
    <!-- 这里放置弹窗内容 -->
    <div class="title">Dweb Metaverse</div>
    <div class="subTitle">区块链，NFT，交易，钱包</div>

    <img src="../../assets/media/toast_message.svg" class="img_message">

    <div class="email_container">
      <span>{{email}}</span>
      <img src="../../assets/media/copy.svg" @click="copyEamil">
    </div>
  </div>
  <!-- 主内容 -->
  <main relative ::class="['container']">
    <div :class="['container2']"> 
      <div :class="['bgColor_top']"></div>
      <div :class="['bgColor_bottom']"></div>
      <div :class="['topBar']">
        <div class="alignCenter">
          <img src="../../assets/media/logo.svg" class="topBar_img" alt="logo">
          <span :class="['topBar_title']">Dweb Metaverse</span>
        </div>
          
        <!-- <div class="alignCenter topbar_linkContaine" @click="$router.push('/linkPc')">
          <img src="../../assets/media/icon_link.svg" class="topBar_link_icon" alt="link">
          <span class="topBar_link">链接</span>
        </div> -->
      </div>
      <a-image
          :style="{ display: 'none' }"
          :preview="{
            visible: showImageViewer,
            onVisibleChange: setVisible,  
          }"
          :src="img_allApp"
        />
      <div class="pc_container">
        <div class="relative">
          <a-carousel :class="['post_container']" :autoplay="true">
            <div class="swipe-item">
              <img src="../../assets/media/headerBg_pc.png" class="post_container_bg" alt="post_container_bg">
              <div :class="['post_title_box']">
                欢迎来到 Dweb Metaverse
              </div>
              
              <div :class="['post_img_box']">
                <img src="../../assets/media/banner_font.svg" class="post_img" alt="post_text">
              </div>
              
              <div :class="['post_bottom']">
                <img src="../../assets/media/icon_info.svg" :class="['post_bottom_img']" alt="icon">
                <span :class="['post_bottom_span']">应用将安装于 Dweb Browser 中</span>
              </div>
            </div>
            <!-- <div class="swipe-item">
              <img src="../../assets/media/headerBg_pc.png" class="post_container_bg" alt="post_container_bg">
              <div :class="['post_title_box']">
                Web3元宇宙生态基金会工具库
              </div>
              
              <img @click="setVisible(true)" src="../../assets/media/banner_font3.svg" class="post_img_box" alt="post_text">
              
              <div :class="['post_bottom']">
                <img src="../../assets/media/icon_info.svg" :class="['post_bottom_img']" alt="icon">
                <span :class="['post_bottom_span']">应用将安装于 Dweb Browser 中</span>
              </div>
            </div> -->
          </a-carousel>
        </div>
        
        <div :class="['content_title']">
          <span :class="['content_title_span']">应用</span>
          <div class="content_title_right">
            <div class="content_title_serarch_box">
              <img src="../../assets/media/icon_search.svg" :class="['content_title_search_icon']" alt="icon">
              <input v-model="inputValue" class="content_title_input" placeholder="搜索应用">
              <span class="content_title_search_span">搜索</span>
            </div>
            <div :class="['content_title_right']">{{ '全部 ' + apps.length || 0 }}</div>
          </div>
        </div>

        <div :class="['content_container']">
          <template v-if="apps.length > 0">
            <div v-for="(app) in apps" @click="openApp(app)" :class="['content_card']" :key="app.name">
              <div :class="['card_image_box']">
                <div :class="['card_img']">
                  <img :src="app.logo" class="card_img_img"  @error="e => onError(e)" alt="icon">
                </div>
              </div>
              <div :class="['card_mid']">
                <div :class="['card_name']">{{ app.name }}</div>
                <div :class="['card_des']">{{ app.description }}</div>
              </div>
              <div :class="['card_arr_box']">
                <div :class="['card_arrow2']">
                  <img src="../../assets/media/icon_arrow.svg" class="card_arrow_img" alt="icon">
                </div>
              </div>
              <div :class="['card_line']"></div>
            </div>
          </template>
          <template v-else>
            <div :class="['no_container']">
              <img src='../../assets/media/placeholder.svg' :class="['no_img']">
              <span :class="['no_span']">没有应用信息，刷新一下试试吧</span>
            </div>
          </template>
        </div>
      </div>
    </div>
    <!-- <div class="bottomBar w-full bg-white">
      <div class="buttons">
        <div @click="$router.push('/contactusPc')">
          <div class="img_tellus"></div>
          <span>在线反馈</span>
        </div>
        <div @click="openToast()">
          <div class="img_contactus"></div>
          <span>联系我们</span>
        </div>
      </div>
    </div> -->
  </main>
</template>


<style scoped lang="scss">
.container {
  overflow-x: hidden; 
  position: relative; 
  min-height: 100vh; 
  background: #F7F9FD;
  width: 370px;
}

.pc_container {
  width: 1024px;
  height: auto;
}

.bgColor_top {
  position: absolute; 
  opacity: 0.8; 
  left: -140px;
  top: -140px;
  width: 280px;
  height: 280px;
  background: #34F1FF; 
  filter: blur(150px);
}

.bgColor_bottom {
  position: absolute; 
  opacity: 0.8; 
  right: -140px;
  top: 11px;
  width: 280px;
  height: 280px;
  background: #0068FF;
  filter: blur(150px);
}

.toast_overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 半透明遮罩 */
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
  width: 480px;
  height: 400px;
  border-radius: 16px;
  background-image: url('../../assets/media/toastBg.png'); /* 设置背景图片 */
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
    right: 40px;
    top: 40px;
    cursor: pointer;
  }

  .img_message {
    width: 150px;
    height: 150px;

    margin-top: 8px;
    margin-left: 165px;
  }

  .title {
    font-family: Source Han Sans;
    font-size: 32px;
    font-weight: bold;
    line-height: normal;
    text-align: center;
    letter-spacing: 0em;

    font-variation-settings: "opsz" auto;
    font-feature-settings: "kern" on;
    color: #0068FF;

    margin-top: 56px;
    text-align: center;
  }

  .subTitle {
    font-family: Source Han Sans;
    font-size: 16px;
    font-weight: normal;
    line-height: normal;
    text-align: center;
    letter-spacing: 0em;

    font-feature-settings: "kern" on;
    color: #000000;

    margin-top: 4px;
    text-align: center;
  }

  .email_container {
    width: 348px;
    height: 56px;
    border-radius: 28px;
    opacity: 1;

    background: rgba(0, 104, 255, 0.06);

    margin-left: 68px;

    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 24px;

    span {
      font-family: Source Han Sans;
      font-size: 16px;
      font-weight: normal;
      line-height: normal;
      letter-spacing: 0em;

      font-feature-settings: "kern" on;
      color: #000000;
    }

    img {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }
  }
}

.bottomBar {
  height: 56px;
  .buttons {
    width: 1024px;
    margin: 0 auto;
    display: flex;
    flex-direction: row;
    div {
      cursor: pointer;
      width: 102px;
      height: 32px;
      border-radius: 20px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      .img_tellus {
        width: 18px;
        height: 18px;
        background: url('../../assets/media/tellus.png');
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-attachment: local;
      }
      .img_contactus {
        width: 18px;
        height: 18px;
        background: url('../../assets/media/message.png');
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

        color: rgba(0, 0, 0, 0.65);
        margin-left: 4px;
      }
      &:hover {
        background: rgba(0, 104, 255, 0.06);
        span {
          color: #0068FF;
        }

        .img_tellus {
          width: 18px;
          height: 18px;
          background: url('../../assets/media/tellus1.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: local;
        }

        .img_contactus {
          width: 18px;
          height: 18px;
          background: url('../../assets/media/message1.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: local;       
        }
      }
    }
  }
}

.topBar {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 1440px;
  height: 72px;
  opacity: 1;
  display: flex;
  align-items: center;

  background: rgba(255, 255, 255, 0.6);

  backdrop-filter: blur(32px);
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
}

.topBar_link_icon {
  width: 16px;
  height: 16px;
}

.alignCenter {
  display: flex;
  align-items: center;
  /* justify-content: center; */
}

.topbar_linkContaine {
  width: 80px;
  height: 32px;
  border-radius: 20px;
  background-color: rgba(0, 104, 255, 0.06);
  justify-content: center;
  margin-right: 32px;
  cursor: pointer;
}

.topBar_link {
  font-family: Source Han Sans;
  font-size: 16px;
  font-weight: normal;
  line-height: normal;
  text-align: right;
  letter-spacing: 0em;

  color: #0068FF;
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

.post_container {
  box-sizing: border-box;
  width: 1024px;
  height: 236px;
  border-radius: 24px;
  opacity: 1;
  background-size: cover;
  background-position: center;
  background-attachment: local;
  position: relative;
  /* overflow: hidden; */
  /* padding: 32px 40px; */
  border: 0.5px solid rgba(0, 0, 0, 0.08);
  z-index: 1;
  margin-top: 112px;
}
// .post_tip {
//   position: fixed;
//   left: 394px;
//   top: 88px;
//   width: 652px;
//   height: 40px;
//   border-radius: 12px;
//   opacity: 1;

//   background: rgba(255, 255, 255, 0.8);

//   box-sizing: border-box;
//   border: 0.5px solid rgba(0, 104, 255, 0.32);

//   backdrop-filter: blur(10px);
//   font-size: 14px;
//   font-weight: normal;
//   line-height: normal;
//   letter-spacing: 0em;

//   color: #0068FF;

//   display: flex;
//   align-items: center;
//   justify-content: center;
//   z-index: 100;

//   .post_tip_info {
//     width: 14px;
//     height: 14px;
//     margin-right: 4px;
//   }

//   .post_tip_x {
//     width: 14px;
//     height: 14px;
//     top: 13px;
//     right: 12px;
//   }
// }

.post_container_bg {
  width: 1024px;
  height: 236px;
  border-radius: 24px;
  background-size: cover;
  background-position: center;
  background-attachment: local;
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 1;
}

.swipe-item {
  padding: 32px 40px;
  width: 1024px;
  height: 236px;
  box-sizing: border-box;
  position: relative;
}

.post_container {
  :deep(li) {
    button {
      background-color: rgba(0, 0, 0, 0.24);
      opacity: 1;
    }
    &.slick-active {
      button {
        background-color: #0068FF !important;
      }
    }
  }
} 

.post_title_box {
  font-size: 40px;
  font-weight: bold;
  line-height: normal; /* 这里的 "normal" 可能需要根据你的设计替换为实际的 line-height 值 */
  letter-spacing: normal; /* 这里的 "normal" 可能需要根据你的设计替换为实际的 letter-spacing 值 */
  color: #000; /* 或者你想要的黑色颜色 */
  height: 58px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
}

.post_img_box {
  margin-top: 8px;
  width: 180px;
  height: 38px;
  border-radius: 18px;
  opacity: 1;
  background-color: #0068FF;
  box-sizing: border-box;
  border: 0.5px solid rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
}

.post_bottom {
  width: 238px;
  height: 32px;
  border-radius: 16px;
  opacity: 1;
  background: rgba(0, 0, 0, 0.06);
  box-sizing: border-box;
  border: 0.5px solid rgba(0, 0, 0, 0.06);
  backdrop-filter: blur(16px);

  display: flex;
  align-items: center;
  justify-self: center;
  padding-left: 12px;
  margin-top: 36px;
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

.content_title_right {
  font-size: 14px;
  font-weight: medium;
  text-align: right;
  line-height: normal; /* 根据需要替换为具体的行高值 */
  letter-spacing: normal;
  color: rgba(0, 0, 0, 0.65);
  margin-left: 38px;

  display: flex;
  align-items: center;
}

.content_title_serarch_box {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  box-sizing: border-box;
  border: 0.5px solid rgba(0, 0, 0, 0.08);
  /* width: 256px; */
  height: 32px;
  border-radius: 16px;
  padding: 0px 16px;
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

  color: #0068FF;
  padding-left: 12px;
  border-left: 1px solid rgba(0,0,0,0.06);
}

.content_container {
  width: 1024px;
  margin-bottom: 36px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.content_card {
  display: flex;
  width: 510px;
  border-radius: 20px;
  min-height: 88px;
  position: relative;
  padding: 12px;
  box-sizing: border-box;
  margin-bottom: 16px;
}

.content_card:hover {
  background-color: rgba(0, 104, 255, 0.06);
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
  width: 360px;
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
  /* border-radius: 20px; */
  /* background-color: rgba(0, 104, 255, 0.06); */
  display: flex;
  align-items: center;
  justify-content: center;
}

.card_line {
  position: absolute;
  left: 12px;
  width: 484px;
  bottom: 0;
  height: 0;
  opacity: 0.06;
  border: 0.5px solid #000000;
}

.no_img {
  width: 120px;
  height: 120px;
  margin-bottom: 16px;
}

.no_container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 91px;
  margin-left: 407px
}

.no_span {
  font-size: 15px;
  font-weight: normal;
  line-height: normal;
  text-align: center;
  letter-spacing: normal;
  color: rgba(0, 0, 0, 0.45);
}
.container2 {
  position: relative;
  overflow: hidden;
  z-index: 10;
  display: flex;
  justify-content: center;
}

.topBar_img {
  width: 48px;
  height: 48px;
  margin-left: 32px;
}

.post_img {
  width: 120px;
  height: 24px;
}

.card_img_img {
  width: 64px;
  height: 64px;
  transform: scale(0.8);
}

.card_arrow_img{
  width: 24px;
  height: 24px;
}
</style>