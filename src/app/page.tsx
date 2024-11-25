"use client"
import Image from "next/image";
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import Link from 'next/link';
import NeuralNoiseBackground from './NeuralNoise'
export default function Home() {
  return (
    <>
     <NeuralNoiseBackground />
      <nav className="w-full flex items-center bg-white shadow-md p-4 fixed top-0 left-0 z-10">
        <div className="ml-auto flex space-x-4">
        <Link href="./" className="text-black hover:underline">Home</Link>
        <Link href="./about" className="text-black hover:underline">About Me</Link>
        </div>
      </nav>
    <main>
      <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-3xl w-full bg-white rounded-lg justify-center shadow-lg p-6">
        <div className="flex flex-col md:flex-row justify-center  gap-6">
          <div className="w-full md:w-1/3 flex justify-center">
            <Image
              src="/headshot.png"
              alt="Headshot of Maxwell Malamut"
              width={200}
              height={200}
              className="rounded-md"
            />
          </div>
          
          <div className="w-full md:w-2/3 flex flex-col">
          <h1 className="text-2xl text-black font-semibold mb-4 md:text-left">
              Maxwell Malamut
            </h1>
            <div className="flex flex-wrap md:justify-start gap-4 mb-2">
            <a href="https://www.linkedin.com/in/maxwellmalamut" className="flex items-center text-black hover:underline mb-4 lg:mb-0">
              <FaLinkedin className="mr-2 text-2xl" />
            </a>
            <a href="https://github.com/maxmal1" className="flex items-center text-black hover:underline mb-4 lg:mb-0">
              <FaGithub className="mr-2 text-2xl" />
            </a>
            <a href="mailto:mimmalamut@gmail.com" className="flex items-center text-black hover:underline mb-4 lg:mb-0">
              <FaEnvelope className="mr-2 text-2xl" />
            </a>
            </div>
            <p className="text-lg text-black mb-4 text-center md:text-left">
              Hi, I'm Max. I'm currently working as a deep learning engineer. My focus is in LLMs, NLP, and Computer Vision.
            </p>
          </div>
        </div>
      </div>
      </div>
    </main>
    </>
  );
}