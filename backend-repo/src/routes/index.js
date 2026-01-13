const express = require('express');
const router = express.Router();

const pointsRoutes = require('./pointsRoutes');
const categoriesRoutes = require('./categoriesRoutes');
const healthRoutes = require('./healthRoutes');

router.use('/points', pointsRoutes);
router.use('/categories', categoriesRoutes);
router.use('/health', healthRoutes);

module.exports = router;
