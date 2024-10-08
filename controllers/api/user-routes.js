const router = require('express').Router();
const { User } = require('../../models/index');

// Login Endpoint(s)
// POST login endpoint
router.post('/login', async (req, res) => {
    try {
      const dbUserData = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      console.log(dbUserData);
      console.log(dbUserData == false);

      if (dbUserData == false) {
        res
        .status(200).json({ 
          loginSuccessful: false,
          message: 'Incorrect email or password.' });
        return;
      }
      
      const validPassword = await dbUserData.checkPassword(req.body.password);
      
      if (!validPassword) {
        res
        .status(200)
        .json({ 
          loginSuccessful: false,
          message: 'Incorrect email or password. Please try again!' });
        return;
      }
      
      req.session.save(() => {
        req.session.loggedIn = true;
        
        res
        .status(200)
        .json({ user: dbUserData,
          loginSuccessful: true,
          message: 'You are now logged in!' });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });  


// Sign-Up Endpoint(s)


// Logout Endpoint(s)


// Export

module.exports = router;