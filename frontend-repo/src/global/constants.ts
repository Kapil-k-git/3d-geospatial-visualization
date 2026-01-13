export const CATEGORY_INFO: Record<string, { color: [number, number, number]; icon: string; label: string }> = {
  restaurant: { color: [255, 99, 71], icon: "🍽️", label: "Restaurant" },
  hotel: { color: [70, 130, 180], icon: "🏨", label: "Hotel" },
  hospital: { color: [220, 20, 60], icon: "🏥", label: "Hospital" },
  school: { color: [255, 215, 0], icon: "🎓", label: "School" },
  office: { color: [128, 128, 128], icon: "🏢", label: "Office" },
  park: { color: [34, 139, 34], icon: "🌳", label: "Park" },
  store: { color: [255, 140, 0], icon: "🛒", label: "Store" },
  museum: { color: [148, 0, 211], icon: "🏛️", label: "Museum" },
};

export const CATEGORY_COLORS: Record<string, [number, number, number]> = Object.fromEntries(
  Object.entries(CATEGORY_INFO).map(([key, val]) => [key, val.color])
) as Record<string, [number, number, number]>;

export const INITIAL_VIEW = {
  longitude: 78.9629,
  latitude: 20.5937,
  zoom: 4.5,
  pitch: 45,
  bearing: 0,
};
