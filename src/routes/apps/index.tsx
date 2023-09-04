import { component$, useContext, useSignal, useStore, useTask$, useVisibleTask$, createContextId, useContextProvider } from "@builder.io/qwik";
import styles from "./apps.module.css";
import { isServer } from '@builder.io/qwik/build';
import { QMediaCard } from "~/integrations/react/card";
import { Link, useNavigate, type DocumentHead } from '@builder.io/qwik-city';
// import type { DocumentHead } from "@builder.io/qwik-city";

// import { appInfo, apps } from '~/routes/api/appInfo/index'
import SearchBar from "~/components/dashboard/searchBar/searchBar";
import { seachBarContext, useAppList} from '~/routes/apps/layout'
import { appInfo } from '~/type/app'


export default component$(() => {
  // 初始化 seachbartext
  const seachBarText = useContext(seachBarContext);

  // 导航
  const nav = useNavigate();
  // 获取app列表
  const apps = useAppList()
  const sortApps = useSignal<appInfo[]>([])
  useTask$(async () => {
    // const response = await fetch('http://localhost:5173/api/appInfo')
    // const apps = (await response.json()) as appInfo[]
    sortApps.value = apps.value
  });

  useTask$(async ({ track }) => {
    track(() => seachBarText.text);
    if (isServer) return
    
    sortApps.value = []
    if (seachBarText.text === '') {
      sortApps.value = apps.value
    } else {
      sortApps.value = apps.value.filter((app) => {
        return app.name.toLowerCase().includes(seachBarText.text.toLowerCase())
      })
    }
  });
  return (
    <div class={['h-[2000px]']}> 
      <SearchBar></SearchBar>
      <div class={['flex', 'mt-[50px]', 'flex-wrap', 'ml-[30px]']}>
          {sortApps.value?.map((app) => (
            <div class={['m-[5px]', styles.cardBox]} key={`CompoentApps-${app.name}`}>
              <QMediaCard 
                onClick$={() => (
                  nav(`/app?appname=${app.name}`)
                )}
                title={app.name}
                description={app.description}
                image={app.image}
                url={app.url} 
                /> 
            </div>
          ))}
      </div>
    </div>
  );
});


export const head: DocumentHead = {
  title: "Welcome to BFMeta",
  meta: [],
};

