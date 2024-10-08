//import necessary Libraries and Models 
const Collections = require ('./Collections');
const CardsToCollection = require ('./CardsToCollection');
const User = require ('./User');
const CollectionToUser = require(./CollectionToUser);

// define relations
//One user has many collection

User.hasMany(Collection,{
    foreignKey:'user_id',
onDelete: 'CASCADE',
});

//on theother hand a collection also belongs to one user
Collections.belongsTo(User,{
    foreignKey: 'user_id'
});

// there is many to many relationship between cards and collections
Collections.belongsToMany(Cards,{
through: CardsToCollection,
foreignKey: 'collectionID',
otherKey: 'cardID', //after cards class created chweck there too
onDelete: 'CASCADE'
});

Cards.belongsToMany(Collections,{
    through: CardsToCollection,
    foreignKey: 'cardId', //DO NOT FORGET TO CHECK CARDS CLASS AFTER CREATED
    otherKey: 'collectionId',
    onDelete: 'CASCADE',
});

// Usewr and Collections also has many to many realitonsip (I ASSUMED USER AN SHARE THE COLLECTION WITH OTHER USERS),
User.belongsToMany(Collections,{
    through: CollectionToUser, 
    foreignKey: 'userdD',
    other: 'collectionId',
    onDelete: 'CASCADE',
})

Collections.belongsToMany(User,{
    throug: CollectionToUser,
    foreignKey: 'collectionId',
    otherKey: 'userId',
    onDelete:'CASCADE',
});


