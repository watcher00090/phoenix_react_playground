
const path = require('path');
const glob = require('glob');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
//const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
//const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env, options) => {
  const devMode = options.mode !== 'production';

  return {
    plugins: [
      //new MiniCssExtractPlugin({ filename: '../css/app.css' }),
      new CopyWebpackPlugin([{ from: 'assets/static/', to: '../' }])
    ]
    .concat(devMode ? [new HardSourceWebpackPlugin()] : []),
    optimization: {
      minimizer: [
        new TerserPlugin({ cache: true, parallel: true, sourceMap: devMode }),
        //new OptimizeCSSAssetsPlugin({})
      ]
    },
    entry: {
      //'app': glob.sync('./vendor/**/*.js').concat(['./js/app.js'])
      app: './assets/js/app.tsx'
    },
    output: {
      filename: 'app.js',
      path: path.resolve(__dirname, 'priv/static/js'),
      publicPath: '/js/'
    },
    devtool: devMode ? 'eval-cheap-module-source-map' : undefined,
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css$/i,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: false,
              },
            },
          ],
        }
      ]
    },
    resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
	    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
	  }

  }
};




