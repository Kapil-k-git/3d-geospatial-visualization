const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for frontend
app.use(cors());
app.use(express.json());

// Mount routes
app.use('/api', routes);

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log(`API endpoints:`);
  console.log(`  GET /api/points?bbox=minLon,minLat,maxLon,maxLat`);
  console.log(`  GET /api/points/:id`);
  console.log(`  GET /api/categories`);
  console.log(`  GET /api/health`);
});
