"use client";

interface MapStatusOverlayProps {
  isLoading: boolean;
  error: string | null;
  pointsCount: number;
}

export default function MapStatusOverlay({ isLoading, error, pointsCount }: MapStatusOverlayProps) {
  if (isLoading) {
    return (
      <div className="absolute top-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg z-10">
        Loading points...
      </div>
    );
  }

  if (error) {
    return (
      <div className="absolute top-4 left-4 bg-red-600/90 text-white px-4 py-2 rounded-lg z-10">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="absolute top-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg z-10">
      {pointsCount} points visible
    </div>
  );
}
