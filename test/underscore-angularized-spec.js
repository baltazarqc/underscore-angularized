/*global angular, beforeEach, afterEach, describe, expect, it, spyOn, xdescribe, xit, module, inject */

(function () {
    'use strict';
    /**
     * Ensure Angular and our Underscore factory load properly...
     */
    describe('Underscore-Angularized Test Suite', function () {
        var _;

        /**
         * Load the underscore-angularized module and various Angular services.
         */
        beforeEach(function () {
            angular.mock.module('underscore-angularized');

            angular.mock.inject(function (underscore) {
                _ = underscore;
            });

        });

        describe('Angular/Underscore Initialization', function () {
            /**
             * Make sure Angular is loaded...
             */
            it('AngularJS is loaded onto the window object', function () {
                expect(window.angular).toBeDefined();
            });


            /**
             * Make sure the underscore factory is defined.
             */
            it('Underscore is defined', function () {
                expect(_).toBeDefined();
            });


            /**
             * We need to make sure Underscore doesn't leak onto the Window object.
             */
            it('Underscore is not on the window object', function () {
                expect(window._).toBeUndefined();
                expect(window.underscore).toBeUndefined();
            });



        });


        describe('Underscore Functionality', function () {

            /**
             * Test the maps functionality
             */
            it('maps', function () {
                expect(_.map([1, 2, 3], function (num) {return num * 3;})).toEqual([3, 6, 9]);
            });


            /**
             * Test the keys functionality...
             */
            it('keys', function () {
                expect(_.keys({one: 1, two: 2})).toEqual(['one', 'two']);
            });

            /**
             * Test the throttle functionality...
             */
            it('Throttle', function () {

                /**
                 *  We are going to call a throttled function A LOT. Let's create our data structures to keep track of
                 *    the number of times we call a function vs the times it re-computes a value.
                 */
                var computed = [];
                var called = 0;

                /**
                 *
                 * Let's create a dummy function that we need to call a lot. For the sake of this test, it just
                 *   generates a random number and returns it. This function also keeps track of all of the unique
                 *   values generated.
                 *
                 * @returns {number}
                 */
                function rand() {
                    var value = Math.random();
                    if (_.last(computed) !== value) {
                        computed.push(value);
                    }
                    return value;
                }

                /**
                 * This is the throttled function we are creating based on the above rand() function. This will get called
                 *   A LOT but it won't re-execute on every call.
                 */
                var randThrottled = _.throttle(rand, 3);


                /**
                 *  Now let's call our throttled function 500,000 times.
                 */
                for (var i = 0; i < 500000; i++) {
                    randThrottled();
                    called++;
                }

                console.log("Times Computed: " + computed.length);
                console.log("Times Called: " + called);


                /**
                 *  If our throttle worked properly, it was called 500,000 times but only actually computes a value a
                 *    few times. (This value will vary on your runtime environment)
                 */
                expect(computed.length).toBeLessThan(called);

            });

            /**
             * TODO: Write more unit tests... These are a few to ensure the library works.
             */

        });

    });


})();