
import type { RequestHandler } from "@builder.io/qwik-city";
import { routeLoader$, Form } from '@builder.io/qwik-city';
import { component$, Slot, useStyles$, createContextId, useContextProvider, useStore } from "@builder.io/qwik";
import Header from "~/components/dashboard/header/header";
import Footer from "~/components/dashboard/footer/footer";

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


interface searchBarData {
    text: string;
}

// 这里放 context，因为在index 里放context，会导致报错
export const seachBarContext = createContextId<searchBarData>('apps.seachBarText');


export default component$(() => {
    // useStyles$(styles);
    const sd = useStore<searchBarData>({ text: '' });
    useContextProvider(seachBarContext, sd);
    return (
      <>
        <Header />
        <main class={['bg-[#19176D]', 'pt-[80px]']}>
          <Slot />
        </main>
        <Footer />
      </>
    );
  });
  