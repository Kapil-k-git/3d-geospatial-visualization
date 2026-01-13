"use client";

import { GeoPoint } from "@/types";
import { formatNumber, formatCoordinate, getCategoryInfo, getRgbString } from "../../utils/utils";

interface PointDetailPanelProps {
  point: GeoPoint;
  onClose: () => void;
  onZoomTo: (point: GeoPoint) => void;
}

export default function PointDetailPanel({ point, onClose, onZoomTo }: PointDetailPanelProps) {
  const catInfo = getCategoryInfo(point.category);
  const coordString = `${point.lat.toFixed(6)}, ${point.lon.toFixed(6)}`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="absolute bottom-4 left-4 bg-white text-gray-800 rounded-xl shadow-xl max-w-md w-full z-50 overflow-hidden">
      {/* Category header */}
      <div
        className="px-4 py-3 text-white flex items-center justify-between"
        style={{ backgroundColor: getRgbString(catInfo.color) }}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">{catInfo.icon}</span>
          <span className="font-medium">{catInfo.label}</span>
        </div>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white text-xl font-bold leading-none"
        >
          &times;
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-900">{point.name}</h3>
        <p className="text-xs text-gray-400 mt-0.5">ID: {point.id}</p>

        {/* Value with visual indicator */}
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Activity Score</span>
            <span className="text-lg font-bold text-gray-900">{formatNumber(point.value)}</span>
          </div>
        </div>

        {/* Coordinates with copy button */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-gray-600">Location</span>
            <button
              onClick={() => copyToClipboard(coordString)}
              className="text-xs text-blue-500 hover:text-blue-700 flex items-center gap-1"
            >
              📋 Copy
            </button>
          </div>
          <div className="text-sm space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-500">Latitude</span>
              <span className="font-mono">{formatCoordinate(point.lat, "lat")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Longitude</span>
              <span className="font-mono">{formatCoordinate(point.lon, "lon")}</span>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => onZoomTo(point)}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors text-sm font-medium"
          >
            Zoom In
          </button>
          <a
            href={`https://www.google.com/maps?q=${point.lat},${point.lon}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors text-sm font-medium text-center"
          >
            Google Maps
          </a>
        </div>
      </div>
    </div>
  );
}
