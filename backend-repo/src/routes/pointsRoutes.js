const express = require('express');
const router = express.Router();
const { getPoints, getPointById } = require('../controllers/pointsController');

router.get('/', getPoints);
router.get('/:id', getPointById);

module.exports = router;
