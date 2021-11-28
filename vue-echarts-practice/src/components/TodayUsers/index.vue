<template>
  <common-card title="今日交易用户数" value="81,014">
    <template>
      <!-- <div id="today-users-chart" :style="{width:'100%', height:'100%'}"></div> -->
      <vue-chart :options="getOptions()" />
    </template>
    <template v-slot:footer>
      <span>退货率</span>
      <span class="emphasis">3%</span>
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
                color: ['#3398DB'], // 柱状图颜色
                series: [{
                  type: 'bar',
                  data: [410, 82, 200, 334, 390, 330, 220, 150, 82, 200, 134, 290, 330, 150],
                  barWidth: '60%' // 柱形的宽度
                }],
                xAxis: {
                  type: 'category',
                  data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00'],
                  show: false
                },
                yAxis: {
                  show: false
                },

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
      const chartDom = document.getElementById('today-users-chart')
      // const chart = this.$echarts.init(chartDom, 'light', { rendere: 'svg' })
      const chart = this.$echarts.init(chartDom)
      chart.setOption({
        color: ['#3398DB'], // 柱状图颜色
        series: [{
          type: 'bar',
          data: [410, 82, 200, 334, 390, 330, 220, 150, 82, 200, 134, 290, 330, 150],
          barWidth: '60%' // 柱形的宽度
        }],
        xAxis: {
          type: 'category',
          data: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00', '13:00'],
          show: false
        },
        yAxis: {
          show: false
        },

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
