const router = require("express").Router();
const { Op } = require("sequelize");
const { Collection } = require("../../models/index");

// Query Collections matching passed query string
router.post("/search", async (req, res) => {
  try {
    const searchPayload = req.body;

    // Query Collections
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
      },
    });

    // Return results if found
    if (queryResults) {
      res
        .status(200)
        .json(
          queryResults.map((collection) => collection.get({ plain: true }))
        );
    }
    // Otherwise return error
    else {
      res.status(400);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Create new Collection
router.post('/new', async (req, res) => {  
  try {
    // Add user Id to payload
    const newCardPayload = {
      title: req.body.title,
      description: req.body.description,
      user_id: req.session.user_id
    }

    // Create new Collection
    const newCollection = await Collection.create(newCardPayload);
    
    // If successful, return success status
    if(newCollection.id){
      res.status(201).send();
    }
    // Otherwise return error
    else {
      res.status(400).send();
    }
  }
  catch (err){
    console.log(err);
    res.status(500).send();
  }
})

// Update Collection with passed data
router.put("/:id", async (req, res) => {
  try {
    // Query Collection matching passed Collection Id
    const updatedCollection = await Collection.update(
      {
        title: req.body.title,
        description: req.body.description,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    // 404 msg if the id does not mach
    if (!updatedCollection) {
      res.status(404).json({
        message: "No collection found!",
      });
      return;
    }

    //200 respond if is succesufully updates
    res.status(200).json(updatedCollection);
  } catch (err) {
    // catch the arror if any hanppens in try block
    // 500 respond if any error occure
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
