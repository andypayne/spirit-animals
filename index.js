var sample = require('lodash.sample');
var sampleSize = require('lodash.samplesize');
var zip = require('lodash.zip');

var adjectives = require('./adjectives');
var animals = require('./animals');
var colors = require('./colors');

function getSampleOf(array, size) {
  if (size > array.length) {
    var len = array.length;
    var remaining = size;
    var out = [];
    while (remaining > len) {
      out.push.apply(out, sampleSize(array, len));
      remaining -= len;
    }
    if (remaining > 0) {
      out.push.apply(out, sampleSize(array, remaining));
    }
    return out;
  } else {
    return sampleSize(array, size);
  }
}

module.exports = {
  one: function (options) {
    var withSpaces = options && options.withSpaces;
    return [sample(adjectives), sample(colors), sample(animals)].join(withSpaces ? ' ' : '');
  },
  get: function (num, options) {
    var withSpaces = options && options.withSpaces;
    var number = parseInt(num, 10);
    if (isNaN(number)) {
      throw TypeError('spirit-animals#get must be called with a number, not ' + num);
    }
    var adj, col, anim;

    return zip(
      getSampleOf(adjectives, number),
      getSampleOf(colors, number),
      getSampleOf(animals, number)
    ).map(function (parts) {
      return parts.join(withSpaces ? ' ' : '');
    });
  }
};
