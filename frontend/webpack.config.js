const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

module.exports = {
    entry: {
        main: path.resolve(__dirname, 'src/main.js')
    },
    output: {
        filename: 'built/[name].js',
        path: path.resolve(__dirname, '../build/resources/main/static')
    },
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin('built/[name].css'),
    ],
    module: {
        rules: [
            {test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader'},
            {test: /\.css$/, loader: ExtractTextPlugin.extract({use: 'css-loader', publicPath: '../'})},
            {test: /\.scss$/, loader: ExtractTextPlugin.extract({use: 'css-loader!sass-loader', publicPath: '../'})},
            {test: /\.(svg|png|gif|ico)$/, loader: 'url-loader?limit=10000&name=img/[name].[ext]'}
        ]
    }
}
