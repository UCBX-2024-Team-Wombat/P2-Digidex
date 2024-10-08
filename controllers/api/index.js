// Create main API router and import related routers
const router = require('express').Router();
const userRouter = require('./user-routes');
const uploadRouter = require('./upload-routes');

// Connect imported routers to main router
router.use('/user', userRouter);
router.use('/upload', uploadRouter);

// Export main router for use by controllers/index.js
module.exports = router;