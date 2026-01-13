"use client";

import { GeoPoint } from "@/types";
import { formatNumber, formatCoordinate, getCategoryInfo, getRgbString } from "../../utils/utils";

interface MapTooltipProps {
  point: GeoPoint;
  position: { x: number; y: number };
}

export default function MapTooltip({ point, position }: MapTooltipProps) {
  const catInfo = getCategoryInfo(point.category);

  return (
    <div
      className="absolute pointer-events-none bg-white text-gray-800 rounded-xl shadow-xl z-50 min-w-[220px] overflow-hidden"
      style={{
        left: Math.min(position.x + 10, window.innerWidth - 240),
        top: Math.min(
          Math.max(position.y - 40, 10),
          window.innerHeight - 160
        ),
      }}
    >
      {/* Category header bar */}
      <div
        className="px-3 py-2 text-white text-xs font-medium flex items-center gap-2"
        style={{ backgroundColor: getRgbString(catInfo.color) }}
      >
        <span className="text-base">{catInfo.icon}</span>
        <span>{catInfo.label}</span>
      </div>

      {/* Content */}
      <div className="px-3 py-3">
        <h4 className="font-bold text-sm text-gray-900">{point.name}</h4>

        {/* Value indicator */}
        <div className="mt-2">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Activity Score</span>
            <span className="font-semibold text-gray-700">{formatNumber(point.value)}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1.5">
            <div
              className="h-1.5 rounded-full transition-all"
              style={{
                width: `${Math.min((point.value / 100) * 100, 100)}%`,
                backgroundColor: getRgbString(catInfo.color),
              }}
            />
          </div>
        </div>

        {/* Location */}
        <div className="mt-2 text-xs text-gray-500 flex items-center gap-1">
          <span>📍</span>
          <span>{formatCoordinate(point.lat, "lat")}, {formatCoordinate(point.lon, "lon")}</span>
        </div>
      </div>
    </div>
  );
}
