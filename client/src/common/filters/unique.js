(function() {
  'use strict';

  

  angular.module('common.filters.unique', [])
    .filter('unique', function() {

  // Take in the collection and which field
  //   should be unique
  // We assume an array of objects here
  // NOTE: We are skipping any object which
  //   contains a duplicated value for that
  //   particular key.  Make sure this is what
  //   you want!
  return function (arr, targetField) {

    var values = [],
        i, v,
        unique,
        l = arr.length, 
        results = [],
        obj;

    // Iterate over all objects in the array
    // and collect all unique values
    for( i = 0; i < arr.length; i++ ) {

      obj = arr[i];

      // check for uniqueness
      unique = true;
      for( v = 0; v < values.length; v++ ){
        if( obj[targetField] == values[v] ){
          unique = false;
        }
      }

      // If this is indeed unique, add its
      //   value to our values and push
      //   it onto the returned array
      if( unique ){
        values.push( obj[targetField] );
        results.push( obj );
      }

    }
    return results;
  };
});
})();
