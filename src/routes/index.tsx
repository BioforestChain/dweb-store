import { component$, createContextId, useContextProvider, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import QwitApps from "~/components/dashboard/apps/apps";

import SearchBar from "~/components/dashboard/searchBar/searchBar";
interface searchBarData {
  text: string;
}

export const seachBarContext = createContextId<searchBarData>('seachBarText');


export default component$(() => {
  const sd = useStore<searchBarData>({ text: 'text' });

  useContextProvider(seachBarContext, sd);
  return (
    <>
      <div class={['h-[2000px]', 'pt-[80px]']}>
        <SearchBar></SearchBar>
        <QwitApps></QwitApps>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to BFMeta",
  meta: [],
};
