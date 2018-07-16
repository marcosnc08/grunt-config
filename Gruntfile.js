module.exports = function(grunt) {
  grunt.initConfig({
    sass: {
      dist: {
        files: {
          'main.css': 'main.scss'
        }
      }
    },
    watch: {
      files: ['*.scss'],
      tasks: ['css'],
    },
    browserSync: {
        dev: {
          bsFiles: { //browser files
            src: [
              '*.css',
              '*.html',
              '*.js'
            ] 
          },
          options: {
            watchTask: true,
            server: {
              baseDir: './' //Directorio base para nuestro servidor
            }
          }
        }
    },
    imagemin: {
      dynamic: {
        files: [
          {
            expand: true,
            cwd: './',
            src: '*.{png,gif,jpg,jpeg}',
            dest: './dist'
          }
        ]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.registerTask('css', ['sass']);
  grunt.registerTask('default', ['browserSync', 'watch']);
  grunt.registerTask('img:compress', ['imagemin']);
};