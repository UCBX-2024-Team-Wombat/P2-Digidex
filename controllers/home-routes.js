const withAuth = require("../utils/auth");
const { User, Collection } = require("../models/index");
const router = require("express").Router();

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

module.exports = router;