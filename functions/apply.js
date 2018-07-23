var fruitBasket = {
  contents: function(magic, stuff) {
    return "The contents are: '" + this.things + "' with magic '" + magic + "' stuff '" + stuff + "'";
  }
}

var someBasket = {
  things: "apple orange kiwi"
}

console.log("Before apply");
console.log(fruitBasket.contents());
console.log("After apply with redefining this");
console.log(fruitBasket.contents.apply(someBasket, ["some", "STUFFFF"]));
console.log("After apply without redefining this (just want args)");
console.log(fruitBasket.contents.apply(null, ["some", "STUFFFF"]));
