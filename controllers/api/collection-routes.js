const router = require('express').Router();
const { Card, CardToCollection } = require('../../models/index');
const { Op } = require("sequelize");

// Bradyn

router.get('/collection/:id', async (req, res) => {
    try {
      // Query junction between Cards and Collections
      //using async/await to handle the findAll method 
      const cardToCollectionJunction = await CardToCollection.findAll({
        where: { card_id: req.params.collectionId }, 
        include: [
            { 
                model: Card 
            }
        ] 
      });
  
      // Render card dashboard and pass card data from queried junction record to page for card rendering
      res.render('dashboard', { cards: cardToCollectionJunction });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
  });
// ================



// Jamil

router.post("/search", async (req, res) => {
  try {
    const searchPayload = req.body;

    const queryResults = await Collection.findAll({
      where: {
        [Op.or]: [
          {
            title: {
              [Op.iLike]: `%${searchPayload.fullString}%`,
            },
          },
          {
            description: {
              [Op.iLike]: `%${searchPayload.fullString}%`,
            },
          },
        ],
      }
    });

    if (queryResults) {
      res
        .status(200)
        .json(
          queryResults.map((collection) => collection.get({ plain: true }))
        );
    } else {
      res.status(400);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Export
module.exports = router;
