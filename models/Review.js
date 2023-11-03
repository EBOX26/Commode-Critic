const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Review extends Model {}

Review.init(
    {
       id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
       },
       review: {
        type: DataTypes.STRING,
        allowNull: true,
       },
       rating: {
        type:DataTypes.INTEGER,
        allowNull: false,
        validate: {min: 1, max: 5}
       }, 
       user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
        }
       }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'review',
    }
);

module.exports = Review