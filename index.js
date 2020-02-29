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
    var separator = options && options.separator ? options.separator : '';
    var lowercase = options && options.lowercase;
    return [
      lowercase ? sample(adjectives).toLowerCase() : sample(adjectives),
      lowercase ? sample(colors).toLowerCase() : sample(colors),
      lowercase ? sample(animals).toLowerCase() : sample(animals)
    ].join(separator);
  },
  get: function (num, options) {
    var separator = options && options.separator ? options.separator : '';
    var lowercase  = options && options.lowercase;
    var number = parseInt(num, 10);
    if (isNaN(number)) {
      throw TypeError('spirit-animals#get must be called with a number, not ' + num);
    }

    return zip(
      getSampleOf(adjectives, number).map(function(word) { return (lowercase ? word.toLowerCase() : word)}),
      getSampleOf(colors, number).map(function(word) { return (lowercase ? word.toLowerCase() : word)}),
      getSampleOf(animals, number).map(function(word) { return (lowercase ? word.toLowerCase() : word)})
    ).map(function (parts) {
      return parts.join(separator);
    });
  }
};
