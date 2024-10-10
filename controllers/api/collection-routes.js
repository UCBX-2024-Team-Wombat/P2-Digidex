const router = require("express").Router();
const { Op } = require("sequelize");
const { Collection } = require("../../models/index");

// Bradyn
// ================

// Jamil
// ================

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
