"use client";

import RoadmapGenerator from "./_components/RoadmapGenerator";



export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-black flex justify-center items-start p-6">
      <div className="w-full max-w-6xl">
        <RoadmapGenerator />
      </div>
    </div>
  );
}