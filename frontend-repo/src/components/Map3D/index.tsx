"use client";

import { useState, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { MapboxOverlay } from "@deck.gl/mapbox";
import { GeoPoint } from "@/types";

import MapTooltip from "./MapTooltip";
import PointDetailPanel from "./PointDetailPanel";
import CategoryLegend from "./CategoryLegend";
import MapStatusOverlay from "./MapStatusOverlay";
import { useMapbox } from "@/hooks/useMapbox";
import { usePoints } from "@/hooks/usePoints";
import { useDeckLayers } from "@/hooks/useDeckLayers";

interface Map3DProps {
  mapboxToken: string;
}

export default function Map3D({ mapboxToken }: Map3DProps) {
  const [hoveredPoint, setHoveredPoint] = useState<GeoPoint | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<GeoPoint | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{ x: number; y: number } | null>(null);
  const [deckOverlay, setDeckOverlay] = useState<MapboxOverlay | null>(null);

  const { points, initialLoading, error, fetchVisiblePoints, debouncedFetch } = usePoints();

  const handleMapLoad = useCallback((map: mapboxgl.Map, overlay: MapboxOverlay) => {
    setDeckOverlay(overlay);
    fetchVisiblePoints(map, true);
  }, [fetchVisiblePoints]);

  const handleMapMove = useCallback((map: mapboxgl.Map) => {
    debouncedFetch(map);
  }, [debouncedFetch]);

  const { mapContainerRef, resetView, flyToPoint } = useMapbox({
    mapboxToken,
    onMapLoad: handleMapLoad,
    onMapMove: handleMapMove,
  });

  const handleHover = useCallback((point: GeoPoint | null, position: { x: number; y: number } | null) => {
    setHoveredPoint(point);
    setTooltipPosition(position);
  }, []);

  const handleClick = useCallback((point: GeoPoint) => {
    setSelectedPoint(point);
  }, []);

  const handleZoomToPoint = useCallback((point: GeoPoint) => {
    flyToPoint(point.lon, point.lat);
  }, [flyToPoint]);

  const handleReset = useCallback(() => {
    resetView();
    setSelectedPoint(null);
  }, [resetView]);

  const handleCloseDetail = useCallback(() => {
    setSelectedPoint(null);
  }, []);

  useDeckLayers({
    deckOverlay,
    points,
    selectedId: selectedPoint?.id ?? null,
    onHover: handleHover,
    onClick: handleClick,
  });

  return (
    <div className="relative w-full h-full">
      {/* Map container */}
      <div
        ref={mapContainerRef}
        className="absolute inset-0"
        style={{ width: "100%", height: "100vh" }}
      />

      {/* Status overlay (loading/error/points count) */}
      <MapStatusOverlay
        isLoading={initialLoading}
        error={error}
        pointsCount={points.length}
      />

      {/* Reset button */}
      <button
        onClick={handleReset}
        className="absolute top-4 right-16 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-lg shadow-md transition-colors z-10"
      >
        Reset View
      </button>

      {/* Hover tooltip */}
      {hoveredPoint && tooltipPosition && (
        <MapTooltip point={hoveredPoint} position={tooltipPosition} />
      )}

      {/* Selected point detail panel */}
      {selectedPoint && (
        <PointDetailPanel
          point={selectedPoint}
          onClose={handleCloseDetail}
          onZoomTo={handleZoomToPoint}
        />
      )}

      {/* Category legend */}
      <CategoryLegend />
    </div>
  );
}
