const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptmizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const path = require('path');

module.exports = {
	mode: 'production',
	optimization: {
		minimizer: [ new OptmizeCssAssetsPlugin() ]
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				exclude: /styles\.css$/,
				use: [ 'style-loader', 'css-loader' ]
			},
			{
				test: /styles\.css$/,
				use: [ MiniCssExtractPlugin.loader, 'css-loader' ]
			},
			{
				test: /\.html$/i,
				loader: 'html-loader',
				options: {
					minimize: false
				}
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							esModule: false
						}
					}
				]
			}
		]
	},
	// entry: 'index.js',
	// output: {
	// 	path: path.resolve(__dirname, './dist'),
	// 	filename: 'index_bundle.js'
	// },
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
			filename: './index.html'
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			ignoreOrder: false
		}),
		new CopyPlugin({
			patterns: [
				{
					from: 'src/assets',
					to: 'assets/'
				}
			]
		})
	],
	performance: {
		hints: false,
		maxEntrypointSize: 512000,
		maxAssetSize: 512000
	}
};
