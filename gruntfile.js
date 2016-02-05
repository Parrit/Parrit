module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-browserify');

    grunt.initConfig({
        browserify: {
            appJs: {
                options: {
                    browserifyOptions: {
                        paths: ['./src/main/js']
                    },
                    transform: [
                        ['babelify', {presets: ['react']}]
                    ]
                },
                files: {
                    'src/main/resources/static/built/bundle.js': 'src/main/js/main.js'
                }
            }
        }
    });

    grunt.registerTask('build', ['browserify:appJs']);
};