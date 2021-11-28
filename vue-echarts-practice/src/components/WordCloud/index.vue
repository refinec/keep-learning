
<template>
    <!-- <div id="container"></div> -->
    <ve-wordcloud :data="chartData" height="100%" :settings="chartSettings" />
</template>
<script>
// import 'echarts-wordcloud'
export default {
    // mounted () {
    //     const chart = this.$echarts.init(document.getElementById('container'))
    //     chart.setOption({
    //         series: [{
    //             type: 'wordCloud',
    //             data: [{
    //                 name: 'a',
    //                 value: 100
    //             }, {
    //                 name: '谷歌',
    //                 value: 200
    //             }],
    //             shape: 'circle',
    //             textStyle: {
    //                 fontFamily: 'sans-serif',
    //                 fontWeight: 'bold',
    //                 color: function () { // 随机色
    //                     return 'rgb(' + [
    //                         Math.round(Math.random() + 160),
    //                         Math.round(Math.random() + 160),
    //                         Math.round(Math.random() + 160)
    //                     ].join(',') + ')'
    //                 }
    //             }
    //         }]
    //     })
    // }
    data () {
        return {
            chartData: {
                columns: ['name', 'value'],
                rows: [{
                    name: '阿斯顿',
                    value: 150
                }, {
                    name: '阿斯',
                    value: 200
                }]
            },
            chartSettings: {
                color: ['rgba(97, 216, 0, .7)', 'rgba(204, 178, 26, .7)', 'rgba(245, 166, 35, .7)']
            }
        }
    }
}
</script>
<style lang="scss" scoped>
</style>
