const withAuth = require('../utils/auth');
const { Card } = require('../models');

const router = require('express').Router();

router.get('/login', (req, res) => {
  res.render('login', {layout: 'welcome'});
})

router.get('/', withAuth, (req, res) => {
  res.render('homepage');
})

//all cards
//add withAuth when login is working
router.get('/dashboard', async (req, res) => {
  try {
    const cards = await Card.findAll()
    const cardsdata = cards.map(obj => obj.get({plain: true}))
    //console.log(cardsdata)
    res.render('cards-dashboard', {cards: cardsdata});
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

module.exports = router;