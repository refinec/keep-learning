<template>
    <div>
        {{result}}
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    setup() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    result: "我是请求结果"
                })
            }, 2000)
        })
    }
})
</script>