const {defineConfig} = require('@vue/cli-service');
const path = require('path-browserify');

module.exports = defineConfig({
    transpileDependencies: true,
    runtimeCompiler: true,
    productionSourceMap: true,
    outputDir: 'deploy',
    publicPath: './',
    configureWebpack: {
        resolve: {
            fallback: {
                path: require.resolve('path-browserify'),
                fs: false, // or require.resolve('fs'),
                crypto: false,
                util: require.resolve("util"),
                os: require.resolve("os-browserify/browser"),
                url: require.resolve("url")
            },

        },
    },
})
