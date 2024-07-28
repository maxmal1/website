"use client"
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <nav className="w-full flex items-center bg-white shadow-md p-4 fixed top-0 left-0 z-10">
        <div className="ml-auto flex space-x-4">
        <Link href="./" className="text-black hover:underline">Home</Link>
        <Link href="./about" className="text-black hover:underline">About Me</Link>
        </div>
      </nav>
      <div className="mt-20 w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 text-center">
        <h1 className="text-3xl font-bold text-gray-800">Coming Soon</h1>
      </div>
    </main>
  );
}
