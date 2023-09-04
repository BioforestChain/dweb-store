import { component$, Slot, useStyles$, useTask$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import type { RequestHandler } from "@builder.io/qwik-city";

import styles from "./styles.css?inline";

export const onGet: RequestHandler = async ({ cacheControl }) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.builder.io/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

// const delay = (time: number) => new Promise((res) => setTimeout(res, time));

// export interface appTs {
//   name: string;
//   url: string;
//   image: string;
//   description: string;
// }

// const randombetween = (min: number, max: number) => {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

// export const useAppinfoLoader = routeLoader$(async () => {
//   console.log('delay start')
//   await delay(1000);
//   console.log('delay end')
//   const appNames = ['test1', 'test2', 'test3']
//   const randomIndex = randombetween(0, appNames.length - 1)
//   console.log('delay end', randomIndex, appNames[randomIndex])
//   return appNames[randomIndex]
// });
const getPathFromUrl = (url: string) => {
  const u = new URL(url);
  return u.pathname;
}

export const onRequest: RequestHandler = async ({params, url, redirect}) => {
  // console.log('Before request index', params, getPathFromUrl(url.href))
  if (getPathFromUrl(url.href) === '/') {
    throw redirect(
      308,
      new URL('/apps', url).toString()
    );
  }
  // await next();
  // console.log('After request', url);
};
// export const onRequest: RequestHandler = async ({ redirect, url }) => {
//   const u = new URL('/apps/', url).toString()
//   console.log('url', u)
//   throw redirect(
//     308,
//     u
//   );
// };

export default component$(() => {
  // useStyles$(styles);
  return (
    <>
      <Slot />
    </>
  );
});
