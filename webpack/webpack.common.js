const { root } = require('./helpers');

/**
 * This is a common webpack config which is the base for all builds
 */
module.exports = {
    devtool: 'source-map',
    resolve: {
        extensions: ['.ts', '.js']
    },
    output: {
        path: root('build')
    },
    module: {
        rules: [
            { test: /\.ts$/, loader: '@ngtools/webpack' }
        ]
    },
    plugins: []
};