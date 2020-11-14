const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {
  VueLoaderPlugin
} = require('vue-loader')
const Dotenv = require('dotenv-webpack')


module.exports = {
  entry: './src/main.js',
  devServer: {
    contentBase: './dist'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js',
    publicPath: "/"
  },
  module: {
    rules: [{
      test: /\.(scss|css)$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader'
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true,
            // options...
          }
        }
      ]
    },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]'
        },
      },
      {
        test: /\.(eot|ttf|woff(2)?)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.resolve('src'),
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/styles.css'
    }),
    new VueLoaderPlugin(),
    new Dotenv({
      systemvars: true,
    }),
  ]
};