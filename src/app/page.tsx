

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">
      <h1 className="mb-8 text-4xl font-semibold tracking-tighter">
        Maxwell Malamut
      </h1>
      <div className="w-full max-w-5xl mb-8 flex flex-col items-center lg:flex-row lg:justify-center lg:space-x-20">
        <a href="https://www.linkedin.com/in/maxwellmalamut" className="text-white-500 hover:underline mb-4 lg:mb-0 lg:mr-4">LinkedIn</a>
        <a href="https://github.com/maxmal1" className="text-white-500 hover:underline mb-4 lg:mb-0 lg:mr-4">GitHub</a>
        <a href="mailto:maxmal@bu.edu" className="text-white-500 hover:underline">maxmal@bu.edu</a>
      </div>
    </main>
  );
}

