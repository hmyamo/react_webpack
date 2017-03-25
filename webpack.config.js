const ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    main: './src/main.js',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          loader: [
            'css-loader',
            'postcss-loader'
          ]
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({ filename: 'bundle.css' }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          require('postcss-easy-import')(
            {
              glob: true
            }
          ),
        ],
      }
    })
  ],

  devServer: {
    contentBase: path.join(__dirname, "public"),
    port: 8080,
    inline: true,
    historyApiFallback: true,
  },
  devtool: 'source-map',
};
