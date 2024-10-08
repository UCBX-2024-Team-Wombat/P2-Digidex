// Import routes
const router = require('express').Router();
const homeRoutes = require('./home-routes');
const apiRoutes = require('./api/index');

// Connect imported routers to main router
router.use('/api', apiRoutes);
router.use('/', homeRoutes);

// Export main router for server.js use
module.exports = router;