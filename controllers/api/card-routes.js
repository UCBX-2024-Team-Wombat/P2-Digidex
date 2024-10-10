const router = require("express").Router();
const { Op } = require("sequelize");
const { Card, Collection } = require("../../models/index");

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
      include: { model: Collection }
    });
    console.log('queryResults')
    console.log(queryResults)
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

module.exports = router;
