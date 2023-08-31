import { component$, useContext, useSignal, useStore, useTask$, useVisibleTask$ } from "@builder.io/qwik";
import styles from "./apps.module.css";
import { isServer } from '@builder.io/qwik/build';
import { QMediaCard } from "~/integrations/react/card";
import { Link, useNavigate } from '@builder.io/qwik-city';
import { seachBarContext } from '~/routes/index'

import { appInfo, apps } from '~/routes/api/appInfo/index'

export default component$(() => {
  const nav = useNavigate();
  const seachBarText = useContext(seachBarContext);
  const sortApps = useSignal<appInfo[]>([])
  useTask$(async () => {
    const response = await fetch('http://localhost:5173/api/appInfo')
    const apps = (await response.json()) as appInfo[]
    sortApps.value = apps
  });

  useTask$(async ({ track }) => {
    track(() => seachBarText.text);
    if (isServer) return
    
    sortApps.value = []
    if (seachBarText.text === '') {
      sortApps.value = apps
    } else {
      sortApps.value = apps.filter((app) => {
        return app.name.toLowerCase().includes(seachBarText.text.toLowerCase())
      })
    }
  });
  return (
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
  );
});
