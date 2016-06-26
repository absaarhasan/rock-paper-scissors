
module.exports = function(grunt) {
    require('jit-grunt')(grunt);

    grunt.initConfig({

        less: {
            development: {
                options: {
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    "tmp/main.css": "less/main.less" // destination file and source file
                }
            }
        },
        cssmin: {
            development: {
                files: {
                    'assets/css/main.css': ['tmp/main.css']
                }
            }

        },
        watch: {

            styles: {
                files: ['less/**/*.less'], // which files to watch
                tasks: ['less', 'cssmin'],
                options: {
                    nospawn: true
                }
            }
        }

    });

    grunt.registerTask('default', ['less', 'cssmin', 'watch']);

};