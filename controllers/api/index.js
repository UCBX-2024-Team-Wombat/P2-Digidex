// Create main API router and import related routers
const router = require('express').Router();
const userRouter = require('./user-routes');
const collectionRouter = require('./collection-routes');

// Connect imported routers to main router
router.use('/user/', userRouter);
router.use('/collection',collectionRouter);

// Export main router for use by controllers/index.js
module.exports = router;