# 3D Geospatial Visualization

A full-stack web application that visualizes geospatial data in 3D with smooth animations. Built with Next.js, Express.js, Mapbox GL JS, and deck.gl.

## Features

- **3D Column Visualization**: Points displayed as 3D columns with heights based on their values
- **Bounding Box Filtering**: API returns only points visible in the current viewport
- **Smooth Animations**: Zoom in/out with smooth flyTo animations
- **Interactive Tooltips**: Hover over columns to see point details
- **Detail Panel**: Click on columns to see full information
- **Reset Button**: Return to the default view
- **Category Legend**: Color-coded categories for easy identification
- **Responsive Design**: Works on various screen sizes

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, Mapbox GL JS, deck.gl
- **Backend**: Node.js, Express.js

## Project Structure

```
├── backend-repo/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── categoriesController.js
│   │   │   ├── healthController.js
│   │   │   └── pointsController.js
│   │   ├── data/
│   │   │   └── points.js
│   │   ├── routes/
│   │   │   ├── categoriesRoutes.js
│   │   │   ├── healthRoutes.js
│   │   │   ├── index.js
│   │   │   └── pointsRoutes.js
│   │   ├── utils/
│   │   │   └── generateData.js
│   │   └── index.js              # Express server entry point
│   └── package.json
├── frontend-repo/
│   ├── src/
│   │   ├── app/
│   │   │   ├── globals.css       # Global styles
│   │   │   ├── layout.tsx        # App layout
│   │   │   └── page.tsx          # Main page
│   │   ├── components/
│   │   │   └── Map3D/
│   │   │       ├── CategoryLegend.tsx
│   │   │       ├── index.tsx     # Main 3D Map component
│   │   │       ├── MapStatusOverlay.tsx
│   │   │       ├── MapTooltip.tsx
│   │   │       └── PointDetailPanel.tsx
│   │   ├── global/
│   │   │   └── constants.ts
│   │   ├── hooks/
│   │   │   ├── useDeckLayers.ts
│   │   │   ├── useMapbox.ts
│   │   │   └── usePoints.ts
│   │   ├── lib/
│   │   │   └── api.ts            # API client functions
│   │   ├── types/
│   │   │   └── index.ts          # TypeScript types
│   │   └── utils/
│   │       └── utils.ts
│   ├── .env.example              # Environment variables template
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Mapbox account and access token (free tier available)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd 3d-geospatial-visualization
```

### 2. Set Up the Backend

```bash
cd backend
npm install
npm start
```

The backend server will start on http://localhost:3001

### 3. Set Up the Frontend

```bash
cd frontend
npm install
```

Create a `.env.local` file with your Mapbox token:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Mapbox token:

```
NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
```

NOTE: Mapbox token is already in .env.example file

Start the frontend:

```bash
npm run dev
```

The frontend will start on http://localhost:3000

## API Endpoints

### GET /api/points

Returns geospatial points, optionally filtered by bounding box.

**Query Parameters:**
- `bbox` (optional): Bounding box in format `minLon,minLat,maxLon,maxLat`

**Example:**
```
GET /api/points?bbox=-75,40,-73,41
```

**Response:**
```json
{
  "success": true,
  "count": 150,
  "bbox": {
    "minLon": -75,
    "minLat": 40,
    "maxLon": -73,
    "maxLat": 41
  },
  "data": [
    {
      "id": 1,
      "name": "Golden Kitchen 1",
      "lat": 40.712345,
      "lon": -74.005678,
      "category": "restaurant",
      "value": 500
    }
  ]
}
```

### GET /api/points/:id

Returns a single point by ID.

### GET /api/categories

Returns list of all available categories.

### GET /api/health

Health check endpoint.

## Data

The backend generates 1,500 dummy geospatial points clustered around major world cities:
- New York, London, Tokyo, Paris, Sydney
- Mexico City, Moscow, Hong Kong, Sao Paulo
- New Delhi, Singapore, San Francisco, Los Angeles
- Chicago, Berlin

Each point has:
- `id`: Unique identifier
- `name`: Generated name based on category
- `lat`: Latitude
- `lon`: Longitude
- `category`: One of 8 categories (restaurant, hotel, hospital, school, office, park, store, museum)
- `value`: Random value (100-1100) used for column height

## Interactions

- **Pan**: Click and drag the map
- **Zoom**: Scroll or use +/- buttons
- **Rotate**: Right-click and drag
- **Tilt**: Ctrl + drag (or Cmd + drag on Mac)
- **Hover**: Move mouse over columns to see tooltips
- **Click**: Click on columns to see detailed information
- **Reset**: Click "Reset View" button to return to default view
- **Zoom to Location**: Click "Zoom to Location" in the detail panel

## Category Colors

| Category   | Color        |
|------------|--------------|
| Restaurant | Tomato       |
| Hotel      | Steel Blue   |
| Hospital   | Crimson      |
| School     | Gold         |
| Office     | Gray         |
| Park       | Forest Green |
| Store      | Dark Orange  |
| Museum     | Dark Violet  |

## Development

### Backend Development

```bash
cd backend
npm run dev  # Uses nodemon for auto-reload
```

### Frontend Development

```bash
cd frontend
npm run dev
```

## Environment Variables

### Frontend

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Mapbox access token | Required |
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:3001` |

## Getting a Mapbox Token

1. Go to [mapbox.com](https://account.mapbox.com/)
2. Create a free account
3. Navigate to [Access tokens](https://account.mapbox.com/access-tokens/)
4. Copy your default public token or create a new one

## License

MIT
