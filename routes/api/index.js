const router = require('express').Router();
const userRoutes = require('./user-routes');

// add prefix of `/pizzas` to routes created in `user-routes.js`
router.use('/users', userRoutes);

module.exports = router;