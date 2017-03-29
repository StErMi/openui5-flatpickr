module.exports = function(grunt) {

	grunt.initConfig({

		dir: {
			src: 'src',
			dest: 'dist',
			css: 'it/designfuture/flatpickr/themes/',
			css_base: 'it/designfuture/flatpickr/themes/base/library.source.less',
			css_belize: 'it/designfuture/flatpickr/themes/sap_belize/library.source.less',
			sap_bluecrystal: 'it/designfuture/flatpickr/themes/sap_bluecrystal/library.source.less'
		},

		copy: {

		},

		clean: {
			dist: '<%= dir.dest %>/**'
		},

		openui5_preload: {
			library: {
				options: {
					resources: '<%= dir.src %>',
					dest: '<%= dir.dest %>',
					compatVersion: '1.44',
					compress: false
				},
				libraries: 'it/designfuture/flatpickr'
			}
		},

		openui5_theme: {
			library: {
		    files: [
		      {
		        expand: true,
		        cwd: '<%= dir.src %>',
		        src: '<%= dir.css_base %>',
		        dest: '<%= dir.dest %>'
		      },
		      {
		        expand: true,
		        cwd: '<%= dir.src %>',
		        src: '<%= dir.css_belize %>',
		        dest: '<%= dir.dest %>'
		      },
		      {
		        expand: true,
		        cwd: '<%= dir.src %>',
		        src: '<%= dir.sap_bluecrystal %>',
		        dest: '<%= dir.dest %>'
		      }
		    ]
		  }},
	});

	// These publins provide necessary tasks
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-openui5');

	// Build task
	grunt.registerTask('build', ['openui5_theme', 'openui5_preload']);

	// Default task
	grunt.registerTask('default', ['clean', 'build']);

};