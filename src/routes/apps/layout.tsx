
import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
    return (
      <>
        <main class={['bg-[#F7F9FD] w-[390px] min-h-screen relative overflow-x-hidden']}>
          <Slot />
        </main>
      </>
    );
  });
  