const { generatePoints } = require('../utils/generateData');

// Generate points once at startup
const allPoints = generatePoints(1500);
console.log(`Generated ${allPoints.length} geospatial points`);

module.exports = { allPoints };
