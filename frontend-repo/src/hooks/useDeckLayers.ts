"use client";

import { useEffect, useRef } from "react";
import { MapboxOverlay } from "@deck.gl/mapbox";
import { GridCellLayer } from "@deck.gl/layers";
import type { PickingInfo } from "@deck.gl/core";
import { GeoPoint } from "@/types";
import { CATEGORY_COLORS } from "@/global/constants";

interface UseDeckLayersOptions {
  deckOverlay: MapboxOverlay | null;
  points: GeoPoint[];
  selectedId: string | number | null ;
  onHover: (point: GeoPoint | null, position: { x: number; y: number } | null) => void;
  onClick: (point: GeoPoint) => void;
}

export function useDeckLayers({
  deckOverlay,
  points,
  selectedId,
  onHover,
  onClick,
}: UseDeckLayersOptions): void {
  const onHoverRef = useRef(onHover);
  const onClickRef = useRef(onClick);

  // Keep refs updated in an effect, not during render
  useEffect(() => {
    onHoverRef.current = onHover;
    onClickRef.current = onClick;
  }, [onHover, onClick]);

  useEffect(() => {
    if (!deckOverlay) return;

    const columnLayer = new GridCellLayer({
      id: "column-layer",
      data: points,
      diskResolution: 12,
      radius: 200,
      extruded: true,
      pickable: true,
      elevationScale: 50,
      getPosition: (d: GeoPoint) => [d.lon, d.lat],
      getFillColor: (d: GeoPoint) => {
        const baseColor = CATEGORY_COLORS[d.category] || [128, 128, 128];
        const isSelected = selectedId === d.id;
        if (isSelected) return [255, 255, 255];
        return baseColor;
      },
      getElevation: (d: GeoPoint) => d.value,
      autoHighlight: true,
      highlightColor: [255, 255, 200, 180],
      updateTriggers: {
        getFillColor: [selectedId],
      },
      transitions: {
        getElevation: 300,
        getFillColor: 200,
      },
      onHover: (info: PickingInfo<GeoPoint>) => {
        if (info.object) {
          onHoverRef.current(info.object, { x: info.x, y: info.y });
        } else {
          onHoverRef.current(null, null);
        }
      },
      onClick: (info: PickingInfo<GeoPoint>) => {
        if (info.object) {
          onClickRef.current(info.object);
        }
      },
    });

    deckOverlay.setProps({
      layers: [columnLayer],
    });
  }, [deckOverlay, points, selectedId]);
}
