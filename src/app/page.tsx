"use client"
import { useState, useEffect } from "react";
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';
import NeuralNoiseBackground from './NeuralNoise';

export default function Home() {

  const [headerOpacity, setHeaderOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = 200;
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
     <NeuralNoiseBackground opacity={headerOpacity}/>
     <div className="bg"></div>
      <nav className="w-full flex items-center p-4 fixed top-0 left-0 z-10">
        <div className="ml-auto flex space-x-4">
        <Link href="./" className=" hover:underline">Home</Link>
        <Link href="./about_me" className=" hover:underline">About Me</Link>
        <Link href="./projects" className=" hover:underline">Projects</Link>
        <Link href="./cv" className=" hover:underline">CV</Link>
        </div>
      </nav>
      <header className="relative w-full h-screen bg-cover bg-center flex items-center justify-center">
        <div className="fixed text-center ">
          <h1 className="text-5xl font-bold mb-6">Maxwell Malamut</h1>
          <div className="flex justify-center space-x-6">
            <a href="https://www.linkedin.com/in/maxwellmalamut" className=" hover:text-gray-300">
              <FaLinkedin className="text-4xl" />
            </a>
            <a href="https://github.com/maxmal1" className=" hover:text-gray-300">
              <FaGithub className="text-4xl" />
            </a>
            <a href="mailto:mimmalamut@gmail.com" className=" hover:text-gray-300">
              <FaEnvelope className="text-4xl" />
            </a>
          </div>
        </div>
      </header>
    </>
  );
}