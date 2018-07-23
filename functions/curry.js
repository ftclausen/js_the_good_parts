// Currying can be considered in two ways:
// - You can "pre-fill" some argument with the curry function and then just
// pass the remaining args at a later stage. Kind of a convenience method for a
// particular use case.
// - Or it can be seen as transforming a function that takes multiple arguments
// into a chain of functions that take a single argument. E.g. traversing and
// transforming an array.
Function.prototype.method = function(name, func) {
  this.prototype[name] = func;
  return this;
};

Function.method('curry', function() {
  var slice = Array.prototype.slice,
      args = slice.apply(arguments),
      that = this;
  return function() {
    return that.apply(null, args.concat(slice.apply(arguments)));
  };
});

var sprayPaintCar = function(make, colour) {
  return "Car make " + make + " has been spray painted " + colour + " colour.";
}

console.log(sprayPaintCar('toyota', 'red'));
sprayPaintAToyota = sprayPaintCar.curry('toyota');
console.log(sprayPaintAToyota('blue'));
console.log(sprayPaintAToyota('pink'));
