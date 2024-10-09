const router = require('express').Router();
const { Collection } = require('../../models/index');

// Bradyn
const { Card, CardToCollection } = require('../../models');

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
// ================

// Export
module.exports = router;