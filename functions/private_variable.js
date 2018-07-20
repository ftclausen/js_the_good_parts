var myObject = (function() {
  var value = 0;

  return {
    increment: function(inc) {
      value += typeof inc === 'number' ? inc : 1;
      return 'success'
    },
    getValue: function() {
      return value;
    }
  };
}());

console.log(myObject.increment());
console.log(myObject.increment());
console.log(myObject.increment());
console.log(myObject.increment());
console.log(myObject.getValue());
myObject.value = 1;
console.log(myObject.getValue());
