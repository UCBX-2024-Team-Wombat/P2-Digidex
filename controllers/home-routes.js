const router = require('express').Router();

router.get('/', (req, res) => {
  res.render('homepage');
})

router.get('/sign-up', (req,res) => {
  res.render('sign-up',{ layout: 'visitor-shell'});
})
module.exports = router;