const router = require('express').Router();
const { User } = require('../../models/index');

// Login Endpoint(s)


// Sign-Up Endpoint(s)
router.post('/', async (req, res) => {
    try {
        const userData = User.create(req.body);
        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
        })

    } catch (err) {
        res.status(400).json(err);
    }

});

// Logout Endpoint(s)


// Export

module.exports = router;