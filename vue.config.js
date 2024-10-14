/* eslint-disable @typescript-eslint/no-var-requires */
const TerserPlugin = require('terser-webpack-plugin');
const autoprefixer = require('autoprefixer');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const path = require('path');

module.exports = {
  // publicPath: './',
  publicPath: '/codeManageMobile',
  indexPath: 'index.html',
  productionSourceMap: false,
  // 输出文件夹
  outputDir: 'dist',
  lintOnSave: false,
  devServer: {
    https: true,
    overlay: {
      warnings: false,
      errors: false,
    },
    // 设置代理
    proxy: {
      '/api/front/video': {
        target: 'http://172.21.66.129:9022',
        changeOrigin: true,
        pathRewrite: { '^/api/front/video': '' },
      },
      // 综合大屏资源图层接口 (此为[开发环境]调用的接口代理)
      '/api/front/mapResource': {
        target: 'http://jiangsu.tianditu.gov.cn/wuxi/serviceaccess/service/arcgis/rest/services/yingjizhihui',
        changeOrigin: true,
        pathRewrite: { '^/api/front/mapResource': '' },
      },
      // 综合大屏资源图层接口 (此为[预发环境]调用的接口代理)
      '/api/front/mapResource-pre': {
        target: 'http://2.21.1.16:8033/serviceaccess/service/arcgis/rest/services/yingjizhihui',
        changeOrigin: true,
        pathRewrite: { '^/api/front/mapResource-pre': '' },
      },
      // 综合大屏主体图层接口 (此为[开发环境]调用的接口代理)
      '/api/front/Enterprise': {
        target: 'http://geowork.wicp.vip/arcgis/rest/services/yingjizhihui',
        changeOrigin: true,
        pathRewrite: { '^/api/front/Enterprise': '' },
      },
      '/api': {
        target: 'http://172.21.66.134:8260',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
        headers: {
          Connection: 'keep-alive',
        },
      },
    },
  },
  css: {
    requireModuleExtension: true,
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
          modules: {
            localIdentName: '[path][name]-[local]-[hash:5]',
            rules: [{
              test: /\.less$/,
              use: ['style-loader', 'css-loader', 'less-loader', {
                loader: 'style-resources-loader',
                options: {
                  patterns: path.resolve(__dirname, 'path/to/less/variables/*.less'),
                  injector: 'append'
                }
              }]
            }]
          },
        },
      },
      css: {
        modules: {
          localIdentName: '[path][name]-[local]-[hash:5]',
        },
      },
      postcss: {
        plugins: [autoprefixer()],
      },
    },
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: [path.resolve(__dirname, './src/global/styles.less')]
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV == 'production') {
      // 为生产环境修改配置
      config.mode = 'production';
      // 将每个依赖包打包成单独的js文件
      let optimization = {
        minimizer: [
          new TerserPlugin({
            parallel: true, // 是否并行打包
            terserOptions: {
              warnings: false,
              compress: {
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log'],
              },
            },
          }),
        ],
      };
      if (process.env.VUE_APP_FORMAL_SERVER) {
        Object.assign(config, {
          optimization,
        });
      }
    } else {
      // 为开发环境修改配置
      config.mode = 'development';
    }
  },
  chainWebpack: config => {
    if (process.env.VUE_APP_ANALYZER === 'true') {
      config.plugin('webpack-bundle-analyzer').use(BundleAnalyzerPlugin);
    }
  },
};
