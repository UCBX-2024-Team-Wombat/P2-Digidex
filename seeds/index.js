const sequelize = require('../config/connection');
const cards = require('./cardsData')

sequelize.sync({force: true}).then( async () => {
    await cards()
    console.log('cards seeded')
  })