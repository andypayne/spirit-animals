const spiritAnimals = require('./index');

const one = spiritAnimals.one();
console.log(`one: ${one}`);

const anotherOne = spiritAnimals.one({lowercase: true, separator: '-'});
console.log(`anotherOne: ${anotherOne}`);

const five = spiritAnimals.get(5, {separator: ' '});
console.log(`five: ${five}`);

const fiveMore = spiritAnimals.get(5, {lowercase: true, separator: '-'});
console.log(`fiveMore: ${fiveMore}`);

