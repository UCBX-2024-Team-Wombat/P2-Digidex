const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('homepage');
})

router.get('/collections', (req, res) => {
  res.render('collections-dashboard');
})
module.exports = router;