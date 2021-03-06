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
    if(n === 0){
      return [];
    }
    return n === undefined ? array[array.length-1] : array.slice(-n); 
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
      // If collection is an ARRAY...
      if(Array.isArray(collection)){
        for(var i = 0, length = collection.length; i < length; i++){
          iterator(collection[i], i, collection);
        }
      }
      // If collection is an OBJECT...
      else {
        for(var key in collection){
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
  _.filter = function(collection, test) {  // _.filter(array, function(a){return a % 2 === 0});

      var arr = [];
      var obj = {};
      // USING _.EACH
      if(Array.isArray(collection)){
        _.each(collection, function(element){
          if(test(element) === true){
            arr.push(element); // Populate empty array for return.
          }
        }
        
        )
        return arr;
      }
      
      else {
        _.each(collection, function(value, key, collection){
          if(test(value) === true){
            obj[key] = value; // Populate empty object for return.
          }
        }
      )
      return obj;
    }
};
     /* ^^^^^^^^^^^^^^ USING LOOPS FOR FUNCTION ABOVE ^^^^^   
     if(Array.isArray(collection)){
        for(var i = 0, length = collection.length; i < length; i++){
          if(test(collection[i]) === true){
            arr.push(collection[i]);
          }
        }
        return arr;
      }
      
      else {
        for(var key in collection){
           if(test(collection[key]) === true){
            obj[key] = collection[key];
        }
      }
      return obj;
    }***************************end of loop alternate solution******************************/
  
  

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) { 
    // _.reject(array, function(a){return a % 2 === 0}); -- returns odd

    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    var noPassCollection = _.filter(collection, function(a){return !test(a)});
                                                                      //{return a%2 === 0}
    return noPassCollection;
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    // * iterate over each element
    // * push element to new array if it doesn't already exist in this new array

    var resultArr = [];
    _.each(array, function(element, index, collection){
      if(_.indexOf(resultArr, element) === -1){ // If element is not found in resultArr...
        resultArr.push(element); // ...add the element to resultArr.
      }
    })
    return resultArr;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.

// ****** _.EACH SOLUTION FOR MAP ***************
    var resultArr = [];

    _.each(collection, function(elementOrValue, indexOrKey, collection){
      resultArr.push(iterator(elementOrValue, indexOrKey, collection));
    })

    return resultArr;
// ************* END _.EACH SOLUTION FOR MAP *************

/* ^^^^^^^^ LOOP SOLUTION FOR MAP ^^^^^^^^
    var resultArr = [];

    if(Array.isArray(collection)){
      for(var i = 0, length = collection.length; i < length; i++){
        var element = collection[i];
        resultArr.push(iterator(element, i, collection));
      }
    }else {
      for(var key in collection){
        var value = collection[key];
        resultArr.push(iterator(value, key, collection));
      }
    }

    return resultArr;*/
// ********** END LOOP SOLUTION FOR MAP *************
  };


  // Takes an array of objects and returns an array of the values of
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

    var result, counter;

    if(accumulator !== undefined || accumulator === 0){
      result = accumulator;
      counter = 0; // If starting val is passed, it is used as starting val for result, even 0
    } else{
      result = collection[0];
      counter = 1; // No starting val passed, first element used as starting val for result, 
                                                                          //skipped in loop
    }


      // If collection is an ARRAY. Loop and pass result (accumulator), and next item/element.
      if(Array.isArray(collection)){
        for(var i = counter, length = collection.length; i < length; i++){
          result = iterator(result, collection[i]);
        } 
      }
      // If collection is an OBJECT...(is skipping first element possible? I don't know how.)
      else {
        for(var key in collection){
          result = iterator(result, collection[key]);
        }
      }

    return result;

  };




  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(wasFound, item) {
      if (wasFound) {
        return true;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) { // ex. (function(a){return a === 1;})...a is 'item'
    // TIP: Try re-using reduce() here.
    
      var returnVal = _.reduce(collection, function(isInThere, item){
        if(!isInThere){
          return false;
        }

        if(iterator){ // If callback function is provided, use it.
          return iterator(item);
        }
        else{ // If no callback is provided, use _.identity.
          return _.identity(item);
        }
      }, true)

      return Boolean(returnVal);

  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
   

   var returnVal = _.reduce(collection, function(passedItem, item){
    if(passedItem){
      return true;
    }

    if(iterator){
      return iterator(item);
    }
    else{
      return _.identity(item); // If no callback is provided, use _.identity.
    }

   }, false)
  
   return Boolean(returnVal);

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

    // ITERATE OVER ARGUMENTS
    // FOR-IN LOOP ON EACH ARGUMENT
      //ADD KEYS AND VALUES TO OBJ

    // ***USING _.EACH***
    _.each(arguments, function(item, index){
      var objectToExtend = item;
      _.each(objectToExtend, function(value, key){
        obj[key] = value;
      })
    })

    return obj;

    /*
    ***USING LOOPS:***
    for(var i = 0, length = arguments.length; i < length; i++){
      var objectToExtend = arguments[i];
      for(var key in objectToExtend){
        obj[key] = objectToExtend[key];

      }
    }
   
    return obj;
    */
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    _.each(arguments, function(item, index){
      var objectToInclude = item;
      _.each(objectToInclude, function(value, key){
        if(obj[key] === undefined){ // If key not already existent, even if it's "falsy"
          obj[key] = value;
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

    var map = {};

    return function(){

        var str = ''; 
        // Stringify the arguments so they can be used as object keys

        _.each(arguments, function(element){
          str = str + element + " ";
        });

        /*
        for(var i = 0; i < arguments.length; i++){
            str = str + arguments[i] + " ";
        }*/
        
      if(map[str] == undefined){ // If map does not contain the passed-in args
        map[str] = func.apply(this, arguments); // "Args": result is inputted to map
      }
      
      return map[str]; // Return stored result if it exists in map
    };

  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {

    var argsAfterFuncAndWait = [];

    for (var i = 2, length = arguments.length; i < length; i++) {
      argsAfterFuncAndWait.push(arguments[i]);
    };

    setTimeout(function(){
      func.apply(this, argsAfterFuncAndWait)
    }, wait)

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

    var arrayCopy = array.slice(0); 

    var m = array.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);

    // And swap it with the current element.
    t = arrayCopy[m];
    arrayCopy[m] = array[i];
    arrayCopy[i] = t;
  }

  return arrayCopy;

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

    var resultArr = [];

    for(var i = 0, length = collection.length; i < length; i++){

      if(typeof functionOrKey === 'function'){
        var result = functionOrKey.apply(collection[i]);
        
      }
      if(typeof functionOrKey === 'string'){
        var result = collection[i][functionOrKey]();
      }

      resultArr.push(result);
        
    }

    return resultArr;

  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    
    if(iterator === 'length'){
      return collection.sort(function(a,b){return a.length - b.length});
    }



    //collection = [{name : 'curly', age : 50}, {name : 'moe', age : 30}]
    //iterator= function(person) { return person.age; }

    var index = 0;

    return _.pluck(
      _.map(collection, function(value, key, list) {
        
      return {
        value: value,
        index: index++,
        criteria: iterator(value, key, list)
      };

    }).sort(function(left, right) {

      var a = left.criteria;
      var b = right.criteria;

      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }

      return left.index - right.index;
    }), 'value');
  };
  
    


  


  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.  See the Underbar readme for extra details
  // on this function.
  //
  // Note: This is difficult! It may take a while to implement.
  _.throttle = function(func, wait) {
  };
  
}());
