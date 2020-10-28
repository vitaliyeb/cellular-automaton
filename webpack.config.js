const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader')
const path = require('path');

module.exports = {
    entry: './dev/main.ts',
    mode: 'development',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'awesome-typescript-loader'
            },
        ],
    },
    resolve: {
        extensions: [ '.ts', '.js' ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: './public/index.html'
        }),
        new CheckerPlugin()
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000
    }
};