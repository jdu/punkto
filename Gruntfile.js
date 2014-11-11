// Generated on 2014-10-31 using generator-angular 0.9.8
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['src/bower.json'],
                tasks: ['wiredep']
            },
            js: {
                files: ['src/scripts/{,*/}*.js'],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            jsTest: {
                files: ['src/test/spec/{,*/}*.js'],
                tasks: ['newer:jshint:test', 'karma']
            },
            styles: {
                files: ['src/styles/punkto.less'],
                tasks: ['newer:copy:styles', 'autoprefixer', 'less:development']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    'src/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    'src/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use(
                                'src/bower_components',
                                connect.static('/bower_components')
                            ),
                            connect.static('src')
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect.static('test'),
                            connect().use(
                                'src//bower_components',
                                connect.static('/bower_components')
                            ),
                            connect.static('src')
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: 'dist'
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: 'src/.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    'src/scripts/{,*/}*.js'
                ]
            },
            test: {
                options: {
                    jshintrc: 'src/test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        'dist/{,*}*',
                        'docs/{,*}*'
                    ]
                }],
                options: {
                    force: true
                }
            },
            server: '.tmp'
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Automatically inject Bower components into the app
        wiredep: {
            app: {
                cwd: 'src',
                src: ['index.html'],
                ignorePath:  /\.\.\//
            }
        },

        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    'dist/scripts/{,*/}*.js',
                    'dist/styles/{,*/}*.css',
                    'dist/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    'dist/styles/fonts/*'
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart dists that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: 'src/index.html',
            options: {
                dest: 'dist',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['concat', 'cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: ['dist/{,*/}*.html'],
            options: {
                assetsDirs: ['dist','dist/assets/images']
            }
        },

        // ng-annotate tries to make the code safe for minification automatically
        // by using the Angular long form for dependency injection.
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    src: ['src/scripts/**/*.js'],
                    dest: '.tmp'
                }]
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'src',
                    dest: 'dist',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        '*.html',
                        'views/{,*/}*.html',
                        'assets/**/*',
                        'data/**/*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: 'src/images',
                    src: ['generated/*']
                },{
                    expand: true,
                    cwd: '.tmp/concat/styles',
                    dest: 'dist/styles',
                    src: [
                        '*.css'
                    ]
                },{
                    // ui-grid assets
                    expand: true,
                    cwd: 'src/bower_components/angular-ui-grid',
                    dest: 'dist/styles',
                    src: [
                        'ui-grid.woff',
                        'ui-grid.ttf'
                    ]
                },{
                    // leaflet items
                    expand: true,
                    cwd: 'src/bower_components/leaflet/dist/images',
                    dest: 'dist/styles/images',
                    src: [ '*' ]
                }]
            }
        },

        // Test settings
        karma: {
            unit: {
                configFile: 'src/test/karma.conf.js',
                singleRun: true
            }
        },

        jsdoc: {
            dist: {
                src: 'src/scripts/**/*.js',
                options: {
                    destination: "docs"
                }
            }
        },

        less: {
            development: {
                options: {
                    paths: ['src/styles']
                },
                files: {
                    ".tmp/styles/punkto.css": "src/styles/punkto.less"
                }
            },
            production: {
                options: {
                    paths: ['src/styles'],
                    cleancss: true
                },
                files: {
                    "dist/styles/punkto.css": "src/styles/punkto.less"
                }
            }

        }
    });


    grunt.registerTask('serve', 'Compile then start a connect web server', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['dist', 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'wiredep',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target) {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'autoprefixer',
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('docs', [
        'jsdoc:dist'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'wiredep',
        'ngAnnotate',
        'useminPrepare',
        'autoprefixer',
        'concat',
        'copy:dist',
        'uglify',
        'filerev',
        'usemin',
        'jsdoc:dist'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        'test',
        'build'
    ]);

    grunt.registerTask('testmin', [
        'clean:dist',
        'ngAnnotate',
        'useminPrepare',
        'concat',
        'usemin'
    ])
};
