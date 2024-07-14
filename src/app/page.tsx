"use client"
import Link from 'next/link';
import Image from "next/image";
import { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';



export default function Home() {
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
    <main>
      <div className="w-full min-h-screen flex flex-col bg-cover bg-center" style={{ 
        backgroundImage: "url('/painting3.png')",
        }}>
      <div className="flex flex-col items-center justify-start p-10">
      <button 
        className="fixed top-4 right-4 z-50 p-2 text-white rounded"
        onMouseEnter={handleMouseEnterButton}
        onMouseLeave={handleMouseLeaveButton}
      >
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>
      {menuOpen && (
        <div id="menu" className="fixed top-4 right-4 w-64 bg-white p-4 z-40 rounded-lg shadow-lg"
        onMouseLeave={handleMouseLeaveMenu}>
          <nav className="flex flex-col space-y-4">
          <Link href="./timeline" className="text-black hover:underline">History</Link>
          </nav>
          
        </div>
      )}
      <h1 className="mb-8 text-4xl md:text-3xl sm:text-2xl font-semibold tracking-tighter text-center">
        Maxwell Malamut
      </h1>
      <div className="max-w-5xl">
      <div className="w-full max-w-5xl mb-8 flex flex-col items-center lg:flex-row lg:justify-center lg:space-x-20 border-2 border-gray-300 rounded-lg p-4">
        <a href="https://www.linkedin.com/in/maxwellmalamut" className="text-white-500 hover:underline mb-4 lg:mb-0 lg:mr-4">LinkedIn</a>
        <a href="https://github.com/maxmal1" className="text-white-500 hover:underline mb-4 lg:mb-0 lg:mr-4">GitHub</a>
        <a href="mailto:maxmal@bu.edu" className="text-white-500 hover:underline">maxmal@bu.edu</a>
      </div>
      </div>
      </div>

      <div className="flex flex-col items-center justify-start">
      <div className="max-w-3xl bg-white rounded-lg p-8 mt-2">
        <div className="flex flex-col md:flex-row items-start justify-between">
          <div className="md:w-3/5 md:pr-12">
            <p className="text-lg text-gray-800">
              Hi, I'm Max. I'm currently working as a deep learning engineer. My focus is in LLM's, NLP, and Computer Vision.
            </p>
          </div>
          <div className="md:w-2/5 mt-4 md:mt-0 flex justify-end">
            <Image
              src="/headshot.png"
              alt="Headshot of Maxwell Malamut"
              width={200}
              height={200}
              className="rounded-md"
            />
        </div>
      </div>
      </div>
      </div>
      </div>
    </main>
  );
}

