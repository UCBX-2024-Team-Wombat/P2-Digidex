const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Collection = require('./Collection')
const User = require('./User');

class CollectionToUser extends Model { };

CollectionToUser.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        collectionId: {
            type: DataTypes.INTEGER,
            allownull: false,
            refrences: {
                model: Collection, // target model
                key: 'id', //primary key of Collection

            },
        },
        userId: {
            type: DataTypes.INTEGER,
            allownull: false,
            refrences: {
                model: User,
                key: 'id', // primary key of USer
            },

        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        tableName: 'collection_to_user'
    }
);

module.exports = CollectionToUser;

