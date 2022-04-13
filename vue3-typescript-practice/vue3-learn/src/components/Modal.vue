<template>
  <teleport to="#modal">
    <div id="center" v-if="isOpen">
      <h1>
        <slot>this is a modal</slot>
      </h1>
      <button @click="handleCloseModal">Close</button>
    </div>
  </teleport>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    isOpen: {
      type: Boolean
    }
  },
  emits: {
    // closeModal: (payload: any) => {
    //   return payload.type === "close";
    // }
    closeModal: null, // 不要上面的验证
  },
  setup(props, context) {
    // context.emit("closeModal", { type: "test" })

    function handleCloseModal() {
      context.emit("closeModal")
    }
    return {
      handleCloseModal
    }
  }
})
</script>
<style lang="scss" scoped>
#center {
  width: 200px;
  height: 200px;
  background: #fff;
  border: 2px dashed black;
  position: fixed;
  left: 50%;
  top: 50%;
  text-align: center;
}
</style>