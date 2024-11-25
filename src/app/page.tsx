"use client"
import Image from "next/image";
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';
import NeuralNoiseBackground from './NeuralNoise'
export default function Home() {
  return (
    <>
     <NeuralNoiseBackground />
      <nav className="w-full flex items-center p-4 fixed top-0 left-0 z-10">
        <div className="ml-auto flex space-x-4">
        <Link href="./" className="text-white hover:underline">Home</Link>
        <Link href="./about" className="text-white hover:underline">About Me</Link>
        </div>
      </nav>
      <header className="relative w-full h-screen bg-cover bg-center flex items-center justify-center">
        <div className="relative text-center text-white">
          <h1 className="text-5xl font-bold mb-6">Maxwell Malamut</h1>
          <div className="flex justify-center space-x-6">
            <a href="https://www.linkedin.com/in/maxwellmalamut" className="text-white hover:text-gray-300">
              <FaLinkedin className="text-4xl" />
            </a>
            <a href="https://github.com/maxmal1" className="text-white hover:text-gray-300">
              <FaGithub className="text-4xl" />
            </a>
            <a href="mailto:mimmalamut@gmail.com" className="text-white hover:text-gray-300">
              <FaEnvelope className="text-4xl" />
            </a>
          </div>
        </div>
      </header>

      <main className=" py-12">
  <div className="container mx-auto px-4">
    <div className="grid gap-8 md:grid-cols-2">
      {/* About Me Card */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">About Me</h2>
        <p className="text-gray-700 text-lg">
          Hi, I'm Max. I'm currently working as a deep learning engineer. My focus is in LLMs, NLP, and Computer Vision.
        </p>
      </div>
      {/* Portrait Card */}
      <div className="bg-white rounded-lg shadow-lg p-6 flex justify-center">
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
</main>

    </>
  );
}