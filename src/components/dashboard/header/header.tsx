import { component$, $, useOnDocument, useStore, useSignal } from "@builder.io/qwik";
import ImgLogo from "~/media/logo.webp?jsx";
import styles from "./header.module.css";
// import styles from "./header.module.css?inline";


export default component$(() => {
  let opacity = useSignal(0);
  useOnDocument(
    'scroll',
    $(() => {
      const scrollPos = window.scrollY;
      // 根据滚动位置计算透明度
      opacity.value = Math.min(scrollPos / 600, 1);
      // console.log('opacity', opacity.value)
    })
  );
  return (
    <header class={[styles.header_wrap]}>
      <div class={[styles.header_bg]} style={{opacity: opacity.value}}></div>
      <div class={["container", styles.wrapper]}>
        <div class={styles.logo}>
          <a href="/" title="logo">
            <ImgLogo class={['w-[220px]', 'h-[36px]']}></ImgLogo>
          </a>
        </div>

        <ul class={styles.menus}>
          <li>
            <div class={styles.dropdown_btn}>products</div>
            <div class={styles.dropdown_menu}>
              <a href="/">app1</a>
              <a href="/">app2</a>
              <a href="/">app3</a>
            </div>
          </li>
          <li>pricing</li>
          <li>docs</li>
          {/* <li>{opacity.value}</li> */}
        </ul>
      </div>
    </header>
  );
});
