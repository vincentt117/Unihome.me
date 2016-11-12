// ┌─────────────┐
// │ Gruntfile   │
// └─────────────┘
// Grunt wraps several tasks to ease development

// Javascript banner
var banner = '/* <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
				'*  <%= pkg.homepage %>\n' +
				'*  Copyright (c) <%= grunt.template.today("yyyy") %> Environmental Systems Research Institute, Inc.\n' +
				'*  Apache 2.0 License */\n';

module.exports = function (grunt) {  
	require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);  
	// Project configuration.  
	grunt.initConfig({  
		pkg: grunt.file.readJSON('package.json'), 

		// Build CSS from SASS
		'sass': {
			options: {
				includePaths: ['./node_modules/bootstrap-sass/assets/stylesheets', 
												'./node_modules/calcite-bootstrap/dist/sass']
			},
			expanded: {
				files: {
					'dist/css/calcite-bootstrap-v0.2.css': 'lib/sass/build-calcite-bootstrap.scss',
					'dist/css/calcite-maps-v0.2.css': 'lib/sass/build-calcite-maps.scss',
					'dist/css/calcite-bootstrap-maps-v0.2.css': 'lib/sass/build-all.scss',
					'dist/css/layouts/inline-zoom-v0.2.css': 'lib/sass/layouts/inline-zoom.scss',
					'dist/css/layouts/large-title-v0.2.css': 'lib/sass/layouts/large-title.scss',
					'dist/css/layouts/medium-title-v0.2.css': 'lib/sass/layouts/medium-title.scss',
					'dist/css/support/arcgis-3.x-v0.2.css': 'lib/sass/support/arcgis-3.x.scss',
					'dist/css/support/arcgis-4.x-v0.2.css': 'lib/sass/support/arcgis-4.x.scss',
					'dist/css/support/esri-leaflet-v0.2.css': 'lib/sass/support/esri-leaflet.scss'
				}
			}
		}, 

		// Minify CSS
		cssmin: {  
			target: {
				options: {
					banner: banner
				},
				files: {
					'dist/css/calcite-maps.min-v0.2.css': ['dist/css/calcite-maps-v0.2.css'],
					'dist/css/calcite-bootstrap.min-v0.2.css': ['dist/css/calcite-bootstrap-v0.2.css'],
					'dist/css/calcite-bootstrap-maps.min-v0.2.css': ['dist/css/calcite-bootstrap-maps-v0.2.css'],
					'dist/css/calcite-maps-arcgis-3.x.min-v0.2.css': ['dist/css/calcite-maps-v0.2.css', 'dist/css/layouts/inline-zoom-v0.2.css', 'dist/css/layouts/large-title-v0.2.css', 'dist/css/layouts/medium-title-v0.2.css', 'dist/css/support/arcgis-3.x-v0.2.css'],
					'dist/css/calcite-maps-arcgis-4.x.min-v0.2.css': ['dist/css/calcite-maps-v0.2.css', 'dist/css/layouts/inline-zoom-v0.2.css', 'dist/css/layouts/large-title-v0.2.css', 'dist/css/layouts/medium-title-v0.2.css','dist/css/support/arcgis-4.x-v0.2.css'],
					'dist/css/calcite-maps-esri-leaflet.min-v0.2.css': ['dist/css/calcite-maps-v0.2.css', 'dist/css/layouts/inline-zoom-v0.2.css', 'dist/css/layouts/large-title-v0.2.css', 'dist/css/layouts/medium-title-v0.2.css','dist/css/support/esri-leaflet-v0.2.css']
				}
			}
		},

		// Uglify JS (optional)
		// 'uglify': {
		// 	options: {
		// 			mangle: false,
		// 			banner: banner
		// 	},
		// 	dist: {
		// 		files: {
		// 			'dist/js/dojo/calcitemaps-v0.2.js': ['lib/js/dojo/calcitemaps.js'],
		// 			'dist/js/jquery/calcitemaps-v0.2.js': ['lib/js/jquery/calcitemaps.js']
		// 		}
		// 	}
		// },

		// Copy to dist
		'copy': {
			calcitemapsdojo: {
				expand: true,
				flatten: true,
				src: ['./lib/js/dojo/*.js'],
				dest:	'./dist/js/dojo/',
				rename: function(dest, src) {
          return dest + '/' + src.replace(/calcitemaps/, "calcitemaps-v0.2");
    		},
			},
			calcitemapsjquery: {
				expand: true,
				flatten: true,
				src: ['./lib/js/jquery/*.js'],
				dest:	'./dist/js/jquery/',
				rename: function(dest, src) {
          return dest + '/' + src.replace(/calcitemaps/, "calcitemaps-v0.2");
    		},
			},
			bootstrapfonts: {
				expand: true,
				flatten: true,
				src: ['./node_modules/bootstrap-sass/assets/fonts/bootstrap/*'],
				dest: './dist/fonts/bootstrap/'
			},
			calcitefonts: {
				expand: true,
				flatten: true,
				src: ['./lib/fonts/calcite/*'],
				dest: './dist/fonts/calcite/'
			},
			vendor: {
				expand: true,
				flatten: false,
				//cwd: './bower_components/dojo-bootstrap',
				cwd: './lib/js/dojo-bootstrap', // Get local build now
				src: '**',
				dest: './dist/vendor/dojo-bootstrap/'
			}
		},

		// Deploy doc site to gh-pages
    // 'gh-pages': {
    //   options: {
    //     base: 'docs/build',
    //     repo: 'https://github.com/Esri/calcite-maps.git'
    //   },
    //   src: ['**']
    // }

	});  
	// Default task.  
	grunt.registerTask('default', ['sass', 'cssmin', 'copy:calcitemapsdojo', 'copy:calcitemapsjquery', 'copy:bootstrapfonts', 'copy:calcitefonts', 'copy:vendor']);  
};