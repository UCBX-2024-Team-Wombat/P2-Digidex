const router = require("express").Router();
const { User } = require("../../models/index");
const bcrypt = require('bcrypt');

// Login Endpoint(s)
// POST login endpoint
router.post("/login", async (req, res) => {
  try {
    // Query user by provided email address
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    // If no user found, return error
    if (!dbUserData) {
      res.status(401).send();
      return;
    }

    // Check provided password against queried User
    const validPassword = await bcrypt.compare(req.body.password, dbUserData.password);

    // If password invalid, return error
    if (!validPassword) {
      res.status(401).send();
      return;
    }

    // If password valid, save session with loggedIn value and return success
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = dbUserData.id; 

      res.status(200).send();
      return;
    });
  } 
  // Catch errors if they occur
  catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Sign-Up Endpoint(s)

// Logout Endpoint(s)
router.post('/logout', async (req, res) => {
  if(req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    })
  }
  else {
    res.status(400).end();
  }
});

// Export

module.exports = router;
