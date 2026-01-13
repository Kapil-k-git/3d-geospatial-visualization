const { allPoints } = require("../data/points");

// Helper function to check if a point is within a bounding box
function isPointInBBox(point, minLon, minLat, maxLon, maxLat) {
  return (
    point.lon >= minLon &&
    point.lon <= maxLon &&
    point.lat >= minLat &&
    point.lat <= maxLat
  );
}

// GET /api/points - Return points, optionally filtered by bounding box
const getPoints = (req, res) => {
  try {
    const { query: { bbox } = {} } = req;

    // If no bbox provided, return all points
    if (!bbox) {
      return res.json({
        success: true,
        count: allPoints.length,
        data: allPoints,
      });
    }

    // Parse bbox parameter
    const bboxParts = bbox.split(",").map(Number);

    if (bboxParts.length !== 4 || bboxParts.some(isNaN)) {
      return res.status(400).json({
        success: false,
        error: "Invalid bbox format. Expected: minLon,minLat,maxLon,maxLat",
      });
    }

    const [minLon, minLat, maxLon, maxLat] = bboxParts;

    // Validate bbox values
    if (minLon > maxLon || minLat > maxLat) {
      return res.status(400).json({
        success: false,
        error: "Invalid bbox: min values must be less than max values",
      });
    }

    // Filter points by bounding box
    const filteredPoints = allPoints.filter((point) =>
      isPointInBBox(point, minLon, minLat, maxLon, maxLat)
    );

    res.json({
      success: true,
      count: filteredPoints.length,
      bbox: { minLon, minLat, maxLon, maxLat },
      data: filteredPoints,
    });
  } catch (error) {
    console.error("Error fetching points:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

// GET /api/points/:id - Get a single point by ID
const getPointById = (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const point = allPoints.find((p) => p.id === id);

    if (!point) {
      return res.status(404).json({
        success: false,
        error: "Point not found",
      });
    }

    res.json({
      success: true,
      data: point,
    });
  } catch (error) {
    console.error("Error fetching point by ID:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

module.exports = {
  getPoints,
  getPointById,
};
