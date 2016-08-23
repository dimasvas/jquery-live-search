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
				  'dist/js/jquery.live-searchable.js': ['src/jquery.live-searchable.js']
				}
			},

			min: {
				files: {
					'dist/js/jquery.live-searchable.min.js': ['src/jquery.live-searchable.js']
				}
			}
		},
		copy: {
			dist: {
				src: "src/jquery.live-searchable.css",
				dest: "dist/css/jquery.live-searchable.css",
			}
		}
  });
  
    grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks( "grunt-contrib-copy" );

	grunt.registerTask("default", ["test", "uglify", "copy"]);
	
};