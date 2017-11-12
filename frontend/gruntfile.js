module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-sass');

    grunt.initConfig({
        browserify: {
            appJs: {
                options: {
                    browserifyOptions: {
                        paths: ['./src']
                    },
                    transform: [
                        ['babelify', {presets: ['react', 'env']}]
                    ]
                },
                files: {
                    '../src/main/resources/static/built/bundle.js': 'src/main.js'
                }
            }
        },
        sass: {
            appSass: {
                options: {
                    noCache: true
                },
                files: {
                    '../src/main/resources/static/built/bundle.css': '../src/main/resources/static/sass/styles.scss'
                }
            }
        }
    });

    grunt.registerTask('build', ['browserify:appJs', 'sass:appSass']);
};
