const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    // mode: 'production',
    entry: ['./src/index.js','./src/index.less'],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'ac-upload.js',
        library: 'ac-upload',
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                loader: 'babel-loader'
            }, {
                test: /\.less$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader
                },
                {
                    loader: ('css-loader'),
                    options: {
                        url: true,
                        root: path.resolve('.')
                    }
                }, {
                    loader: ('postcss-loader'),
                    options: {
                        ident: 'postcss',
                        plugins: (loader) => [
                            require('autoprefixer')({
                                flexbox: 'no-2009',
                                browsers: 'last 5 version'
                            }),
                            require('cssnano')()
                        ]
                    }
                },
                {
                    loader: ('less-loader')
                }
                ]
            }
        ]
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'prop-types': 'PropTypes',
        'axios': 'axios',
        "tinper-bee": "TinperBee"
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "ac-upload.css"
        })
    ]
}
