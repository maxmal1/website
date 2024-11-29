"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';
// import NeuralNoiseBackground from './NeuralNoise'
import BlobBackground from "./BlobBackground";

export default function Home() {

  const [headerOpacity, setHeaderOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = 200; // Adjust based on when you want the header to fully fade out
      const opacity = Math.max(1 - scrollPosition / maxScroll, 0);
      setHeaderOpacity(opacity);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
     {/* <NeuralNoiseBackground opacity={headerOpacity}/> */}
     <BlobBackground />
      <nav className="w-full flex items-center p-4 fixed top-0 left-0 z-10">
        <div className="ml-auto flex space-x-4">
        <Link href="./" className="text-[#EAEAEA] hover:underline">Home</Link>
        <Link href="./about_me" className="text-[#EAEAEA] hover:underline">About Me</Link>
        <Link href="./projects" className="text-[#EAEAEA] hover:underline">Projects</Link>
        <Link href="./cv" className="text-[#EAEAEA] hover:underline">CV</Link>
        </div>
      </nav>

      <header className="relative w-full h-screen bg-cover bg-center flex items-center justify-center">
        <div className="fixed text-center text-[#EAEAEA]">
          <h1 className="text-5xl font-bold mb-6">Maxwell Malamut</h1>
          <div className="flex justify-center space-x-6">
            <a href="https://www.linkedin.com/in/maxwellmalamut" className="text-[#EAEAEA] hover:text-gray-300">
              <FaLinkedin className="text-4xl" />
            </a>
            <a href="https://github.com/maxmal1" className="text-[#EAEAEA] hover:text-gray-300">
              <FaGithub className="text-4xl" />
            </a>
            <a href="mailto:mimmalamut@gmail.com" className="text-[#EAEAEA] hover:text-gray-300">
              <FaEnvelope className="text-4xl" />
            </a>
          </div>
        </div>
      </header>
      {/* <main className="py-12"  style={{ background: 'linear-gradient(to bottom, rgb(5,14,20), rgb(0, 0, 0))' }}>
      <div className="container mx-auto px-4">
          <div className="grid gap-4 md:grid-cols-4 md:grid-rows-2 items-center">

            <div className="bg-white rounded-lg shadow-lg p-4 md:col-start-2 md:row-start-1 max-w-md">
              <p className="text-gray-700 text-lg">
                Hi, I'm Max. I'm currently working as a deep learning engineer. My focus is in LLMs, NLP, and Computer Vision.
              </p>
            </div>
            

            <div className="bg-white rounded-lg shadow-lg p-6 flex justify-center md:col-start-3 md:row-start-2">
              <Image
                src="/headshot.png"
                alt="Headshot of Maxwell Malamut"
                width={250}
                height={250}
                className="rounded-md"
              />
            </div>
          </div>
        </div>
      </main> */}
    </>
  );
}