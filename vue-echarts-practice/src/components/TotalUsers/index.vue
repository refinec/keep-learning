<template>
  <common-card title="累计用户数" value="1,087,503">
    <template>
      <!-- <div id="total-users-chart" :style="{width:'100%', height:'100%'}"></div> -->
      <vue-chart :options="getOptions()" />
    </template>
    <template v-slot:footer>
      <div class="total-users-footer">
        <span>日同比</span>
        <span class="emphasis">3%</span>
        <div class="increatse"></div>
        <span class="month">月同比</span>
        <span class="emphasis">3%</span>
        <div class="decreatse"></div>
      </div>
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
        series: [{
          type: 'bar',
          stack: '总量', // stack命名为相同，会合并为同系列的图
          data: [200],
          barWidth: 10,
          itemStyle: {
            color: '#45c946'
          }
        }, {
          type: 'bar',
          stack: '总量',
          data: [250],
          barWidth: 10,
          itemStyle: {
            color: '#eee'
          }
        }, {
          type: 'custom', // 自定义系列
          stack: '总量',
          data: [200], // 和绿色保持同步
          renderItem: (params, api) => {
            // console.log(params, api)
            const value = api.value(0) // 获取data属性中的第一个值
            const endPoint = api.coord([value, 0]) // 设置x,y轴的值

            // 返回单个
            // return { // 返回要显示的内容
            //   type: 'path',
            //   position: endPoint, // 绘制的位置
            //   shape: { // 形状
            //     d: 'M512 341.333333l-298.666667 298.666667h597.333334z', // 传入svg内容
            //     x: 0,
            //     y: 0,
            //     width: 20,
            //     height: 20
            //   },
            //   style: {
            //     fill: 'red' // 填充色
            //   }
            // }

            // 返回一组图形
            return { // 返回要显示的内容
              type: 'group',
              position: endPoint, // 绘制的位置
              children: [{
                type: 'path',
                shape: { // 形状
                d: 'M512 682.666667l298.666667-298.666667H213.333333z', // 传入svg内容
                x: -7, // 偏移量
                y: -20, // 偏移量
                width: 15,
                height: 15,
                layout: 'cover' // 使得上下两个箭头相同
              },
              style: {
                fill: '#45c946' // 填充色
              }
              }, {
                type: 'path',
                shape: { // 形状
                d: 'M512 341.333333l-298.666667 298.666667h597.333334z', // 传入svg内容
                x: -7, // 偏移量
                y: 5, // 偏移量
                width: 15,
                height: 15,
                layout: 'cover' // 使得上下两个箭头相同
              },
              style: {
                fill: '#45c946' // 填充色
              }
              }]
            }
          }
        }],
        xAxis: {
          type: 'value',
          show: false
        },
        yAxis: {
          type: 'category',
          show: false
        },
        grid: {
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
      const chartDom = document.getElementById('total-users-chart')
      // const chart = this.$echarts.init(chartDom, 'light', { rendere: 'svg' })
      const chart = this.$echarts.init(chartDom)
      chart.setOption({
        series: [{
          type: 'bar',
          stack: '总量', // stack命名为相同，会合并为同系列的图
          data: [200],
          barWidth: 10,
          itemStyle: {
            color: '#45c946'
          }
        }, {
          type: 'bar',
          stack: '总量',
          data: [250],
          barWidth: 10,
          itemStyle: {
            color: '#eee'
          }
        }, {
          type: 'custom', // 自定义系列
          stack: '总量',
          data: [200], // 和绿色保持同步
          renderItem: (params, api) => {
            // console.log(params, api)
            const value = api.value(0) // 获取data属性中的第一个值
            const endPoint = api.coord([value, 0]) // 设置x,y轴的值

            // 返回单个
            // return { // 返回要显示的内容
            //   type: 'path',
            //   position: endPoint, // 绘制的位置
            //   shape: { // 形状
            //     d: 'M512 341.333333l-298.666667 298.666667h597.333334z', // 传入svg内容
            //     x: 0,
            //     y: 0,
            //     width: 20,
            //     height: 20
            //   },
            //   style: {
            //     fill: 'red' // 填充色
            //   }
            // }

            // 返回一组图形
            return { // 返回要显示的内容
              type: 'group',
              position: endPoint, // 绘制的位置
              children: [{
                type: 'path',
                shape: { // 形状
                d: 'M512 682.666667l298.666667-298.666667H213.333333z', // 传入svg内容
                x: -7, // 偏移量
                y: -20, // 偏移量
                width: 15,
                height: 15,
                layout: 'cover' // 使得上下两个箭头相同
              },
              style: {
                fill: '#45c946' // 填充色
              }
              }, {
                type: 'path',
                shape: { // 形状
                d: 'M512 341.333333l-298.666667 298.666667h597.333334z', // 传入svg内容
                x: -7, // 偏移量
                y: 5, // 偏移量
                width: 15,
                height: 15,
                layout: 'cover' // 使得上下两个箭头相同
              },
              style: {
                fill: '#45c946' // 填充色
              }
              }]
            }
          }
        }],
        xAxis: {
          type: 'value',
          show: false
        },
        yAxis: {
          type: 'category',
          show: false
        },
        grid: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        }
      })
    } */

}
</script>
<style lang="scss" scoped>
.total-users-footer {
  display: flex;
  align-items: center;
  .month {
    margin-left: 10px;
  }
}
</style>
