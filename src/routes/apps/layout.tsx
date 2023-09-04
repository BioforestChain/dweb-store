
import type { RequestHandler } from "@builder.io/qwik-city";
import { routeLoader$, Form } from '@builder.io/qwik-city';
import { component$, Slot, useStyles$, createContextId, useContextProvider, useStore } from "@builder.io/qwik";
import Header from "~/components/dashboard/header/header";
import Footer from "~/components/dashboard/footer/footer";

import AppModel from '~/model/app'; // 从model中导入App

export const useAppList = routeLoader$(async (requestEvent) => {
    const apps = AppModel.all()
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
  