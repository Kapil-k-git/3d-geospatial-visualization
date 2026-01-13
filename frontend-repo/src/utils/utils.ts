import { CATEGORY_INFO } from "@/global/constants";

export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

export const formatCoordinate = (coord: number, type: "lat" | "lon"): string => {
  const direction = type === "lat"
    ? (coord >= 0 ? "N" : "S")
    : (coord >= 0 ? "E" : "W");
  return `${Math.abs(coord).toFixed(4)}° ${direction}`;
};

export const getCategoryInfo = (category: string) => {
  return CATEGORY_INFO[category] || { color: [128, 128, 128], icon: "📍", label: category };
};

export const getRgbString = (color: [number, number, number]): string => {
  return `rgb(${color.join(",")})`;
};
