"use strict";

module.exports = function( grunt ) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        uglify: {
            options: {
                banner: '/*\n    <%= pkg.name %>\n    Copyright (c) 2016 - <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n    Licensed under the MIT license \n    Version: <%= pkg.version %>\n*/\n'
            },

            dev: {
                options: {
                    beautify: true,
                    mangle: false
                },

                files: {
                    'dist/js/jquery.live-search.js': ['src/jquery.live-search.js']
                }
            },

            min: {
                files: {
                    'dist/js/jquery.live-search.min.js': ['src/jquery.live-search.js']
                }
            }
        },
        copy: {
            dist: {
                src: "src/jquery.live-search.css",
                dest: "dist/css/jquery.live-search.css"
            },
            demo_dist_css: {
                src: "src/jquery.live-search.css",
                dest: "demo/dist/css/jquery.live-search.css"
            },
            demo_dist_js: {
                src: "dist/js/jquery.live-search.js",
                dest: "demo/dist/js/jquery.live-search.js"
            }
        },
        jasmine: {
            full: {
                src: "src/**/*.js",
                options: {
                    specs: "spec/*[S|s]pec.js",
                    vendor: [
                        "lib/jquery-3.1.0.min.js",
                    ]
                }
            }
        }
    });
  
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-copy" );
    grunt.loadNpmTasks("grunt-contrib-jasmine");

    grunt.registerTask('test', ['jasmine']);
    grunt.registerTask("default", ["test", "uglify", "copy"]);
};