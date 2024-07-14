"use client"
import { TimelineSection } from './TimelineSection';
import { education, work } from './timeline_data';
import { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function TimelinePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMouseEnterButton = () => {
    setMenuOpen(true);
  };

  const handleMouseLeaveButton = () => {
    setTimeout(() => {
      const menuElement = document.getElementById('menu');
      if (menuElement && !menuElement.matches(':hover')) {
        setMenuOpen(false);
      }
    }, 200);
  };

  const handleMouseLeaveMenu = () => {
    setTimeout(() => {
      const menuElement = document.getElementById('menu');
      if (menuElement && !menuElement.matches(':hover')) {
        setMenuOpen(false);
      }
    }, 200);
  };
  return (

    <main className="flex min-h-screen flex-col items-center justify-start p-10">
          <button 
        onMouseEnter={handleMouseEnterButton}
        onMouseLeave={handleMouseLeaveButton}
      className="fixed top-4 right-4 z-50 p-2 text-white rounded"
      
    >
      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
    </button>
    {menuOpen && (
      <div id='menu' className="fixed top-4 right-4 w-64 bg-white p-4 z-40 rounded-lg shadow-lg"
      onMouseLeave={handleMouseLeaveMenu}>
        <nav className="flex flex-col space-y-4">
        <Link href=".." className="text-black hover:underline">Home</Link>
        </nav>
      </div>
    )}
      
      <h1 className="mb-8 text-4xl font-semibold tracking-tighter">
        Timeline
      </h1>
      <TimelineSection education={education} work={work} />
    </main>
  );
}