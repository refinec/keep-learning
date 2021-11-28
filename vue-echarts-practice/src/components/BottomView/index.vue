<template>
  <div class="bottom-view">
    <div class="view">
      <el-card shadow="hover">
        <template v-slot:header>
          <div class="title-wrapper">关键词搜索</div>
        </template>
        <template>
          <div class="chart-wrapper">
            <div class="chart-inner">
              <div class="chart">
                <div class="chart-title">搜索用户数</div>
                <div class="chart-data">93,634</div>
                <vue-chart :options="searchUserOption"></vue-chart>
              </div>
              <div class="chart">
                <div class="chart-title">搜索量</div>
                <div class="chart-data">193,634</div>
                <vue-chart :options="searchNumberOption"></vue-chart>
              </div>
            </div>
            <div class="table-wrapper">
              <el-table :data="tableData">
                <el-table-column prop="rank" label="排名" width="180" />
                <el-table-column prop="keyword" label="关键词" width="180" />
                <el-table-column prop="count" label="总搜索量" />
                <el-table-column prop="users" label="搜索用户数" />
              </el-table>
              <el-pagination
                layout="prev, pager, next"
                :total="100"
                :page-size="4"
                background
                @current-change="onPageChange"
              />
            </div>
          </div>
        </template>
      </el-card>
    </div>
    <div class="view">
      <el-card shadow="hover">
        <template v-slot:header>
          <div class="title-wrapper">
            <div class="title">分类销售排行</div>
            <div class="radio-wrapper">
              <el-radio-group v-model="radioSelect">
                <el-radio-button label="品类"></el-radio-button>
                <el-radio-button label="商品"></el-radio-button>
              </el-radio-group>
            </div>
          </div>
        </template>
        <template>
          <div class="chart-wrapper">
            <vue-chart :options="categoryOptions" />
          </div>
        </template>
      </el-card>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      searchUserOption: {
        xAxis: {
          type: 'category',
          boundaryGap: false // 顶边显示
        },
        yAxis: {
          show: false, // 不y轴坐标系
          min: 0, // 最小刻度
          max: 300 // 最大刻度
        },
        series: [{
          type: 'line',
          data: [100, 150, 200, 250, 200, 150, 100, 50, 100, 150],
          areaStyle: { // 面积样式
            color: 'rgba(95, 187, 255, .5)'
          },
          lineStyle: { // 直线样式
            color: 'rgb(95, 187, 255)'
          },
          itemStyle: {
            opacity: 0 // 顶点不显示
          },
          smooth: true // 平滑过渡
        }],
        grid: {
          top: 0,
          left: 0,
          bottom: 0,
          right: 0
        }
      },
      searchNumberOption: {},
      categoryOptions: {},
      tableData: [
        {
           id: 1, rank: 1, keyword: '北京', count: 100, users: 90, range: '90%'
        }
      ],
      radioSelect: '品类'
    }
  },
  mounted () {
    this.renderPieChart()
  },
  methods: {
    onPageChange (page) {

    },
    renderPieChart () {
      const mockData = [
        {
          legendname: '粉面粥店',
          value: 67,
          percent: '15.40',
          itemStyle: { // 修改该项的颜色
            color: '#e7e702'
          },
          name: '粉面粥店'
        },
        {
          legendname: '简餐便当',
          value: 97,
          percent: '22.30',
          itemStyle: { // 修改该项的颜色
            color: '#8d7fec'
          },
          name: '简餐便当'
        },
        {
          legendname: '汉堡披萨',
          value: 92,
          percent: '21.15',
          itemStyle: { // 修改该项的颜色
            color: '#5085f2'
          },
          name: '汉堡披萨'
        }
      ]
      this.categoryOptions = {
        title: [
        { // 第一个标题
          text: '品类分布',
          textStyle: {
            fontSize: 14,
            color: '#666'
          },
          left: 20,
          top: 20
        },
        { // 第二个标题
          text: '累计订单量',
          subtext: '320',
          x: '34.5%',
          y: '42.5%',
          textAlign: 'center',
          textStyle: { // 主标题样式
            fontSize: 14,
            color: '#999'
          },
            subtextStyle: { // 子标题样式
              fontSize: 28,
              color: '#333'
            }
        }],
        series: [{
          type: 'pie',
          data: mockData,
          name: '品类分布',
          label: {
            normal: {
              show: true,
              position: 'outter', // inner 为内部显示
              formatter: function (params) {
                return `${params.data.legendname} | ${params.data.percent}`
              }
            }
          },
          center: ['35%', '50%'], // 中心点偏移
          radius: ['45%', '60%'], // 第一个值为圆心到内圈的距离，第二个值为圆心到外圈的距离，两者的差越小，形成的圈越小。默认 [0,'75%'],75是canvas width的75%
          labelLine: {
            length: 5,
            length2: 3,
            smooth: true
          },
          itemStyle: {
            borderWidth: 4, // 边距4px
            borderColor: '#fff'
          }
        }],
        legend: {
          type: 'scroll',
          orient: 'vertical',
          height: 250,
          left: '70%',
          top: 'middle',
          textStyle: {
            color: '#8c8c8c'
          }
        },
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            return params.seriesName + '<br />' + params.marker /* 小圆点 */ + params.data.legendname + '<br />' +
            '数量: ' + params.data.value + '<br />' + '占比: ' + params.data.percent + '%'
          }
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.bottom-view {
  display: flex;
  margin-top: 20px;
  .view {
    flex: 1;
    width: 50%;
    box-sizing: border-box;
    &:first-child {
      padding-right: 10px;
    }
    &:last-child {
      padding-left: 10px;
    }
    .title-wrapper {
      display: flex;
      align-items: center;
      height: 60px;
      box-sizing: border-box;
      border-bottom: 1px solid #eee;
      font-size: 14px;
      font-weight: 500;
      padding: 0 0 0 20px;
      .radio-wrapper {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        padding-right: 20px;
      }
    }
    .chart-wrapper {
      display: flex;
      flex-direction: column;
      height: 452px;
      .chart-inner {
        display: flex;
        padding: 0 10px;
        margin-top: 20px;
        .chart {
          flex: 1;
          padding: 0 10px;
          .chart-title {
            color: #999;
            font-size: 14px;
          }
          .chart-data {
            font-size: 22px;
            color: #333;
            font-weight: 500;
            letter-spacing: 2px;
          }
          .echarts {
            height: 50px;
          }
        }
      }
      .table-wrapper {
        flex: 1;
        padding: 0 20px 20px;
        margin-top: 20px;
        .el-pagination {
          display: flex;
          justify-content: flex-end;
          margin-top: 15px;
        }
      }
    }
  }
}
</style>
