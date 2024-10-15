const { Model, DataTypes } = require('sequelize');
const sequelize = require("../config/connection");
const Collection = require('./Collection');
const Card = require('./Card');

class CardToCollection extends Model { } // do we need any constructor ? discuss with group 

CardToCollection.init(
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
                model: Collection, //target name
                key: 'id' //primary key of Collection Model
            },
            // onDelete: 'CASCADE', // discuss this


        },
        cardId: {
            type: DataTypes.INTEGER,
            allownull: false,
            references: {
                model: Card, //target table
                key: 'id', // Cards primary key 

            },
            // onDelete: 'CASCADE',
        },
    },
    {
        sequelize, // passing sequlize option 
        timestamps: false, // timestampa gerek yok diye dusunuyorum
        freezeTableName: true,
        underscored: true,
        modelName: 'card_to_collection'
    }
);

module.exports = CardToCollection;
