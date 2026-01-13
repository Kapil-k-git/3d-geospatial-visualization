"use client";

import { CATEGORY_INFO } from "@/global/constants";
import { getRgbString } from "../../utils/utils";

export default function CategoryLegend() {
  return (
    <div className="absolute bottom-4 right-4 bg-white/95 text-gray-800 p-4 rounded-xl shadow-lg z-10 backdrop-blur-sm">
      <h4 className="font-bold text-sm mb-3 text-gray-700">Categories</h4>
      <div className="space-y-2">
        {Object.entries(CATEGORY_INFO).map(([category, info]) => (
          <div key={category} className="flex items-center gap-2 text-xs">
            <span className="text-sm">{info.icon}</span>
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: getRgbString(info.color) }}
            />
            <span className="text-gray-600">{info.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
