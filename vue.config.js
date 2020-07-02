// 配置别名，方便引用
module.exports = {
    configureWebpack: {
        resolve:{
            alias:{
                'assets':'@/assets',
                'common':'@/assets',
                'components':'@/components',
                'network':'@/network',
                'views':'@/views'
            }
        }
    },
    lintOnSave: false,
}