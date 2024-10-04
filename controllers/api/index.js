// Create main API router and import related routers
const router = require('express').Router();
const userRouter = require('./users-router');

// Connect imported routers to main router
router.use('/user/', userRouter);

// Export main router for use by controllers/index.js
module.exports = router;