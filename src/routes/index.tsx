import { component$, createContextId, useContextProvider, useStore } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
// import Header from "~/components/dashboard/header/header";
// import apps from '~/routes/apps/index'

export default component$(() => {
  return (
    <>
      <div class={['h-[2000px]']}>
        {/* <QwitApps></QwitApps> */}
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to BFMeta",
  meta: [],
};
