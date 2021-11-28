<template>
  <div id="container"></div>
</template>
<script>
/**
 * 使用插件实现水球图
 */
import 'echarts-liquidfill'
export default {
    mounted () {
        const data = [0.68, {
            value: 0.4,
            direction: 'left' // 波浪滚动方向
        }, {
            value: 0.2,
            itemStyle: {
                opacity: 0.6
            },
            emphasis: { // 选中时的效果
                itemStyle: {
                    opacity: 0.9
                }
            }
        }]; // 从大到小排列
        const chart = this.$echarts.init(document.getElementById('container'));
        chart.setOption({
            series: [{
                type: 'liquidFill',
                data,
                color: ['red', 'blue', 'yellow'],
                // 停止动画
                // waveAnimation: false,
                // animationDuration: 0,
                // animationDurationUpdate: 0,
                // 波纹震动幅度
                amplitude: 10,
                backgroundStyle: {},
                outline: {},
                // shape: 'triggle', // 水球图形状
                itemStyle: {
                    opacity: 0.6
                },
                emphasis: { // 选中时的效果
                    itemStyle: {
                        opacity: 0.9
                    }
                }
            }]
        })
    }
}
</script>
<style lang="scss" scoped>
#container {
  width: 100%;
  height: 100%;
}
</style>
