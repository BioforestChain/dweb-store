import { createApp, ref, inject  } from 'vue';
import Popup from './dialog_downloadBroser.vue';

let popupInstance: any;

export const getPopupInstance = () => {
  if (!popupInstance) {
    const popupApp = createApp(Popup);
    const show = ref(false);

    popupApp.mount('#app');
    popupApp.provide('show', show);

    popupInstance = popupApp
  }

  return popupInstance;
};

export const showPopup = () => {
  const instance = getPopupInstance();
  if (instance) {
    console.log('show', instance, instance.show)
    inject('show')
    // instance.show = true;
  }
};

export const hidePopup = () => {
  const instance = getPopupInstance();
  if (instance) {
    inject('false')
  }
};