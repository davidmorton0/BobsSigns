var assert  = require('assert');

var SignMaster = class{
  constructor() {
    this.changePrices({'add': 0, 'rem': 0});
  }
}

SignMaster.prototype.changePrices = function(prices) {
  this.add = prices['add'];
  this.rem = prices['rem'];
};

SignMaster.prototype.estimatePrice = function(oldSign, newSign) {
  let matrix = [];
  for (m = 0; m <= oldSign.length; m++) {
    matrix[m] = [];
    matrix[m][0] = m * this.rem;
  }
  for (n = 1; n <= newSign.length; n++) {
    matrix[0][n] = n * this.add;
  }
  for (m = 1; m <= oldSign.length; m++) {
    for (n = 1; n <= newSign.length; n++) {
      matrix[m][n] = this.calcCost(matrix[m-1][n], matrix[m][n-1], matrix[m-1][n-1], oldSign[m-1], newSign[n-1]);
    }
  }
  return matrix[oldSign.length][newSign.length];
};

SignMaster.prototype.calcCost = function(a, b, c, let1, let2) {
  if (let1 == let2) {
    return c;
  } else {
    return Math.min(a + this.rem, b + this.add);
  }
}

//Tests
var sign = new SignMaster();
sign.changePrices({'add': 5, 'rem': 4});
assert(sign.estimatePrice('totes','toes') == 4);
assert(sign.estimatePrice('totes','oats') == 13);
