<template>
  <common-card title="累计订单量" value="2456465">
    <template>
      <!-- <div id="total-orders-chart" :style="{width:'100%', height:'100%'}"></div> -->
      <vue-chart :options="getOptions()" />
    </template>
    <template v-slot:footer>
      <span>昨日订单量</span>
      <span class="emphasis">333333</span>
    </template>
  </common-card>
</template>
<script>
import commonCardMixin from '@/mixins/commonCardMixin'
export default {
    mixins: [commonCardMixin],
     methods: {
      getOptions () {
        return {
        xAxis: {
          type: 'category',
          show: false,
          boundaryGap: false // 把图在X轴拉伸，去掉左右两侧的间隙
        },
        yAxis: {
          show: false
        },
        series: [{
          type: 'line',
          data: [6, 56, 55, 56, 44, 62],
          areaStyle: {
            color: 'purple' // 面积用紫色显示
          },
          lineStyle: { // 把线的宽度设置为0
            width: 0
          },
          itemStyle: { // 数据点的设置
            opacity: 0
          },
          smooth: true // 平滑的过渡
        }],
        grid: { // 布局
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }
      }
      }
    }
    /*
    * 原生写法
        mounted () {
      const chartDom = document.getElementById('total-orders-chart')
      // const chart = this.$echarts.init(chartDom, 'light', { rendere: 'svg' })
      const chart = this.$echarts.init(chartDom)
      chart.setOption({
        xAxis: {
          type: 'category',
          show: false,
          boundaryGap: false // 把图在X轴拉伸，去掉左右两侧的间隙
        },
        yAxis: {
          show: false
        },
        series: [{
          type: 'line',
          data: [6, 56, 55, 56, 44, 62],
          areaStyle: {
            color: 'purple' // 面积用紫色显示
          },
          lineStyle: { // 把线的宽度设置为0
            width: 0
          },
          itemStyle: { // 数据点的设置
            opacity: 0
          },
          smooth: true // 平滑的过渡
        }],
        grid: { // 布局
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }
      })
    }
    */

}
</script>
<style lang="scss" scoped>
</style>
