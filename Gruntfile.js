module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		browserify: {
			dist: {
				options: {
					transform: [["babelify", { "presets": ["es2015"] }]],
					browserifyOptions: {
						debug: true,
						paths: [
							__dirname
						]
					}
				},
				files: {
					// if the source file has an extension of es6 then
					// we change the name of the source file accordingly.
					// The result file's extension is always .js
					"./static/module.js": ["./app/js/index.js"]
				}
			}
		},
		/*concat: {
			options: {
				// define a string to put between each file in the concatenated output
				separator: ';'
			},
			dist: {
				// the files to concatenate
				src: ['app/js/!**!/!*.js'],
				// the location of the resulting JS file
				dest: 'static/js/<%= pkg.name %>.js'
			}
		},*/
		/*uglify: {
			options: {
				// the banner is inserted at the top of the output
				banner: '/!*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> *!/\n',
				// If not false, application crashing because angular dependency resolving
				mangle: false
			},
			dist: {
				files: {
					'static/js/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				}
			}
		},*/
		less: {
			development: {
				files: {
					'static/css/<%= pkg.name %>.css': [
						'./node_modules/bootstrap/less/bootstrap.less', 
						'./node_modules/pnotify/dist/pnotify.css',
						'./node_modules/pnotify/dist/pnotify.mobile.css',
						'app/less/main.less'
					]
				}
			}
		},
		pug: {
			compile: {
				options: {
					data: {
						debug: false
					}
				},
				files: [
					{
						cwd: 'app/templates',
						src: ['**/*.pug', '!index.pug'],
						dest: 'static/templates',
						expand: true,
						ext: '.html'
					},
					{
						cwd: 'app/templates',
						src: ['index.pug'],
						dest: 'static',
						expand: true,
						ext: '.html'
					}
				]
			}
		},
		/*cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'static/css',
					src: ['*.css', '!*.min.css'],
					dest: 'static/css',
					ext: '.min.css'
				}]
			}
		},*/
		clean: ['static'],
		imagemin: {                          // Task
			static: {                          // Target
				options: {                       // Target options
					optimizationLevel: 3
				},
				files: [{
					expand: true,                  // Enable dynamic expansion
					cwd: 'app/images/',                   // Src matches are relative to this path
					src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match
					dest: 'static/images/'                  // Destination path prefix
				}]
			}
		},
		copy: {
			main: {
				files: [
					{
						expand: true,
						cwd: './node_modules/bootstrap/fonts',
						src: [
							'*.ttf',
							'*.woff',
							'*.woff2',
							'*.eot',
							'*.svg'
						],
						dest: 'static/fonts/',
						filter: 'isFile'
					}/*,
					{
						expand: true,
						cwd: 'app/data/',
						src: [
							'*.json'
						],
						dest: 'static/data/',
						filter: 'isFile'
					}*/
				]
			}
		},
		watch: {
			scripts: {
				files: ['app/**/*.*'],
				tasks: ['build'],
				options: {
					spawn: false
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-less');
	//grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-pug');
	//grunt.loadNpmTasks('grunt-contrib-uglify');
	//grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browserify');

	//grunt.registerTask('default', ['clean', 'less', 'pug', 'concat', 'uglify', 'cssmin', 'imagemin'/*,'copy'*/]);
	//grunt.registerTask('default', []);

	grunt.registerTask('default', ['build', 'watch']);
	grunt.registerTask('build', ['clean', 'less', 'pug', 'imagemin', 'browserify', 'copy']);
};
