import { component$, useSignal, useTask$, useContext} from "@builder.io/qwik";
import styles from "./searchBar.module.css";
import {seachBarContext} from '~/routes/apps/layout'

export default component$(() => {
  const text = useSignal('');
  const seachBarData = useContext(seachBarContext);
  useTask$(({ track }) => {
    track(() => text.value);
    const value = text.value;
    // console.log('value', value)
    seachBarData.text = value;
  });
  return (
    <footer>
      <div class={[styles.input_row]}>
        <input type="text" class={[styles.input_field]} bind:value={text}/>
      </div>
    </footer>
  );
});
