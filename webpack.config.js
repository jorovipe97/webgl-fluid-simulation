const path = require('path');

module.exports = {
	entry: [
		'./src/index.ts'
	],
	mode: 'development',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	devtool: 'inline-source-map', // not recommended for production code.
	devServer: {
		contentBase: './dist',
		host: "192.168.240.123" , // Your Computer Name
		disableHostCheck: false
    	// port: 8080
	},
	plugins: [],
	resolve: {
		extensions: ['.tsx', '.ts', '.js', '.jsx']
	},
	module: {
		rules: [
			{
				test: /\.exec\.js$/,
				use: [ 'script-loader' ]
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader'
				]
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: [
					'file-loader'
				]
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/
			}
		]
	}
};