const router = require("express").Router();
const { Card, Collection } = require("../models/index");
const withAuth = require("../utils/auth");

// Login endpoint (for non-logged-in users)
router.get("/login", (req, res) => {
  res.render("login", { layout: "welcome" });
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

router.get("/card/:id", async (req, res) => {
  try {
    const card = await Card.findOne({
      where: {
        id: req.params.id,
      },
      include: { model: Collection },
    });

    if (!card) {
      res.status(404);
    }

    const formattedCard = {
      id: card.id,
      title: card.title,
      description: card.description,
      markdown_description: card.markdown_description,
      collectionId: card.collections[0].id,
      collectionTitle: card.collections[0].title,
    };

    res.render("card-full-page", { card: formattedCard });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

router.get("/sign-up", (req, res) => {
  res.render("sign-up", { layout: "visitor-shell" });
});
module.exports = router;
