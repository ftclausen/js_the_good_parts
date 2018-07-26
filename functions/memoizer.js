var totalRunsNonMemo = 0;
var totalRunsMemo = 0;

var fibonacci = function(n) {
  totalRunsNonMemo += 1;
  return n < 2 ? n : fibonacci(n - 1) + fibonacci(n -2);
};

var memoizer = function(memo, formula) {
  var recur = function(n) {
    var result = memo[n];
    if (typeof result !== 'number') {
      result = formula(recur, n);
      memo[n] = result;
    }
    return result;
  };
  return recur;
};

for (var i=0;i <= 10;i += 1) {
  console.log("// " + i + ": " + fibonacci(i));
}
console.log("Total runs no memo: " + totalRunsNonMemo);

var fibMemo = memoizer([0, 1], function(recur, n) {
  totalRunsMemo += 1;
  return recur(n - 1) + recur(n - 2);
});

for (var i=0;i <= 10;i += 1) {
  console.log("// " + i + ": " + fibMemo(i));
}

console.log("Total runs memo: " + totalRunsMemo);
