import Link from 'next/link';


export default function Home() {
    return (
        <main>
          <nav className="w-full flex items-center p-4 fixed top-0 left-0 z-10">
            <div className="ml-auto flex space-x-4">
            <Link href="./" className=" hover:underline">Home</Link>
            <Link href="../about_me" className=" hover:underline">About Me</Link>
            <Link href="../projects" className=" hover:underline">Projects</Link>
            <Link href="../cv" className=" hover:underline">CV</Link>
            </div>
          </nav>
        </main>
          )
        }
