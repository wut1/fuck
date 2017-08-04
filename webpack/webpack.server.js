const { root } = require('./helpers');


/**
 * This is a server config which should be merged on top of common config
 */
module.exports = {
    entry: root('./app.ts'),
    output: {
        fileName: 'server.js'
    },
    target: 'node'
};