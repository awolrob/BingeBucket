const { Bucket, User, Feature, Comment, Review } = require('../models');

const featuredata = [
  {
    imdb_id: 'tt4154756',
    user_id: 1,
    title: 'Avengers: Infinity War'
  }
];

console.log('Feature Data');
console.log('********************');
// console.log(featuredata);

const seedFeature = () => Feature.bulkCreate(featuredata);

module.exports = seedFeature;
