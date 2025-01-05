"use client"
import Link from 'next/link';
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center p-4">
      <nav className="w-full flex items-center p-4 fixed top-0 left-0 z-10">
        <div className="ml-auto flex space-x-4">
          <Link href="./" className=" hover:underline">Home</Link>
          <Link href="./about_me" className=" hover:underline">About Me</Link>
          <Link href="./projects" className=" hover:underline">Projects</Link>
          <Link href="./cv" className=" hover:underline">CV</Link>
        </div>
      </nav>
      <div className="flex flex-col items-center mt-20">
        <Image
          src="/headshot.png"
          alt="Max"
          width={150} 
          height={150}
          className="rounded-full shadow-lg"
        />

        <div className="text-center mt-6 max-w-xl  space-y-4">
          <p className="text-lg leading-6">
          I am a machine learning engineer using LLMs and developing retrieval-augmented 
          generation systems. I am a recent graduate of Boston University, where I received 
          a Master’s in Computer Engineering and a Bachelor’s in Mechanical Engineering. 
          As a student, I contributed as an undergraduate researcher at BU's Red Hat 
          Collaboratory, where I explored generating synthetic data using deep learning, 
          and as a graduate researcher in the Computational Imaging Systems Lab, focusing 
          on deep learning applications for diagnosing CTE in brain imaging.
          </p>
          <p className="text-lg leading-6">
          Outside of work, I am an alumni student mentor at BU, I enjoy going to the gym, 
          spending time with friends, and continuously learning through personal projects.
          </p>
        </div>
      </div>
    </main>
  )
}