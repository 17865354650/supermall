module.exports = {
    plugins:{
        autoprefixer: {},
        "postcss-px-to-viewport": {
            viewportWidth: 375, //视窗宽度。对应设计稿的宽度（也就是你依据哪个宽度去开发）
            viewportHeight: 667, //视窗高度 （也可以不配置）
            unitPrecision: 5, //指定‘px’转换为视窗单位值的小数位数
            viewportUnit: 'vw', //指定转换的视窗单位 建议‘vw’
            selectorBlackList:['ignore'],//指定不需要准换的类
            minPixelValue: 1, //小于等于1px不转换
            mediaQuer: false //允许在媒体查询中转换
        }
    }
}