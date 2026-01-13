const { allPoints } = require('../data/points');

// GET /api/health - Health check endpoint
const getHealth = (req, res) => {
  try {
    res.json({ status: 'ok', pointsCount: allPoints.length });
  } catch (error) {
    console.error('Error in health check:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

module.exports = {
  getHealth
};
