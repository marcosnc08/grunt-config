module.exports = function(grunt) {
  
  require('time-grunt')(grunt);

  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin'
  });

  grunt.initConfig({
    sass: {
      dist: {
        files: [{
          expand: true,
          cwd: 'css',
          src: ['*.scss'],
          dest: 'css',
          ext: '.css'
        }]
      }
    },
    
    watch: {
      files: ['css/*.scss'],
      tasks: ['css'],
    },

    browserSync: {
        dev: {
          bsFiles: { //browser files
            src: [
              'css/*.css',
              '*.html',
              'js/*.js'
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

    copy: {
      html: {
          files: [{ 
          expand: true, 
          dot: true, 
          cwd: './', //current working directory
          src: ['*.html'],
          dest: 'dist'
        }]
      },
    },

    clean: {
      build: {
        src: ['dist/'] //clean the distribution folder
      }
    },

    imagemin: {
      dynamic: {
        files: [{
            expand: true,
            cwd: './',
            src: 'img/*.{png,gif,jpg,jpeg}',
            dest: 'dist/'
        }]
      }
    },

    cssmin: {
      dist: {}
    },

    uglify: {
      dist: {}
    },

    filerev: {
      options: {
        algorithm: 'md5',
        length: 15
      },
      files: {
        src: ['dist/css/*.css', 'dist/js/*.js']
      }
    },

    concat: {
      options: {
        separator: ';'
      },
      dist: {}
    },

    useminPrepare: {
      foo: {
        dest: 'dist',
        src: ['index.html']
      },
      options: {
        flow: {
          steps: {
            css: ['cssmin'],
            js: ['uglify']
          },
          post: {
            css: [{
              name: 'cssmin',
              createConfig: function(context, block) {
                var generated = context.options.generated;
                generated.options = {
                  keepSpecialComments: 0,
                  rebase: false
                }
              }
            }]
          }
        }
      }
    },

    usemin: {
      html: ['dist/index.html'],
      options: {
        assetsDir: ['dist', 'dist/css', 'dist/js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-usemin');
  grunt.loadNpmTasks('grunt-filerev');
  
  grunt.registerTask('css', ['sass']);
  
  grunt.registerTask('default', ['browserSync', 'watch']);
  
  grunt.registerTask('img:compress', ['imagemin']);
  
  grunt.registerTask('build', [
    'clean',
    'copy',
    'imagemin',
    'useminPrepare',
    'concat',
    'cssmin',
    'uglify',
    'filerev',
    'usemin'
  ]);
};