const { Model, DataTypes } = require('sequlize');
const sequlize = require("../config/connection");

class CardsToCollection extends Model { } // do we need any constructor ? discuss with group 

CardsToCollection.init(
    {
        collectionId: {
            type: INTEGER,
            allownull: false,
            refrences: {
                model: 'Collection', //target name
                key: 'id' //primary key of Collection Model
            },
            // onDelete: 'CASCADE', // discuss this


        },
        cardId: {
            type: INTEGER,
            allownull: false,
            references: {
                model: 'Cards', //target table
                key: 'id', // Cards primary key 

            },
            // onDelete: 'CASCADE',
        },
    },
    {
        sequlize, // passing sequlize option 
        modelName: 'CardsToCollection',
        tableName: 'cards_to_collection',  //custom name can be add if needed
        timestamps: false // timestampa gerek yok diye dusunuyorum

    }

);
module.exports = CardsToCollection;
