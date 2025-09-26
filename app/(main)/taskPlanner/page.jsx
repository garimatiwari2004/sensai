"use client";

import TaskPlanner from "./_components/TaskPlanner";


export default function Page() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-start py-12 px-4">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
        Enhance Your Productivity by Planning Your Day in Advance
      </h1>

      <div className="w-full max-w-4xl mt-10 bg-gray-800 rounded-3xl shadow-xl p-8 md:p-12">
        <TaskPlanner />
      </div>
    </main>
  );
}

