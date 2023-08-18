import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <>
      <div class={['h-[2000px]', 'pt-[80px]']}>hello app center</div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to BFMeta",
  meta: [],
};
