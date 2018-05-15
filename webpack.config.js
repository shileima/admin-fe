const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack           = require('webpack')

module.exports = {
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        filename: 'js/app.js'
    },
    plugins: [
        //处理html文件
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        //独立css文件
        new ExtractTextPlugin('css/[name].css'),
        //提取公共模块
        new webpack.optimize.CommonsChunkPlugin({
            name:'common',
            filename: 'js/base.js'
        })
    ],
    devServer: {
        port:8086
    },
    module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env','react']
                }
            }
          },
          {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: "css-loader"
              })
          },
          {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
              use: ['css-loader', 'sass-loader']
            })
          },
          {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192,
                  name: 'resource/[name].[ext]'
                }
              }
            ]
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'resource/[name].[ext]'
                    }
                }
            ]
            
          }
        ]
      }
};