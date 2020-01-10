const webpack = require("webpack");

module.exports = {
    plugins: [
        new webpack.ProvidePlugin({
            "jQuery": "jquery",
            "window.jQuery": "jquery",
            "jquery": "jquery",
            "window.jquery": "jquery",
            "$": "jquery",
            "window.$": "jquery"
        })
    ],

    // entry: {
    //     vendors: "./js/dev/libs.js",
    // },

    output: {
        filename: "vendor.js",
        // chunkFilename: "vendor.js",
        // publicPath: "/js"
    },

    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['env']
                }
            },
            {
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                },{
                    loader: 'expose-loader',
                    options: '$'
                }]
            }
        ]
    }

    // optimization: {
    //     splitChunks: {
    //         cacheGroups: {
    //             vendor: {
    //                 test: /node_modules/,
    //                 chunks: "initial",
    //                 name: "vendor",
    //                 enforce: true
    //             }
    //         }
    //     }
    // }
};