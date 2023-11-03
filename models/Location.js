const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Location extends Model {}

Location.init(
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
        avg_rating: {
            type:DataTypes.INTEGER,
            allowNull: false,
            
           }, 
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'location',
    }
);
module.exports = Location