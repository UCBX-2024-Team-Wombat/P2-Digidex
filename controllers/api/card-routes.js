const router = require("express").Router();
const { Op } = require("sequelize");
const { Card, Collection } = require("../../models/index");
const parseMarkdown = require('../../utils/markdown-handler');

router.post('/new', async (req, res) => {
  try {
    const newCard = await Card.create(req.body, {individualHooks: true});

    if(newCard.id){
      res.status(201).json(newCard.get({plain: true}));
    }
    else {
      res.status(400).send();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
})

router.post("/update/:id", async (req, res) => {
  try {
    const updateResults = await Card.update(req.body, {
      where: {
        id: req.body.id,
      },
      individualHooks: true
    });

    if(updateResults[0] == 1){
      res.status(201).send();
    }
    else {
      res.status(400).send();
    }

  } catch (error) {
    console.log('error');
    console.log(error);
    res.status(500).send();
  }
});

router.post("/search", async (req, res) => {
  try {
    const searchPayload = req.body;

    const queryResults = await Card.findAll({
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
      include: { model: Collection },
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

router.post('/parse-markdown', (req, res) => {
  try {
    res.status(200).json(parseMarkdown(req.body.value));
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
})


module.exports = router;
