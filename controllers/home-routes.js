const withAuth = require('../utils/auth');
//const {Collection} = require('../models/index');
const {User,Collection} = require('../models/index');
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
    console.log(queriedCollections);
    
    const tmp = await Collection.findAll();
    
    let results = queriedCollections.map((collection) => collection.get({ plain: true }))
    console.log("Sanitized Data: ", results);

   // if(queriedCollections){
    if(results){
      res.render('collections-dashboard',{collections: results});
    }
    else {
      res.status(400)
    }


  } catch (error) {
    console.log(error)
    res.status(500)
  }
 
})

/*
// Middleware to ensure user is authenticated  did i set up it?
const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
};

// Route to get collections of the signed-in user
router.get('/collections', ensureAuthenticated, async (req, res) => {
  try {
    // Fetch collections for the logged-in user
    const collections = await Collection.findAll({
      where: { user_id: req.user.id }
    });
    res.json(collections); // Send collections as JSON or render them to the view
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch collections' });
  }
}); */

module.exports = router;


