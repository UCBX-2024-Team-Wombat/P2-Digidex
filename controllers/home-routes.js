const withAuth = require('../utils/auth');
const { Card, Collection } = require('../models/index');
const { where } = require('sequelize');

const router = require('express').Router();

router.get('/login', (req, res) => {
  res.render('login', { layout: 'welcome' });
})

router.get('/', withAuth, (req, res) => {
  res.render('homepage');
})

//all cards
//add withAuth when login is working
router.get('/collection/:id', async (req, res) => {
  try {
    const collectionData = await Collection.findByPk(
      req.params.id,
      {
        //get card data associated with collection 
        include: {
          model: Card
        }


      }
    ) 
    const collection = collectionData.get ({plain: true});
    console.log("")
    console.log("")
    console.log("")
    console.log("")
    console.log(collection.cards);
  
    res.render('cards-dashboard', { ...collection });
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

module.exports = router;