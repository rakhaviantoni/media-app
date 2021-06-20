const webpack = require('webpack');
const dotenv = require('dotenv');
const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CssoWebpackPlugin = require('csso-webpack-plugin').default;
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin') //minify javascript only for production
const environment = 'production'

const env = dotenv.config({
  path: `.env.${environment}`
}).parsed;

// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});


const config = {
  mode: environment,
  devtool: 'source-map',
  resolve: {
    extensions: ['.tsx', '.jsx', '.js'],
    alias: {
      Helpers: path.resolve(__dirname, '../src/components/_helpers/'),
      Color: path.resolve(__dirname, '../src/color.scss')
    }
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  output: {
    filename: '[name].[contenthash].js', // this line is the only difference
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    crossOriginLoading: 'anonymous'
  },
  module: {
    rules: [{
        test: /\.(js|jsx|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(css|scss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader", // translates CSS into CommonJS modules
            options: {
              sourceMap: true,
              importLoaders: 1,
              modules: {
                localIdentName: '___[sha1:hash:hex:6]'
              }
            }
          },
          {
            loader: 'postcss-loader', // Run post css actions
            options: {
              plugins: function() { // post css plugins, can be exported to postcss.config.js
                return [
                  require('autoprefixer')
                ];
              }
            }
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ],
        include: /\.module\.(css|scss)$/
      },
      {
        test: /\.(css|scss)$/, // only files with .global will go through this loader. e.g. app.global.css 
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader', // translates CSS into CommonJS modules
          },
          {
            loader: 'postcss-loader', // Run post css actions
            options: {
              plugins: function() { // post css plugins, can be exported to postcss.config.js
                return [
                  require('autoprefixer')
                ];
              }
            }
          },
          {
            loader: 'sass-loader' // compiles Sass to CSS
          }
        ],
        exclude: /\.module\.(css|scss)$/
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|gif)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  devServer: {
    contentBase: './',
    historyApiFallback: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, '../src', 'index.html'),
      filename: "index.html"
    }),
    new MiniCssExtractPlugin({
      allChunks: true,
      filename: '[name].[contenthash].css'
    }),
    new CssoWebpackPlugin(),
    new webpack.DefinePlugin(envKeys)
  ],
  optimization: {
    minimizer: [
      new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {
          map: {
            inline: false,
            annotation: true,
          },
        },
      }),
      new TerserPlugin({
        // Use multi-process parallel running to improve the build speed
        // Default number of concurrent runs: os.cpus().length - 1
        parallel: true,
        // Enable file caching
        cache: true,
        sourceMap: true,
      })
    ],
  }
};

module.exports = config;