const glob = require('glob')
const path = require('path')
const webpack = require('webpack')

const config = {
  entry: glob.sync('./flask_redisboard/src/**/*.js').reduce(
    (entries, entry) => Object.assign(entries, { [entry.split('/').splice(-2, 2).join('/').replace('.js', '')]: entry }), {}),

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },

  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'flask_redisboard/static/dist')
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    })]
}

module.exports = config