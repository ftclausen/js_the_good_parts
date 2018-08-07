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
    console.log("[mammal] This is " + typeof this);
    return spec.name;
  };

  that.says = function() {
    return spec.saying;
  };

  return that;
};

var myMammal = mammal({name: 'Herb mc berb'});
// console.log(myMammal.get_name());

//
// Now make a cat from a mammal
//
var cat = function(spec) {
  spec.saying = spec.saying || 'meow';
  var that = mammal(spec);

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

  return that;
};

var myCat = cat({name: 'Ziggy super cat'});

// console.log(myCat.get_name());
// console.log(myCat.purr(5));
// console.log(myCat.says());

//
// Super methods
//
Object.method('superior', function(name) {
  // and THAT here will be whatever func superior is called on.
  // In the example below it'll be `cat`
  //
  // SO that is `cat` and take its given 'name' method which will
  // be `get_name` below
  var that = this, from_super_method = that[name];
  return function() {
    // return from_super_method()
    return from_super_method.apply(that, arguments);
  };
});

var coolcat = function(spec) {
  var that = cat(spec);
  var super_get_name = that.superior('get_name');
  that.get_name = function(b) {
    return 'like ' + super_get_name() + ' baby';
  };
  return that;
};

var myCoolCat = coolcat({name: 'Freddo'});
console.log(myCoolCat.get_name());
