const { allPoints } = require('../data/points');

// GET /api/categories - Get list of all categories
const getCategories = (_req, res) => {
  try {
    const categories = [...new Set(allPoints.map(p => p.category))];
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

module.exports = {
  getCategories
};
