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

        browsers: ['Firefox'],

        plugins: [
            'karma-browserify',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-jasmine-ajax',
            'karma-phantomjs-launcher'
        ],

        browserify: {
            transform: [ ['babelify', {presets: 'react'}], 'rewireify' ],
            configure: function(bundle) {
                bundle.on('prebundle', function() {
                    bundle._mdeps.paths = ['./src/main/js', './src/test/js']
                })
            }
        }
    });
};
