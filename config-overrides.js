const { override, addBabelPlugin, addWebpackAlias } = require('customize-cra');
const path = require('path');

module.exports = override(
    addBabelPlugin([
        'babel-plugin-root-import',
        {
            rootPathPrefix: '~',
            rootPathSuffix: 'src',
        },
    ]),
    addWebpackAlias({
        ['~']: path.resolve(__dirname, 'src')
    })
);