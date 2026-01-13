"use client";

import { useEffect, useRef, useCallback } from "react";
import mapboxgl from "mapbox-gl";
import { MapboxOverlay } from "@deck.gl/mapbox";
import { INITIAL_VIEW } from "@/global/constants";

interface UseMapboxOptions {
  mapboxToken: string;
  onMapLoad: (map: mapboxgl.Map, overlay: MapboxOverlay) => void;
  onMapMove: (map: mapboxgl.Map) => void;
}

interface UseMapboxReturn {
  mapContainerRef: React.RefObject<HTMLDivElement | null>;
  mapRef: React.RefObject<mapboxgl.Map | null>;
  deckOverlayRef: React.RefObject<MapboxOverlay | null>;
  resetView: () => void;
  flyToPoint: (lon: number, lat: number) => void;
}

export function useMapbox({ mapboxToken, onMapLoad, onMapMove }: UseMapboxOptions): UseMapboxReturn {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const deckOverlayRef = useRef<MapboxOverlay | null>(null);
  const onMapMoveRef = useRef(onMapMove);

  // Keep the callback ref updated
  useEffect(() => {
    onMapMoveRef.current = onMapMove;
  }, [onMapMove]);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    mapboxgl.accessToken = mapboxToken;

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [INITIAL_VIEW.longitude, INITIAL_VIEW.latitude],
      zoom: INITIAL_VIEW.zoom,
      pitch: INITIAL_VIEW.pitch,
      bearing: INITIAL_VIEW.bearing,
      antialias: true,
    });

    map.addControl(new mapboxgl.NavigationControl(), "top-right");

    const deckOverlay = new MapboxOverlay({
      interleaved: true,
      layers: [],
    });

    const handleMoveEnd = () => {
      onMapMoveRef.current(map);
    };

    map.on("load", () => {
      mapRef.current = map;
      map.addControl(deckOverlay);
      deckOverlayRef.current = deckOverlay;
      onMapLoad(map, deckOverlay);
    });

    map.on("moveend", handleMoveEnd);

    map.on("error", (e) => {
      console.error("Mapbox error:", e.error);
    });

    return () => {
      map.off("moveend", handleMoveEnd);
      if (deckOverlayRef.current) {
        map.removeControl(deckOverlayRef.current);
      }
      map.remove();
      mapRef.current = null;
      deckOverlayRef.current = null;
    };
  }, [mapboxToken, onMapLoad]);

  const resetView = useCallback(() => {
    if (!mapRef.current) return;

    mapRef.current.flyTo({
      center: [INITIAL_VIEW.longitude, INITIAL_VIEW.latitude],
      zoom: INITIAL_VIEW.zoom,
      pitch: INITIAL_VIEW.pitch,
      bearing: INITIAL_VIEW.bearing,
      duration: 2000,
      essential: true,
    });
  }, []);

  const flyToPoint = useCallback((lon: number, lat: number) => {
    if (!mapRef.current) return;

    const currentBearing = mapRef.current.getBearing();
    const targetBearing = currentBearing + (Math.random() * 30 - 15);

    mapRef.current.flyTo({
      center: [lon, lat],
      zoom: 14,
      pitch: 60,
      bearing: targetBearing,
      duration: 1500,
      essential: true,
    });
  }, []);

  return {
    mapContainerRef,
    mapRef,
    deckOverlayRef,
    resetView,
    flyToPoint,
  };
}
