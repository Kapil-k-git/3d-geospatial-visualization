"use client";

import { useState, useCallback, useRef } from "react";
import mapboxgl from "mapbox-gl";
import { GeoPoint } from "@/types";
import { fetchPoints } from "@/lib/api";

interface UsePointsReturn {
  points: GeoPoint[];
  initialLoading: boolean;
  error: string | null;
  fetchVisiblePoints: (map: mapboxgl.Map, isInitial?: boolean) => Promise<void>;
  debouncedFetch: (map: mapboxgl.Map) => void;
}

export function usePoints(): UsePointsReturn {
  const [points, setPoints] = useState<GeoPoint[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const fetchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const fetchVisiblePoints = useCallback(async (map: mapboxgl.Map, isInitial = false) => {
    try {
      if (isInitial) {
        setInitialLoading(true);
      }
      setError(null);
      const bounds = map.getBounds();
      if (!bounds) return;

      const bbox: [number, number, number, number] = [
        bounds.getWest(),
        bounds.getSouth(),
        bounds.getEast(),
        bounds.getNorth(),
      ];

      const response = await fetchPoints(bbox);
      if (response.success) {
        setPoints(response.data);
      } else {
        setError("Failed to load points");
      }
    } catch (err) {
      console.error("Error fetching points:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch points");
    } finally {
      if (isInitial) {
        setInitialLoading(false);
      }
    }
  }, []);

  const debouncedFetch = useCallback((map: mapboxgl.Map) => {
    if (fetchTimeoutRef.current) {
      clearTimeout(fetchTimeoutRef.current);
    }
    fetchTimeoutRef.current = setTimeout(() => {
      fetchVisiblePoints(map);
    }, 300);
  }, [fetchVisiblePoints]);

  return {
    points,
    initialLoading,
    error,
    fetchVisiblePoints,
    debouncedFetch,
  };
}
