
import type { RequestHandler } from "@builder.io/qwik-city";
import { routeLoader$, Form } from '@builder.io/qwik-city';
import { component$, Slot, useStyles$, createContextId, useContextProvider, useStore } from "@builder.io/qwik";
import styles from './apps.module.css'
// import AppModel from '~/model/app'; // 从model中导入App

const apps = [
  {
    "name": "fwefwe",
    "url": "https://www.travelpalapp.com",
    "image": "app_image_url_1",
    "description": "f11332"
  },
  {
    "name": "d'w'd'w",
    "url": "https://www.travelpalapp.com",
    "image": "app_image_url_1",
    "description": "fefefefe"
  },
  {
    "name": "f2qfe2f",
    "url": "https://www.travelpalapp.com",
    "image": "app_image_url_1",
    "description": "1111"
  },
  {
    "name": "fefe",
    "url": "https://www.travelpalapp.com",
    "image": "app_image_url_1",
    "description": "fwefwef"
  },
  {
    "name": "rocking",
    "url": "https://www.travelpalapp.com",
    "image": "app_image_url_1",
    "description": "rockingr313r1"
  }
]

export const useAppList = routeLoader$(async (requestEvent) => {
    // const apps = AppModel.all()
    // console.log('loadAll', apps)
    return apps
});


export default component$(() => {
    return (
      <>
        <main class={['bg-[#F7F9FD] pt-[47px] w-[390px] min-h-screen relative overflow-x-hidden']}>
          <div class='absolute left-0 top-0 w-[280px] h-[280px] opacity-60 bg-[#34F1FF] filter blur-[260px]'></div>
          <div class='absolute left-[387px] top-[174px] w-[280px] h-[280px] opacity-60 bg-[#0068FF] filter blur-[260px]'></div>
          <Slot />
        </main>
      </>
    );
  });
  