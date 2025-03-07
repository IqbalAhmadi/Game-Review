const router = require('express').Router();

const userRoutes = require("./userRoutes")
const gameRoutes = require("./gameRoutes")
const reviewRoutes = require("./reviewRoutes")

router.use('/users', userRoutes);
// router.use('/reviews', reviewRoutes);
router.use('/games', gameRoutes);

module.exports = router;
