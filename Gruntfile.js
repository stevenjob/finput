module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-webdriver');
  grunt.loadNpmTasks('grunt-babel');

  grunt.loadNpmTasks("grunt-remove-logging");

  var fs = require("fs");

  grunt.initConfig({
    clean: {
      libs: ['lib'],
      dist: ['dist']
    },
    browserify: {
      dev: {
        files: {
          'build/bundle.js': ['main.js'],
          'dist/finput.js': ['src/finput.js']
        },
        options: {
          browserifyOptions: {
            debug: true,
            standalone: 'finput'
          },
          transform: [
            ["babelify", {
              presets: ["es2015", "stage-2"],
              plugins: ["add-module-exports"]
            }]
          ]
        }
      }
    },
    watch: {
      js: {
        files: ['src/**/*.js', 'main.js'],
        tasks: ['compile'],
        options: {
          // for grunt-contrib-watch v0.5.0+, 'nospawn: true' for lower versions.
          // Without this option specified express won't be reloaded
          spawn: false,
          livereload: true,
          atBegin: true
        }
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src : ['build/bundle.js', 'index.html']
        },
        options: {
          watchTask: true,
          server: {
              baseDir: "./"
          }
        }
      }
    },
    uglify: {
      main: {
        files: {
          'dist/finput.min.js': ['dist/finput.js']
        }
      }
    },
    babel: {
      options: {
        presets: ['es2015', 'stage-2'],
        plugins: ["add-module-exports"]
      },
      dist: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**/*.js'],
            dest: 'lib/'
          }
        ]
      }
    },
    removelogging: {
      dist: {
        src: "dist/finput.js",

        options: {
          // see below for options. this is optional.
        }
      }
    },
    webdriver: {
      test: {
        configFile: './wdio.conf.js'
      }
    }
  });

  grunt.registerTask('createLibFolder', ['clean:libs', 'babel']);
  grunt.registerTask('compile', ['createLibFolder', 'clean:dist', 'browserify:dev', 'removelogging', 'uglify']);
  grunt.registerTask('serve', ['compile', 'browserSync', 'watch']);

  // Shortcut for test task
  grunt.registerTask('test', ['webdriver']);

  grunt.registerTask('default', 'serve');
};
