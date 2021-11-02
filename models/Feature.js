const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Feature extends Model { }
// Once we decide what info we want from the api we will have to add things like movie poster, actors, imbd rating etc.

Feature.init(

  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    imdb_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'feature'
  }
);

module.exports = Feature;
