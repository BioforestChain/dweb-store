<template>
  <div class="pop_container" v-if="show">
    <div class="pop_overlay" @click="closePopup"></div>
    <div class="pop_modal">
      <img src="/media/icon_close.svg" class="pop_close" @click="closePopup" />
      <div class="pop_box">
        <img src="/media/pop_download.svg" class="pop_downloadimg" @click="closePopup" />
        <div class="pop_text1">当前系统未安装 DwebBrowser 程序</div>
        <div class="pop_text2">请先安装 DwebBrowser 后重试</div>
      </div>
      <div class="pop_buttons">
        <div class="pop_cancel">
          <span class="pop_cancel_text" @click="closePopup">取消</span>
        </div>
        <div class="pop_download">
          <span class="pop_download_text" @click="clickDown">前往安装</span>
          <img src="/media/icon_white_arrow.svg" class="pop_button_arrow" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { downloadApp } from '../../help/index'

const show = ref(false)

const closePopup = () => {
  show.value = false
}

const showPopup = () => {
  show.value = true
}

const clickDown = () => {
  const packagename = 'info.bagen.dwebbrowser'
  const iosLinkUrl = `https://apps.apple.com/cn/app/6443558874`
  downloadApp(packagename, iosLinkUrl)
}

defineExpose({ showPopup, closePopup })
</script>

<style lang="scss" scoped>
.pop_container {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 999;
}

.pop_overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vh;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
}

.pop_modal {
  box-sizing: border-box;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 999;
  transform: translate(-50%, -50%);
  position: absolute;
  width: 342px;
  height: 308px;
  border-radius: 16px;
  opacity: 1;
  padding: 24px;
  background: #f7f9fd;
}

.pop_box {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pop_close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  width: 20px;
  height: 20px;
}

.pop_downloadimg {
  width: 88px;
  height: 88px;
  margin-top: 30px;
}

.pop_text1 {
  font-size: 16px;
  font-weight: bold;
  line-height: normal;
  text-align: center;
  letter-spacing: 0em;

  color: #000000;
}

.pop_text2 {
  font-family: Source Han Sans;
  font-size: 12px;
  font-weight: normal;
  line-height: normal;
  text-align: center;
  letter-spacing: 0em;
  margin-top: 12px;
  margin-bottom: 4px;
  color: #000000;
}

.pop_buttons {
  margin-top: 44px;
  display: flex;
  flex-direction: row;
}

.pop_cancel_text {
  font-size: 16px;
  font-weight: 500;
  line-height: 40px;
  letter-spacing: 0em;

  color: #000000;
}

.pop_cancel {
  width: 80px;
  height: 40px;
  border-radius: 20px;

  background: rgba(0, 0, 0, 0.06);
  text-align: center;
}

.pop_download {
  width: 206px;
  height: 40px;
  border-radius: 20px;
  opacity: 1;

  background: #0068ff;
  margin-left: 8px;
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;
}

.pop_button_arrow {
  width: 16px;
  height: 16px;
}

.pop_download_text {
  font-size: 16px;
  font-weight: 500;
  line-height: 40px;
  text-align: center;
  letter-spacing: 0em;
  color: #ffffff;
  margin-right: 2px;
}

.pop_button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
}
</style>
