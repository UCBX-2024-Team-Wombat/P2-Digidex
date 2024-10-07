const { Model, Datatypes, INTEGER } = require('sequelize');
const sequelize = require('../config/connection');


class CollectionToUser extends Model { };
CollectionToUser.init(
    {
        collectionId: {
            type: INETEGER,
            allownull: false,
            refrences: {
                model: 'Collections', // target model
                key: 'id', //primary key of Collections

            },
        },
        userId: {
            type: INTEGER,
            allownull: false,
            refrences: {
                model: 'User',
                key: 'id', // primary key of USer
            },

        },
    },
{
    sequilze,
    timestamps: false,
    modelName: 'CollectionToUser',
    tableName: 'collection_to_user',

})
module.exports = CollectionToUser;

