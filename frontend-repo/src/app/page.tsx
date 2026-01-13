'use client';

import dynamic from 'next/dynamic';

// Dynamically import Map3D to avoid SSR issues with mapbox-gl
const Map3D = dynamic(() => import('@/components/Map3D'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center bg-gray-900">
      <div className="text-white text-xl">Loading map...</div>
    </div>
  ),
});

const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'YOUR_MAPBOX_TOKEN_HERE';

export default function Home() {
  if (!MAPBOX_TOKEN || MAPBOX_TOKEN === 'YOUR_MAPBOX_TOKEN_HERE') {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-8">
        <h1 className="text-3xl font-bold mb-4">Mapbox Token Required</h1>
        <p className="text-gray-400 text-center max-w-md mb-4">
          To use this 3D geospatial visualization, you need to provide a Mapbox access token.
        </p>
        <ol className="text-gray-300 text-sm space-y-2 list-decimal list-inside">
          <li>Create a free account at <a href="https://account.mapbox.com/" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">mapbox.com</a></li>
          <li>Get your public token from the <a href="https://account.mapbox.com/access-tokens/" className="text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">Access tokens page</a></li>
          <li>Create a <code className="bg-gray-800 px-2 py-1 rounded">.env.local</code> file in the frontend folder</li>
          <li>Add: <code className="bg-gray-800 px-2 py-1 rounded">NEXT_PUBLIC_MAPBOX_TOKEN=your_token_here</code></li>
          <li>Restart the development server</li>
        </ol>
      </div>
    );
  }

  return (
    <main className="relative w-full h-screen">
      <Map3D mapboxToken={MAPBOX_TOKEN} />
    </main>
  );
}
