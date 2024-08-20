<script lang="ts" setup>
const email = '224545yu88@gmail.com'

defineProps({
  showTip: Boolean
})
const emit = defineEmits(['close'])
// 触发对外的关闭事件
const closeToast = () => {
  emit('close')
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
</template>

<style scoped lang="scss">
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
</style>
