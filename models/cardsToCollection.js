const { Model, DataTypes} = require('sequlize');
const sequlize = require("../config/connection");

class CardsToCollection extends Model {} // do we need any constructor ? discuss with group 

CardsToCollection.init(
    {
    collectionId:{
        type: INTEGER,
        allownull: false,
        refrences: {
            model: 'Collections', //target name
            key: 'id' //primary key of Collection Model
        },
       // onDelete: 'CASCADE', // discuss this


    },
    cardId:{
        type: INTEGER,
        allownull: false,
        references: {
            model: 'Cards', //target table
            key: 'id', // Cards primary key 

        },
       // onDelete: 'CASCADE',
    },

    
}

)
