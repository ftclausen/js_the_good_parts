Function.prototype.method = function(name, func) {
  this.prototype[name] = func;
  return this;
};

String.method('deentityify', function() {
  var entity = {
    quot: '"',
    lt: '<',
    gt: '>'
  };

  return function() {
    return this.replace(/&([^&;]+);/g,
      function(a, b) {
        var r = entity[b];
        return typeof r === 'string' ? r : a;
      }
    )
  };
}());

var toDo = '&lt;&quot;&gt;';
console.log(toDo + " -> " + toDo.deentityify());
