module.exports = function(grunt) {

    /**
     * Set up our initial Grunt configuration!
     */
    grunt.initConfig({
        karma: {
            continuous: {
                configFile: 'karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS']
            }
        }
    });


    grunt.loadNpmTasks('grunt-karma');

    /**
     * Unit testing for PhantomJS. (Our Default test)
     */
    grunt.registerTask('test', ['karma']);

    /**
     * Unit testing for Chrome
     */
    grunt.registerTask('chrome', 'A sample task that logs stuff.', function() {
        grunt.config('karma.continuous.browsers', ['Chrome']);
        grunt.task.run(['karma']);
    });

    /**
     * Unit testing for Firefox
     */
    grunt.registerTask('firefox', 'A sample task that logs stuff.', function() {
        grunt.config('karma.continuous.browsers', ['Firefox']);
        grunt.task.run(['karma']);
    });

    /**
     * Unit testing for IE *cough*
     */
    grunt.registerTask('ie', 'A sample task that logs stuff.', function() {
        grunt.config('karma.continuous.browsers', ['IE']);
        grunt.task.run(['karma']);
    });





};