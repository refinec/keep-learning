<template>
  <div class="home">
    <button @click="increase">加加加</button>
    <h1>{{count}}</h1>
    <h2>{{double}}</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive ,computed, toRefs, ComputedRef } from 'vue';

interface IDataProps {
  count: number,
  double: ComputedRef<number> | number,
  increase: () => void,
}
export default defineComponent({
  name: 'Home',
  setup() {
    // const count = ref(0);
    // const double = computed(() => {
    //   return count.value * 2;
    // })
    // function increase() {
    //   count.value++;
    // }
    // return {
    //   count,
    //   double,
    //   increase
    // }
    const data: IDataProps = reactive({
      count: 0,
      double: computed(() => data.count * 2),
      increase() {
        data.count++;
      },
    });
    const refData = toRefs(data);
    return {
      ...refData
    }
  }
});
</script>
