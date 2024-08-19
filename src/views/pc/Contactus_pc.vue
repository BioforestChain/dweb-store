<script lang="ts" setup>
import { onMounted } from 'vue'

onMounted(() => {})
</script>

<template>
  <div :class="['container2']">
    <div :class="['bgColor_top']"></div>
    <div :class="['bgColor_bottom']"></div>
    <div :class="['topBar']">
      <div class="alignCenter" @click="$router.push('/')">
        <img src="/media/logo.svg" class="topBar_img" alt="logo" />
        <span :class="['topBar_title']">Dweb Metaverse</span>
      </div>
    </div>

    <!-- <div class="formContainer">
        <div class="title">
          <img src="/media/tellus.svg" alt="icon">
          <span>在线反馈</span>
        </div>
        <iframe src="https://developer.bfmeta.org/zh/dweb%e5%ba%94%e7%94%a8/">

        </iframe>
      </div> -->
  </div>
</template>

<style scoped lang="scss">
.formContainer {
  width: 480px;
  height: 571px;
  border-radius: 16px;

  background: #ffffff;

  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.06);
  margin: 0 auto;
  margin-top: 136px;
  padding: 40px 32px;

  iframe {
    width: 100%;
    height: 90%;
    border: none;
  }

  .title {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    img {
      width: 32px;
      height: 32px;
      margin-right: 8px;
    }

    span {
      font-family: Source Han Sans;
      font-size: 28px;
      font-weight: bold;
      line-height: normal;
      letter-spacing: 0em;
    }
  }
}
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

.topBar_title {
  font-size: 28px;
  font-weight: bold;
  line-height: normal; /* 这里的 "normal" 可能需要根据你的设计替换为实际的 line-height 值 */
  letter-spacing: normal; /* 这里的 "normal" 可能需要根据你的设计替换为实际的 letter-spacing 值 */
  color: #000; /* 或者你想要的黑色颜色 */
  margin-left: 4px;
}
</style>
