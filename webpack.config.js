const webpackMerge = require('webpack-merge');
const commonPartial = require('./webpack/webpack.common');
const serverPartial = require('./webpack/webpack.server');

module.exports = function(options, webpackOptions) {
    options = options || {};
    const serverConfig = webpackMerge({}, commonPartial, serverPartial, {
        entry: serverPartial.entry,
        plugins: [

        ]
    });
    const configs = [];
    if (options.server) {
        configs.push(serverConfig);
    }
    return configs;
}