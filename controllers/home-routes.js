const withAuth = require('../utils/auth');
const {Collection} = require('../models/index');
const router = require('express').Router();

router.get('/login', (req, res) => {
  res.render('login', {layout: 'welcome'});
})

router.get('/', withAuth, (req, res) => {
  res.render('homepage');
})

router.get('/collections', async (req, res) => {
  try {

    console.log(req.session);

    const queriedCollections = await Collection.findAll({
      where: {user_id: req.session.user_id}
    })

    const tmp = await Collection.findAll();

    console.log('tmp')
    console.log('=======================')
    console.log(tmp);
    console.log('=======================')

    console.log(queriedCollections);

    if(queriedCollections){
      res.render('collections-dashboard',{collections: queriedCollections});
    }
    else {
      res.status(400)
    }


  } catch (error) {
    console.log(error)
    res.status(500)
  }
 
})
module.exports = router;