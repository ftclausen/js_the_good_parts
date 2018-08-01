var fruitBasket = {
  contents: function(magic, stuff) {
    return "The contents are: '" + this.things + "' with magic '" + magic + "'";
  }
}

var someBasket = {
  things: "apple orange kiwi"
}

console.log("Before apply");
// The contents are: 'undefined' with magic 'undefined'
console.log("\t" + fruitBasket.contents());

console.log("After apply with redefining this");
// The contents are: 'apple orange kiwi' with magic 'some'
// Redfine my 'this'          to be someBasket
// fruitBasket.contents.apply(someBasket, ["some"])
console.log("\t" + fruitBasket.contents.apply(someBasket, ["some"]));

console.log("After apply without redefining this (just want args)");
// The contents are: 'undefined' with magic 'some'
console.log("\t" + fruitBasket.contents.apply(null, ["some"]));
