module.exports = function(config) {
    config.set({
        frameworks: [ 'browserify', 'jasmine-ajax', 'jasmine' ],

        files: [
            'src/test/js/**/*.js'
        ],

        preprocessors: {
            'src/test/js/**/*.js': [ 'browserify' ]
        },

        logLevel: config.LOG_INFO,

        singleRun: true,

        autoWatch: false,

        reporters: ['dots'],

        browsers: ['PhantomJS'],

        plugins: [
            'karma-browserify',
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-jasmine-ajax',
            'karma-phantomjs-launcher'
        ],

        browserify: {
            configure: function(bundle) {
                bundle.on('prebundle', function() {
                    bundle.transform('babelify', {presets: ["react"]});
                });
            }
        }
    });
};
