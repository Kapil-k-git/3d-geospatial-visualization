// Generate 1,500 dummy geospatial points

// All the constants are currently used in this file only later we can move these in the Constant file
const CATEGORIES = [
  "restaurant",
  "hotel",
  "hospital",
  "school",
  "office",
  "park",
  "store",
  "museum",
];

const INDIA_BOUNDS = {
  minLat: 6.5,
  maxLat: 37.5,
  minLon: 68.0,
  maxLon: 97.5,
};

// India center (Nagpur-ish)
const INDIA_CENTER = {
  lat: 20.5937,
  lon: 78.9629,
};

// Smaller spread so we don’t hit oceans
const INDIA_SPREAD = {
  lat: 17,
  lon: 15,
};

const PREFIXES = {
  restaurant: ["Golden", "Silver", "Royal", "Ocean", "Mountain", "City"],
  hotel: ["Grand", "Luxury", "Comfort", "Paradise", "Sunset", "Harbor"],
  hospital: ["Central", "Regional", "Community", "Metro", "Unity", "Care"],
  school: [
    "Lincoln",
    "Washington",
    "Jefferson",
    "Franklin",
    "Edison",
    "Newton",
  ],
  office: ["Tech", "Global", "Prime", "Elite", "Summit", "Apex"],
  park: ["Green", "Riverside", "Sunset", "Heritage", "Liberty", "Unity"],
  store: ["Super", "Mega", "Express", "Value", "Premium", "Best"],
  museum: ["National", "Modern", "Historic", "Art", "Science", "Natural"],
};

const SUFFIXES = {
  restaurant: ["Kitchen", "Bistro", "Grill", "Cafe", "Diner", "Restaurant"],
  hotel: ["Hotel", "Inn", "Suites", "Resort", "Lodge", "Plaza"],
  hospital: ["Hospital", "Medical Center", "Clinic", "Health Center"],
  school: ["Academy", "School", "Institute", "College", "Learning Center"],
  office: ["Tower", "Center", "Plaza", "Building", "Complex", "Hub"],
  park: ["Park", "Gardens", "Reserve", "Commons", "Square", "Grove"],
  store: ["Mart", "Market", "Shop", "Outlet", "Store", "Center"],
  museum: ["Museum", "Gallery", "Center", "Exhibition", "Collection"],
};

function generateRandomName(category, index) {
  const prefix =
    PREFIXES[category][Math.floor(Math.random() * PREFIXES[category].length)];
  const suffix =
    SUFFIXES[category][Math.floor(Math.random() * SUFFIXES[category].length)];

  return `${prefix} ${suffix} ${index}`;
}

function generatePoints(count = 1500) {
  const points = [];

  for (let i = 0; i < count; i++) {
    let lat, lon;

    // Retry until valid India land-like bounds
    do {
      lat = INDIA_CENTER.lat + (Math.random() - 0.5) * INDIA_SPREAD.lat * 2;
      lon = INDIA_CENTER.lon + (Math.random() - 0.5) * INDIA_SPREAD.lon * 2;
    } while (
      lat < INDIA_BOUNDS.minLat ||
      lat > INDIA_BOUNDS.maxLat ||
      lon < INDIA_BOUNDS.minLon ||
      lon > INDIA_BOUNDS.maxLon
    );

    const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];

    points.push({
      id: i + 1,
      name: generateRandomName(category, i + 1),
      lat: Number(lat.toFixed(6)),
      lon: Number(lon.toFixed(6)),
      category,
      value: Math.floor(Math.random() * 1000) + 100,
    });
  }

  return points;
}

module.exports = { generatePoints };
