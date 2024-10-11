const router = require("express").Router();
const { User, Card, Collection } = require("../models/index");
const withAuth = require("../utils/auth");
const { where } = require('sequelize');

// Login endpoint (for non-logged-in users)
router.get("/login", (req, res) => {
  res.render("login", {  layout: "welcome"  });
});

// Homepage endpoint (for logged in users)
router.get("/", withAuth, async (req, res) => {
  try {
    // Query and parse collections associated with user
    const queriedCollections = await Collection.findAll({
      where: { user_id: req.session.user_id },
    });

    let results = queriedCollections.map((collection) =>
      collection.get({ plain: true })
    );

    // Render page if collections found, otherwise return error
    if (results) {
      res.render("collections-dashboard", { collections: results });
    } else {
      res.status(400);
    }
  } catch (error) {
    res.status(500);
  }
});

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