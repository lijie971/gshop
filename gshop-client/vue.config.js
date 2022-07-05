const {
  defineConfig
} = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //关闭eslint(关闭语法检查)
  lintOnSave: false,
  //配置代理跨域
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        pathRewrite: {
          '^/api': ''
        },
        ws: true, //用于支持websocket
        changeOrigin: true //用于控制请求头中的host值
      }
    },
    host: 'localhost',
    port: 8082,
  },
  //可视化查看项目分析
  chainWebpack: config => {
    config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
  }
})