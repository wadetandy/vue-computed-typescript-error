const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const host = process.env.HOST || 'localhost'
const basePort = process.env.PORT || 8080

let config = {
  entry: path.resolve(__dirname, '..', 'src/index.ts'),
  output: {
    filename: "index.js",
    chunkFilename: '[name].js',
    pathinfo: true,
    path: path.resolve(__dirname, '..', 'dist/'),
  },

  target: "web",

  module: {
    rules: [{
        test: /\.ts[x]?$/,
        use: [
          {
            loader: "babel-loader",
            query: {
              presets: [
                require.resolve('babel-preset-env'),
              ],
              plugins: [
                require.resolve('babel-plugin-syntax-dynamic-import'),
                require.resolve('babel-plugin-dual-import')
              ],
            }
          },
          {
            loader: "ts-loader",
            options: {
              appendTsSuffixTo: [/\.vue$/],
            }
          }
        ]
      }, {
        test: /\.vue$/,
        loader: 'vue-loader',
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".vue", ".json"],
    plugins: [
      new webpack.WatchIgnorePlugin([
        /\.d\.ts$/
      ]),
    ]
  },

    
  devServer: {
    hot: true,
    host: host,
    port: basePort,
    overlay: {
      warnings: false,
      errors: true,
    },
    quiet: true, // necessary for FriendlyErrorsPlugin
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }), 
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
      inject: true
    }),
    new FriendlyErrorsPlugin()
  ]
}

const createDevServer = function(devWebpackConfig) {
  return new Promise((resolve, reject) => {
    portfinder.basePort = basePort
    portfinder.getPort((err, port) => {
      if (err) {
        reject(err)
      } else {
        // publish the new Port, necessary for e2e tests
        process.env.PORT = port
        // add port to devServer config
        devWebpackConfig.devServer.port = port

        // Add FriendlyErrorsPlugin
        devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [`Your application is running here: http://${host}:${port}`],
          },
          onErrors: () => {
            return (severity, errors) => {
            }
          }
        }))

        resolve(devWebpackConfig)
      }
    })
  })
}

module.exports = createDevServer(config)