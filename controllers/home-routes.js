const withAuth = require('../utils/auth');

const router = require('express').Router();

router.get('/login', (req, res) => {
  res.render('login', {layout: 'welcome'});
})

router.get('/', withAuth, (req, res) => {
  res.render('homepage');
})

module.exports = router;