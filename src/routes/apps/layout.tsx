
import type { RequestHandler } from "@builder.io/qwik-city";
import { routeLoader$, Form } from '@builder.io/qwik-city';
import { component$, Slot, useStyles$, createContextId, useContextProvider, useStore } from "@builder.io/qwik";

export default component$(() => {
    return (
      <>
        <main class={['bg-[#F7F9FD] w-[390px] min-h-screen relative overflow-x-hidden']}>
          <Slot />
        </main>
      </>
    );
  });
  