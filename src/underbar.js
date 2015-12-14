(function() {
  'use strict';

  window._ = {};

  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    return n === undefined ? array[0] : array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.

  _.last = function(array, n) {
    // If n is undefined return the last element.
    // If n is a number, slice the array starting from length - n, which slices off the last n elements
    // Or return whole array if n is greater than length. (But don't let the integer inside slice be negative which would skew results)
    // If n is zero, slice starts at length, which returns an empty array.
    return n === undefined ? array[array.length-1] : array.slice(Math.max(0, array.length - n));
  };


  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.

  _.each = function(collection, iterator) {
    // If collection is an array
    if( Array.isArray(collection) ){
      // Using a for loop, invoke callback taking each element, each index value, and the object itself as parameters
      for( var i = 0; i < collection.length; i++){
        iterator(collection[i], i, collection);
      }
    }else{
      // If collection is a regular object
      // Use a for-in loop to invoke callback taking each value, each key and the object itself as parameters.
      for( var key in collection ){
        iterator(collection[key], key, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var result = -1;

    _.each(array, function(item, index) {
      if (item === target && result === -1) {
        result = index;
      }
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) { 
    // Create an empty results array to hold our values that pass the truth test.
    var results = [];

    // Using _.each, iterate over collection
    _.each(collection, function(element){
      // If an element passed to the callback named test returns 'true'...
      if(test(element)){
        // Push the element into results.
        results.push(element);
      }
    });

    //Return the array of elements that passed the truth test.
    return results;

  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it

    // Pass the test callback into filter, but invert it.
    // each element will first be passed to this outer anonymous callback, then into test, where the ! will reject true results and include false results.
    return _.filter(collection, function(element){ return ! test(element) })

  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    // Create empty results array
    var results = [];
    // Iterate over array
    _.each(array, function(element){
      // If does not exist (indexOf returns -1) in results, push to results
      if(_.indexOf(results, element) < 0){
        results.push(element);
      }
    })

    return results;

  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.

    var results = [];

    
    _.each( collection, function( element, index, obj ){
      results.push( iterator( element ) ); // Callback passed to _.map does work on each element.
    });

    return results;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, function(item){
      return item[key];
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(accumulator, item) for each item. accumulator should be
  // the return value of the previous iterator call.
  //  
  // You can pass in a starting value for the accumulator as the third argument
  // to reduce. If no starting value is passed, the first element is used as
  // the accumulator, and is never passed to the iterator. In other words, in
  // the case where a starting value is not passed, the iterator is not invoked
  // until the second element, with the first element as its second argument.
  //  
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //  
  //   var identity = _.reduce([5], function(total, number){
  //     return total + number * number;
  //   }); // should be 5, regardless of the iterator function passed in
  //          No accumulator is given so the first element is used.
  _.reduce = function(collection, iterator, accumulator) {
    // Set flag variable to true if no accumulator parameter is passed in.
    var flag = accumulator === undefined;
    // Begin iteration on collection...
    _.each(collection, function(element){
    // If flag is true (if no accumulator parameter has been passed in)...
      if(flag){
        // Set accumulator to first element
        accumulator = element;
        // Re-set flag to false to avoid entering this if block again
        flag = false;
      }else{
      // Else: on further iterations or if accumulator param -has- been passed.
      // Re-set accumulator to result of callback which does work on with accumulator and element

      accumulator = iterator(accumulator, element);
      }
    });
      // Return accumulator
      return accumulator;
   
  };

  // Determine if the array or object contains a given value (using `===`).
 

  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    // ALTERNATE SOLUTION FROM THAT PROVIDED:
    return _.reduce(collection, function(wasFound, item) {
     return wasFound || item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
 
    // Default assignment:
    iterator = iterator || _.identity;

    // Return the result of calling _.reduce on the collection with a callback and accumulator set to the starting value of 'true';
    // Accumulator starts as true, if it is re-set to false as a result of a failed test..

    var answer = _.reduce(collection, function(record, item) {
      // It will *stay* false because it won't escape this if block:
      if(record === false){
        return false;
      }
      // If item passes the test callback, record is reassigned to true; if it fails, record is reassigned to false and will be forced to keep entering the if block and returning false
      
      return Boolean(iterator(item)); // Use Boolean so undefined turns into false
    }, true);

    return Boolean(answer);
  };


  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
 
  _.some = function(collection, iterator) {

    // TIP: There's a very clever way to re-use every() here.

  iterator = iterator || _.identity;

  return !!/*booleanize*/ !_.every(collection, function(item){ 
        //_.every FAILS if ALL TESTS don't return false (at least one test returns true). 
        // The !  turns that into a true so _.some returns true!

        // If any item PASSES TEST, it IS NOT FALSE
      return !!/*booleanize*/iterator(item) === false; 
      //_.every needs EVERY ITEM TO BE FALSE or else it EXITS and returns false.
      // Only if EVERY ITEM FAILS _.some's test does _.every return true, which gets converted and returned as a failure.
    });


  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    // Create an iteration to pass over each argument, including the first one.
      // Use _.each to populate the first argument object with all the keys and values.
      // Any repeat keys will be replaced with the later values.

    _.each(arguments, function(objectParam){
      _.each(objectParam, function(value, key){
        obj[key] = value;
      })
    })
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {

    _.each(arguments, function(objectParam){
      _.each(objectParam, function(value, key, object){
        if(obj[key] === undefined){ // Undefined means non-existent. Using !newObj[key] would overwrite falsy values.
          obj[key] = value; // Assign values to previously undefined keys.
        }
      })
    })
    return obj;

  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!alreadyCalled) {
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memorize an expensive function's results by storing them. You may assume
  // that the function only takes primitives as arguments.
  // memoize could be renamed to oncePerUniqueArgumentList; memoize does the
  // same thing as once, but based on many sets of unique arguments.
  //
  // _.memoize should return a function that, when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
   
   var storage = {}; // Create an object to store the results of calling func.

    return function(){
       var argumentsString = '';
       // The object keys will be unique argument lists, as strings.
       // Stringify the arguments
      _.each(arguments, function(element){
        argumentsString = argumentsString + element + ' ';
      });
      // Only call func if the results aren't already in storage, paired with unique argument list
        // Pass the following inner call to func the arguments array that will be passed into this 'closure function'
      if (storage[argumentsString] === undefined) {
        storage[argumentsString] = func.apply(this, arguments)
        // Every time the closure function is invoked, it checks storage, and adds to it if necessary. Closure variables are modifiable.
      }
      
      return storage[argumentsString]; 
    };

  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    // Use setTimeout
      // wrap func in anonymous function inside of which .apply is used to pass in arguments[2]-arguments[n];
     var args = [];  
    // Note: the underscore function _.rest would accomplish the following:
    // args = _.rest(arguments, 3)
   _.each( arguments, function( element, index ){
      if( index >= 2 ){
        args.push( element ); // Push element into args array
      }
    });
   // In order to pass arguments into a function parameter for setTimeout, wrap it in an anon. function and use apply.
    setTimeout( function(){return func.apply(this, args)}, wait )
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    // Copy array:
    var newArray = array.slice(0);

    // Iterate over the array.
      // Take first element. Send it to a new place in the array, at a random index.
      // Assign the element at that index to a temp variable.
      // Assign first element to temp variable.
      // Repeat with all elements.

      _.each(newArray, function(element, index, collection){
        var random = Math.floor(Math.random()*collection.length); // Create random number between 0 and length.
        var temp = collection[random]; // Temp stores the element at the random index.
        collection[random] = element; // The element at random index re-set to current element in iteration.
        collection[index] = temp; // Current element in iteration re-set to temp.
      });

    return newArray;
  };


  /**
   * EXTRA CREDIT
   * =================
   *
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Calls the method named by functionOrKey on each value in the list.
  // Note: You will need to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    
   
   return _.map(collection, function(element){

      if(typeof functionOrKey === 'function'){

        return functionOrKey.apply(element); 
        
      }else{
        // Same as -- return element[functionOrKey].apply(element);
        return element[functionOrKey]();
        
      }
    });

  };







  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    // Create new objects with the following key value pairs
      // 'originalObject': a copy of each object in collection
      // 'criteria': collection.iterator or iterator(collection)

      var newCollection = _.map(collection, function(element){
        var object = {
          originalObject: element
        };
        // Criteria is the result of a function call on the element...
        // or, if iterator is a string, a property lookup on element.
        
        object.criteria = typeof iterator === 'function' ? iterator(element) : element[iterator];

        return object;
      });
      
        // Note: THIS SORTS NUMBERS FROM LOW TO HIGH
        // AND STRINGS FROM A TO Z.
        // but it doesn't handle undefined values.
        newCollection.sort(function(a,b){
          if(typeof a.criteria === 'number'){
            return a.criteria - b.criteria;
          }else{
            if(a.criteria > b.criteria) return 1;
            if(a.criteria < b.criteria) return -1;
          }

        })

      // newCollection is now sorted, but we have to extract just the originalObjects 
      var sortedOriginalCollection = _.pluck(newCollection, 'originalObject');

      return sortedOriginalCollection;
      
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function(array1, array2) {

    // map the arguments into an array so it can be sorted
    // this way you can find the longest array and use its length value as the maximum for a counter variable


    var sortedArrayOfArrays = _.map(arguments, function(element){
      return element;
    }).sort(function(a,b){ return b.length - a.length })

    var length = sortedArrayOfArrays[0].length

    var results = [];

    var counter = 0;

  while(counter < length){
    // map the elements at index counter ( element[counter] ) to miniArray)
    var miniArray = _.map(sortedArrayOfArrays, function(element){
      return element[counter];
    })
      // push miniArrays into the results array
      results.push(miniArray);
      // increment the counter that will stop the while loop when we are done with longest array
      counter++;

    }

    return results;

  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    
    result = result || []; // Default assignment.

    _.each(nestedArray, function(element){ // Iterate.
      if(Array.isArray(element)){ // If element is an array.
       _.flatten(element, result); // Recursively call flatten on that array and make sure a reference to result is sent through the recursion
        // Could do result = result.concat(x) and not pass in result as a param.
      }else{
        result.push(element); // When iteration comes across a non-array element, push it to result.
      }
    });
    return result;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {

    // Find longest argument-array

    var longest = _.map(arguments, function(element){return element}).sort(function(a,b){
      return b.length-a.length})[0];

    // Iterate over the longest array
      // Check if its elements are contained in all other arrays.
        // user a counter keep track of all the arguments
        // if an element occurs arguments.length times, we are golden
    var results = [];

    for( var i = 0; i < longest.length; i++){
      var counter = 0;
      for( var j = 0; j < arguments.length; j++){

        if(_.indexOf(arguments[j], longest[i]) > -1){
          counter++;
        }
      }
      if(counter === arguments.length){
        results.push(longest[i]);
      }
    }

  return results;

  
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array1) {

    
    var results = [];

    for( var i = 0; i < array1.length; i++){
      var counter = 0
      for( var j = 1; j < arguments.length; j++){

        if(_.indexOf(arguments[j], array1[i]) < 0 ){
          counter++;
        }
      }
      if(counter === arguments.length-1){
        results.push(array1[i]);
      }
    }

  return results;
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
}());
