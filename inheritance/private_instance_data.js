//
// Utility method to bolt on methods to objects
//
Function.prototype.method = function(name, func) {
  this.prototype[name] = func;
  return this;
};

//
// Make a mammal base object
//
var mammal = function(spec) {
  var that = {};
  that.get_name = function() {
    return spec.name;
  };

  that.says = function() {
    return spec.saying;
  };

  return that;
};

var myMammal = mammal({name: 'Herb mc berb'});
console.log(myMammal.get_name());

//
// Now make a cat from a mammal
//
var cat = function(spec) {
  spec.saying = spec.saying || 'meow';
  var that = mammal(spec);
  var always_plus_one = 0;

  that.purr = function(n) {
    var i, s = '';
    for (i = 0; i < n; i += 1) {
      if (s) {
        s += '-';
      }
      s += 'r';
    }
    return s;
  };

  that.get_name = function() {
    return that.says() + ' ' + spec.name + ' ' + that.says();
  };

  that.plus = function() {
    return always_plus_one + 1;
  };

  return that;
};

var myCat = cat({name: 'Ziggy super cat'});

console.log(myCat.get_name());
console.log(myCat.purr(5));
console.log(myCat.says());
console.log('Via func: ' + myCat.plus());
console.log('Direct: ' + myCat.always_plus_one);

//
// Super methods
//
Object.method('superior', function(name) {
  var that = this, method = that[name];
  return function() {
    return method.apply(that, arguments);
  };
});
