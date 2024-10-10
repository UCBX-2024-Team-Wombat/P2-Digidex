const withAuth = require('../utils/auth');
const { Card } = require('../models/index');

const router = require('express').Router();

router.get('/login', (req, res) => {
  res.render('login', {layout: 'welcome'});
})

router.get('/', withAuth, (req, res) => {
  res.render('homepage');
})


router.get('/card/:id', async (req, res) => {
  try {
    const card = await Card.findOne({
      where: {
        id: req.params.id
      }
    });

    if(!card){
      res.status(404);
    }

    res.render('card-full-page', {card: card.get({ plain: true})});
  }
  catch (err){
    console.log(err);
    res.status(500);
  }
})

module.exports = router;