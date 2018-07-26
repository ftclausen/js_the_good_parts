var myMammal = {
  name: 'Herb the Mammal',
  get_name: function() {
    return this.name;
  },
  says: function() {
    return this.saying || '<silent killer>';
  }
};

var myCat = Object.create(myMammal);
myCat.name = 'Chairman Meow';
myCat.saying = 'meow mofos';
myCat.purr = function(n) {
  var i, s = '';
  for (i = 0; i < n; i += 1) {
    if (s) {
      s += '-';
    }
    s += 'r';
  }
  return s;
};
myCat.getName = function() {
  return this.says() + ' ' + this.name + ' ' + this.says();
};

console.log(myCat.getName());
console.log(myCat.purr(5));
