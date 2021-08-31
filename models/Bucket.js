const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Bucket extends Model {}

Bucket.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    feature_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'feature',
        key: 'id'
      }
    },
  },
    {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'Review'
  }
);

module.exports = Bucket;