var webpackConfig = require('./webpack.test.js');
module.exports = function (config) {
    var _config = {
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            {
                pattern: './karma-test-shim.js',
                watched: true
            },
            {
                pattern: '../src/assets/**/*',
                watched: false,
                included: false,
                served: true,
                nocache: false
            }
        ],
        proxies: {
            '/assets/': '/base/src/assets/'
        },
        preprocessors: {
            './karma-test-shim.js': ['webpack', 'sourcemap']
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            stats: 'errors-only'
        },
        webpackServer: {
            noInfo: true
        },
        browserConsoleLogOptions: {
            level: 'log',
            format: '%b %T: %m',
            terminal: true
        },
        reporters: ['progress', 'kjhtml'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        browsers: ['Chrome_without_security'],
        customLaunchers:{
            Chrome_without_security:{
                base: 'Chrome',
                flags: ['--disable-web-security']
            }
        },
        singleRun: false
    };
    config.set(_config);
};