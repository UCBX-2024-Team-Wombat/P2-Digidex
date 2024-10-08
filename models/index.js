//import necessary Libraries and Models 
const User = require ('./User');
const Card = require('./Card');
const Collection = require ('./Collection');
const CardToCollection = require ('./CardToCollection');
const CollectionToUser = require('./CollectionToUser');



// define relations
// One user has many collection
User.hasMany(Collection, {
    foreignKey:'user_id',
    onDelete: 'CASCADE'
});

//on the other hand a collection also belongs to one user
Collection.belongsTo(User, {
    foreignKey: 'user_id'
});

// there is many to many relationship between cards and Collection
Collection.belongsToMany(Cards, {
    through: CardToCollection,
    foreignKey: 'collectionID'
});

Cards.belongsToMany(Collection,{
    through: CardToCollection,
    foreignKey: 'cardId', //DO NOT FORGET TO CHECK CARDS CLASS AFTER CREATED
});

// Usewr and Collection also has many to many realitonsip (I ASSUMED USER AN SHARE THE COLLECTION WITH OTHER USERS),
User.belongsToMany(Collection,{
    through: CollectionToUser, 
    foreignKey: 'userdD',
    other: 'collectionId',
    onDelete: 'CASCADE',
})

Collection.belongsToMany(User,{
    throug: CollectionToUser,
    foreignKey: 'collectionId',
    otherKey: 'userId',
    onDelete:'CASCADE',
});

//Export Models
module.exports = {
    User,
    Collection,
    Card,
    CardToCollection,
    CollectionToUser,
};

