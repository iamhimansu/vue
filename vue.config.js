const {defineConfig} = require('@vue/cli-service');
const path = require('path-browserify');

module.exports = defineConfig({
    transpileDependencies: true,
    outputDir: 'deploy',
    configureWebpack: {
        resolve: {
            fallback: {
                path: require.resolve('path-browserify'),
                fs: false, // or require.resolve('fs'),
                crypto: false
            },

        },
        experiments: {
            asyncWebAssembly: true,
        },
        module: {
            rules: [
                {
                    test: /\.wasm$/,
                    type: 'webassembly/async',
                },
            ],
        },
    },
})
