var path = require('path');

module.exports = {
    entry: [
        "babel-polyfill", './src/arrow-clock.js'
    ],
    output: {
        filename: 'arrow-clock.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "demos"),
        publicPath: '/dist/'
    }

};
