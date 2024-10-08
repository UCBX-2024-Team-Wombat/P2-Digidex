const { Cards } = require('../models');

const cardsdata = [
    { 
        title: "Card 1", 
        description: "Description for Card 1", 
    },
    { 
        title: "Card 2", 
        description: "Description for Card 2",  
    },
    { 
        title: "Card 3", 
        description: "Description for Card 2", 
    },
];

const seedCards = () => Cards.bulkCreate(cardsdata);

module.exports = seedCards;
