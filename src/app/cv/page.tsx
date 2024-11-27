"use client"
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center p-4">
      <nav className="relative w-full flex items-center fixed top-0 left-0 z-10">
        <div className="ml-auto flex space-x-4">
          <Link href="./" className="text-[#EAEAEA] hover:underline">Home</Link>
          <Link href="./about_me" className="text-white hover:underline">About Me</Link>
          <Link href="./cv" className="text-white hover:underline">CV</Link>
        </div>
      </nav>
      <div className="mt-20 w-full max-w-4xl space-y-6">
        <div className="p-6 border-2 border-gray-500">
          <h2 className="text-xl font-bold text-[#EAEAEA] mb-4">Contact</h2>
          <div className="text-sm text-[#EAEAEA]">
            <p className="mb-1">
              <span className="font-medium text-[#EAEAEA]">Email:</span> <a href="mailto:mimmalamut@gmail.com" className="text-[#B5FCFC] hover:underline">mimmalamut@gmail.com</a>
            </p>
            <p className="mb-1">
              <span className="font-medium text-[#EAEAEA]">LinkedIn:</span> <a href="https://www.linkedin.com/in/maxwellmalamut" target="_blank" rel="noopener noreferrer" className="text-[#B5FCFC] hover:underline">linkedin.com/in/maxwellmalamut</a>
            </p>
            <p className="mb-1">
              <span className="font-medium text-[#EAEAEA]">GitHub:</span> <a href="https://github.com/maxmal1" target="_blank" rel="noopener noreferrer" className="text-[#B5FCFC] hover:underline">github.com/maxmal1</a>
            </p>
          </div>
        </div>
        <div className="p-6 border-2 border-gray-500">
          <h2 className="text-xl font-bold text-[#EAEAEA] mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            <span className="bg-[#EAEAEA] text-gray-700 px-2 py-1 rounded text-sm">Python</span>
            <span className="bg-[#EAEAEA] text-gray-700 px-2 py-1 rounded text-sm">Pytorch</span>
            <span className="bg-[#EAEAEA] text-gray-700 px-2 py-1 rounded text-sm">TensorFlow</span>
            <span className="bg-[#EAEAEA] text-gray-700 px-2 py-1 rounded text-sm">NumPy</span>
            <span className="bg-[#EAEAEA] text-gray-700 px-2 py-1 rounded text-sm">OpenSearch</span>
            <span className="bg-[#EAEAEA] text-gray-700 px-2 py-1 rounded text-sm">MLFlow</span>
            <span className="bg-[#EAEAEA] text-gray-700 px-2 py-1 rounded text-sm">Ray</span>            
            <span className="bg-[#EAEAEA] text-gray-700 px-2 py-1 rounded text-sm">Pandas</span>
            <span className="bg-[#EAEAEA] text-gray-700 px-2 py-1 rounded text-sm">OpenCV</span>
            <span className="bg-[#EAEAEA] text-gray-700 px-2 py-1 rounded text-sm">C++</span>
            <span className="bg-[#EAEAEA] text-gray-700 px-2 py-1 rounded text-sm">MATLAB</span>
            <span className="bg-[#EAEAEA] text-gray-700 px-2 py-1 rounded text-sm">Docker</span>
            <span className="bg-[#EAEAEA] text-gray-700 px-2 py-1 rounded text-sm">Kubernetes</span>
            <span className="bg-[#EAEAEA] text-gray-700 px-2 py-1 rounded text-sm">Version Control</span>
            <span className="bg-[#EAEAEA] text-gray-700 px-2 py-1 rounded text-sm">High-Performance Computing</span>
          </div>
        </div>
        <div className="p-6 border-2 border-gray-500">
          <h2 className="text-xl font-bold text-[#EAEAEA] mb-4">Experience</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium text-[#EAEAEA]">Algorithms and AI Solutions Analyst</h3>
              <h3 className="text font-medium text-[#EAEAEA] ml-2">Toyon Research Corporation</h3>
              <p className="text-sm text-[#EAEAEA] mb-2 ml-4">June 2024 - Present</p>
              <ul className="list-disc list-outside text-sm text-[#EAEAEA] space-y-1 ml-4">
                <li>Developed a retrieval-augmented generation pipeline for question-answering, leveraging vector databases and LLMs.</li>
                <li>Engineered custom classes to enhance retrieval, including hybrid retrieval methods, and document splitters.</li>
                <li>Focused on precision, recall, and faithfulness metrics, creating visualizations to display pipeline performance.</li>
                <li>Enabled autoscaling and modular model training by deploying on Kubernetes and using Ray for distributed job orchestration, allowing scalable access to larger GPUs and LLM resources.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#EAEAEA]">Graduate Research Assistant</h3>
              <h3 className="text font-medium text-[#EAEAEA] ml-2">Computational Imaging Systems Lab @ Boston University</h3>
              <p className="text-sm text-[#EAEAEA] mb-2 ml-4">Sept 2023 - May 2024</p>
              <ul className="list-disc list-outside text-sm text-[#EAEAEA] space-y-1 ml-4">
                <li>Used deep learning to classify whole-slide images of brain pathology into CTE severity cases.</li>
                <li>Implemented a custom image augmentation framework to improve self-supervised feature extraction.</li>
                <li>Applied dimensionality reduction on image extracted features to visualize feature quality.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-[#EAEAEA]">Undergraduate Research Assistant</h3>
              <h3 className="text font-medium text-[#EAEAEA] ml-2">Red Hat Collaboratory @ Boston University</h3>
              <p className="text-sm text-[#EAEAEA] mb-2 ml-4">Jan 2023 - May 2023</p>
              <ul className="list-disc list-outside text-sm text-[#EAEAEA] space-y-1 ml-4">
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
              <h3 className="text-lg font-medium text-[#EAEAEA]">Evaluation and Test Engineering Intern</h3>
              <h3 className="text font-medium text-[#EAEAEA] ml-2">GE Aerospace</h3>
              <p className="text-sm text-[#EAEAEA] mb-2 ml-4">May 2022 - Aug 2022</p>
              <ul className="list-disc list-outside text-sm text-[#EAEAEA] space-y-1 ml-4">
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
        <div className="p-6 border-2 border-gray-500">
          <h2 className="text-xl font-bold text-[#EAEAEA] mb-4">Education</h2>
          <div>
              <h3 className="text-lg font-medium text-[#EAEAEA]">Boston University</h3>
              <h3 className="text font-medium text-[#EAEAEA]">Master of Computer Engineering</h3>
              <p className="text-sm text-[#EAEAEA] mb-2">Sept 2023 - May 2024</p>
              <ul className="list-disc list-inside text-sm text-[#EAEAEA] space-y-1">
                <li>GPA: 3.95/4.00</li>
              </ul>
              <h3 className="text font-medium text-[#EAEAEA]">Bachelor of Mechanical Engineering</h3>
              <p className="text-sm text-[#EAEAEA] mb-2">Sept 2019 - May 2023</p>
              <ul className="list-disc list-inside text-sm text-[#EAEAEA] space-y-1">
                <li>GPA: 3.51/4.00</li>
              </ul>
            </div>
        </div>
      </div>
    </main>
  );
}
