
import type { RequestHandler } from "@builder.io/qwik-city";
import { routeLoader$, Form } from '@builder.io/qwik-city';
import { component$, Slot, useStyles$, createContextId, useContextProvider, useStore } from "@builder.io/qwik";

export default component$(() => {
    return (
      <>
        <main class={['bg-[#F7F9FD] w-[390px] min-h-screen relative overflow-x-hidden']}>
          <div class='absolute left-0 top-0 w-[280px] h-[280px] opacity-60 bg-[#34F1FF] filter blur-[260px]'></div>
          <div class='absolute left-[387px] top-[174px] w-[280px] h-[280px] opacity-60 bg-[#0068FF] filter blur-[260px]'></div>
          <Slot />
        </main>
      </>
    );
  });
  