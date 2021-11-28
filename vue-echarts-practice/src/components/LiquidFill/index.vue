<template>
    <ve-liquidfill :data="chartData" height="100%" :settings="chartSettings" />
</template>
<script>
export default {
    data () {
        return {
            chartData: {
                columns: ['title', 'percent'], // 第一个title，第二个value
                rows: [{
                    title: 'rate',
                    percent: 0.5
                }]
            },
            chartSettings: {}
        }
    },
    mounted () {
        this.chartSettings = {
            seriesMap: {
                rate: {
                    radius: '80%',
                    label: { // 文本格式化
                        normal: {
                            formatter: (v) => {
                                return `${Math.floor(v.data.value * 100)}%`
                            },
                            textStyle: { // 文字样式
                                fontSize: 36,
                                color: '#999',
                                fontWeight: 'normal'
                            },
                            position: ['50%', '50%'], // 文字位置
                            insideColor: '#fff' // 文字与波纹重叠的颜色
                        }
                    },
                    // 外边框
                    outline: {
                        itemStyle: {
                            borderColor: '#aaa4a4',
                            borderWidth: 1,
                            color: 'none',
                            shadowBlur: 0,
                            shadowColor: '#fff'
                        },
                        // 内外边框边距
                        borderDistance: 0
                    },
                    // 背景色
                    backgroundStyle: {
                        color: '#e3f7ff'
                    },
                    itemStyle: { // 去掉背景色阴影
                        shadowBlur: 0,
                        shadowColor: '#fff'
                    },
                    amplitude: 8, // 震幅
                    color: [this.getColor(this.chartData.rows[0].percent)]
                }
            }
        }
    },
    methods: {
        getColor (value) {
            return value > 0 && value <= 0.5
                ? 'rgba(97, 216, 0, .7)'
: value > 0.5 && value <= 0.8
                    ? 'rgba(204, 178, 26, .7)'
: value > 0.8 ? 'rgba(241, 47, 28, .7)' : '#c7c7cb';
        }
    }
}
</script>
<style lang="scss" scoped>
</style>
