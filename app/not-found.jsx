'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    console.warn('404: Page not found');
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800 px-4 text-center">
      <h1 className="text-6xl font-extrabold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Oops! This page doesn’t exist.</h2>
      <p className="mb-6 text-gray-600">Maybe you mistyped the URL or followed a broken link.</p>

      <Link href="/" className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition">
        ← Go back home
      </Link>

      <div className="mt-10 text-sm text-gray-400">
        Lost in the void? Don’t worry — we’ve got snacks.
      </div>
    </div>
  );
}
