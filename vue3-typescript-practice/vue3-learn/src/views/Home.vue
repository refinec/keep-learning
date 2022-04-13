<template>
  <div class="home">
    <button @click="increase">加加加</button>
    <h1>{{count}}</h1>
    <h2>{{double}}</h2>
    <strong>X: {{position.x}}, Y: {{position.y}}</strong>
    <button @click="openModal">Open Modal</button>
    <div>捕获suspense中可能的错误：{{captureError}}</div>
    <suspense>
      <template #default>
        <div>
          <async-show></async-show>
          <dog-show></dog-show>
        </div>
      </template>
      <template #fallback>
        <h2>请求加载中 loading...</h2>
      </template>
    </suspense>
    <fieldset>
      <legend>狗狗图片</legend>
      <div v-if="dogCeo.loading">loading...</div>
      <img
        v-if="dogCeo.loaded"
        :src="dogCeo.result.message"
        width="500"
        height="500"
        style="object-fit: contain;"
      />
    </fieldset>
    <fieldset>
      <legend>喵喵图片</legend>
      <div v-if="catCeo.loading">loading...</div>
      <img
        v-if="catCeo.loaded"
        :src="catCeo.result[0].url"
        :width="catCeo.result[0].width"
        :height="catCeo.result[0].height"
        style="object-fit: contain;"
      />
    </fieldset>
    <modal :isOpen="modalIsOpen" @closeModal="closeModal" />
  </div>
</template>

<script lang="ts">
import Modal from "@/components/Modal.vue"
import AsyncShow from "@/components/AsyncShow.vue"
import DogShow from '@/components/DogShow.vue'
import { defineComponent, ref, reactive, computed, toRefs, ComputedRef, onUpdated, onMounted, onUnmounted, onRenderTriggered, watch, onErrorCaptured } from 'vue';
import useMousePosition from "../hooks/useMousePosition";
import useURLLoader from "../hooks/useURLLoader"
interface IDataProps {
  count: number,
  double: ComputedRef<number> | number,
  increase: () => void,
}
interface IDogResult {
  message: string,
  status: string
}
interface ICatResult {
  breeds: Array<string>,
  id: string,
  url: string,
  width: number,
  height: number
}
export default defineComponent({
  name: 'Home',
  components: {
    Modal,
    AsyncShow,
    DogShow
  },
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
    let greeting = ref("");
    watch([greeting, data], (newV, oldV) => {
      console.log(newV, oldV);
    })
    watch([greeting, () => data.count], (newV, oldV) => {
      console.log(newV, oldV);
    })


    onMounted(() => {
      console.log("Component is mounted!");
    })
    onUnmounted(() => {
      console.log("Component is unmounted!");
    })
    onUpdated(() => {
      console.log("数据更新")
    })
    onRenderTriggered((event) => {
      console.log('onRenderTriggered 调试用的钩子', event)
    })

    const position = useMousePosition();

    const dogCeo = useURLLoader<IDogResult>("https://dog.ceo/api/breeds/image/random");
    const catCeo = useURLLoader<ICatResult[]>("https://api.thecatapi.com/v1/images/search");
    watch(dogCeo, () => {
      if (dogCeo.result) {
        console.log(dogCeo.result.message)
      }
    })

    const modalIsOpen = ref(false);
    function openModal() {
      modalIsOpen.value = true;
    }
    function closeModal() {
      modalIsOpen.value = false;
    }

    const captureError = ref(null);
    onErrorCaptured((e: any) => { // 捕获suspense中可能的错误
      captureError.value = e;
      return true; // 返回一个布尔值，表示是否继续向上传播
    })

    return {
      ...refData,
      position,
      dogCeo,
      catCeo,
      modalIsOpen,
      openModal,
      closeModal,
      captureError
    }
  }
});
</script>
