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
             * Can it pull out the first element of an array
             */
            it('first', function () {
                expect(_.first([1, 2, 3])).toEqual(1);
                expect(_([1, 2, 3]).first()).toEqual(1);
                expect(_.first([1, 2, 3], 0)).toEqual([]);
                expect(_.first([1, 2, 3], 2)).toEqual([1,2]);
                expect(_.first([1, 2, 3], 5)).toEqual([1,2,3]);

                var result = (function(){ return _.first(arguments); }(4, 3, 2, 1));
                expect(result).toEqual(4);

                result = _.map([[1, 2, 3], [1, 2, 3]], _.first);
                expect(result).toEqual([1, 1]);

                result = (function() { return _.first([1, 2, 3], 2); }());
                expect(result).toEqual([1,2]);

                expect(_.first(null)).toEqual(undefined);
                
                expect(_.first([1, 2, 3], -1).length).toEqual(0);
            });



            it('head', function() {
                expect(_.first).toEqual(_.head); 
            });


            it('take', function() {
                expect(_.first).toEqual(_.take);
            });

            it('rest', function() {
                var numbers = [1, 2, 3, 4];
                expect(_.rest(numbers)).toEqual([2, 3, 4]); //
                expect(_.rest(numbers, 0)).toEqual([1, 2, 3, 4]);
                expect(_.rest(numbers, 2)).toEqual([3,4]);
                var result = (function(){ return _(arguments).rest(); }(1, 2, 3, 4));
                expect(result).toEqual([2, 3, 4]);
                result = _.map([[1, 2, 3], [1, 2, 3]], _.rest);
                expect(_.flatten(result)).toEqual([2, 3, 2, 3]);
                result = (function(){ return _(arguments).rest(); }(1, 2, 3, 4));
                expect(result).toEqual([2, 3, 4]);
            });

            it('tail', function() {
                expect(_.rest).toEqual(_.tail);
            });

            it('drop', function() {
                expect(_.rest).toEqual(_.drop);
            });

            it('initial', function() {
                expect(_.initial([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4]);
                expect(_.initial([1, 2, 3, 4], 2)).toEqual([1,2]);
                expect(_.initial([1, 2, 3, 4], 6)).toEqual([]);
                var result = (function(){ return _(arguments).initial(); }(1, 2, 3, 4));
                expect(result).toEqual([1, 2, 3]);
                result = _.map([[1, 2, 3], [1, 2, 3]], _.initial);
                expect(_.flatten(result)).toEqual([1, 2, 1, 2]);
            });


            it('last', function() {
                expect(_.last([1, 2, 3])).toEqual(3);
                expect(_.last([1, 2, 3], 0)).toEqual([]);
                expect(_.last([1, 2, 3], 2)).toEqual([2,3]);
                expect(_.last([1, 2, 3], 5)).toEqual([1, 2, 3]);
                var result = (function(){ return _(arguments).last(); }(1, 2, 3, 4));
                expect(result).toEqual(4);
                result = _.map([[1, 2, 3], [1, 2, 3]], _.last);
                expect(result).toEqual([3,3]);

                expect(_.last(null)).toEqual(undefined);
                expect(_.last([1, 2, 3], -1).length).toEqual(0);
            });
            
            
            /**
             * Test the maps functionality
             */
            it('maps', function () {
                expect(_.map([1, 2, 3], function (num) {
                    return num * 3;
                })).toEqual([3, 6, 9]);
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