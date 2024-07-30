"use client"
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
      <nav className="w-full flex items-center bg-white shadow-md p-4 fixed top-0 left-0 z-10">
        <div className="ml-auto flex space-x-4">
          <Link href="./" className="text-black hover:underline">Home</Link>
          <Link href="./about" className="text-black hover:underline">About Me</Link>
        </div>
      </nav>
      <div className="mt-20 w-full max-w-4xl space-y-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-black mb-4">Contact</h2>
          <div className="text-sm text-gray-600">
            <p className="mb-1">
              <span className="font-medium text-black">Email:</span> <a href="mailto:mimmalamut@gmail.com" className="text-blue-600 hover:underline">mimmalamut@gmail.com</a>
            </p>
            <p className="mb-1">
              <span className="font-medium text-black">LinkedIn:</span> <a href="https://www.linkedin.com/in/maxwellmalamut" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">linkedin.com/in/maxwellmalamut</a>
            </p>
            <p className="mb-1">
              <span className="font-medium text-black">GitHub:</span> <a href="https://github.com/maxmal1" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">github.com/maxmal1</a>
            </p>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-black mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">Python</span>
            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">Pytorch</span>
            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">TensorFlow</span>
            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">NumPy</span>
            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">Pandas</span>
            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">OpenCV</span>
            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">C++</span>
            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">MATLAB</span>
            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">Version Control</span>
            <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">High-Performance Computing</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-black mb-4">Experience</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-gray-800">Algorithms and AI Solutions Analyst</h3>
              <h3 className="text font-medium text-gray-800">Toyon Research Corporation</h3>
              <p className="text-sm text-gray-600 mb-2">June 2024 - Present</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800">Graduate Research Assistant</h3>
              <h3 className="text font-medium text-gray-800">Computational Imaging Systems Lab @ Boston University</h3>
              <p className="text-sm text-gray-600 mb-2">Sept 2023 - May 2024</p>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Used deep learning to classify brain pathology into CTE severity cases.</li>
                <li>Implemented a custom self-supervised feature extraction network to assess 
                and improve model performance. </li>
                <li>Created robust image augmentation classes to improve self-supervised 
                learning features.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800">Undergraduate Research Assistant</h3>
              <h3 className="text font-medium text-gray-800">Red Hat Collaboratory @ Boston University</h3>
              <p className="text-sm text-gray-600 mb-2">Jan 2023 - May 2023</p>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Presented research results at weekly meetings as well as final results to Red 
                Hat leadership. </li>
                <li>Investigated a time series specific generative adversarial network for 
                generating synthetic telemetry data.  </li>
                <li>Optimized model hyperparameters to produce synthetic data with similar 
                statistical distribution as real data while combating mode collapse.</li>
                <li>Accounted for user privacy utilizing TensorFlow's differential privacy library.</li>
                <li>Used a Jupyter notebook to preprocess telemetry data from sparse Excel 
                data using Pandas and performed data manipulation to create a more 
                complete dataset.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-800">Evaluation and Test Engineering Intern</h3>
              <h3 className="text font-medium text-gray-800">GE Aerospace</h3>
              <p className="text-sm text-gray-600 mb-2">May 2022 - Aug 2022</p>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>Presented an engine testing review to GE leadership before engine entered 
                testing phase. </li>
                <li>Prepared LEAP-1B engines for testing to execute on engine mission goals.</li>
                <li>Coordinated team meetings between engineers to plan timelines and engine 
                deliverables for engine certification. </li>
                <li>Fabricated a Gantt chart for an assembly, inspection, and testing timeline for 
                an engine. </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold text-black mb-4">Education</h2>
          <div>
              <h3 className="text-lg font-medium text-gray-800">Boston University</h3>
              <h3 className="text font-medium text-gray-800">Master of Computer Engineering</h3>
              <p className="text-sm text-gray-600 mb-2">Sept 2023 - May 2024</p>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>GPA: 3.95/4.00</li>
              </ul>
              <h3 className="text font-medium text-gray-800">Bachelor of Mechanical Engineering</h3>
              <p className="text-sm text-gray-600 mb-2">Sept 2019 - May 2023</p>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                <li>GPA: 3.51/4.00</li>
              </ul>
            </div>
        </div>
      </div>
    </main>
  );
}
