import Link from 'next/link';

export default function Home() {
    const cards = [
        {
            id: 1,
            number: "WordRLe",
            title: "",
            description: "Teaching an RL agent to play the game of Wordle.",
            link: "./projects/wordRLe",
        }
    ];

    return (
      <main className="min-h-screen flex flex-col items-center p-4">
        <nav className="w-full flex items-center p-4 fixed top-0 left-0 z-10">
          <div className="ml-auto flex space-x-4">
            <Link href="./" className="text-[#EAEAEA] hover:underline">Home</Link>
            <Link href="./about_me" className="text-white hover:underline">About Me</Link>
            <Link href="./projects" className="text-[#EAEAEA] hover:underline">Projects</Link>
            <Link href="./cv" className="text-white hover:underline">CV</Link>
          </div>
        </nav>
        <header>
            <div className="p-4">
                <h1 className="text-5xl font-bold mb-6 text-[#EAEAEA]">Projects</h1>
            </div>
        </header>
        <div className="container flex justify-center gap-8 mt-20">
                {cards.map((card) => (
                    <div
                        key={card.id}
                        className="relative w-[250px] h-[300px] bg-[rgba(255,255,255,0.05)] backdrop-blur-md rounded-[15px] flex justify-center items-center transition-all duration-500 overflow-hidden group"
                    >
                        <div className="absolute w-[150%] h-[150%] bg-gradient-to-r from-[#ff3c7b] to-[#40c9ff] opacity-0 transition-opacity duration-500 group-hover:opacity-100 animate-spin-slow"></div>
                        <div className="relative w-[96%] h-[96%] bg-[#1c1c1c] rounded-[10px] p-8 flex flex-col justify-between z-10">
                            <h2 className="text-[#ff3c7b] text-3xl font-medium">{card.number}</h2>
                            <h3 className="text-white text-2xl font-light">{card.title}</h3>
                            <p className="text-[#999] leading-6 mb-5">{card.description}</p>
                            <a
                                href={card.link}
                                className="inline-block px-6 py-2 text-white bg-gradient-to-r from-[#ff3c7b] to-[#40c9ff] rounded-full transition-transform duration-500 transform hover:scale-110 hover:shadow-lg"
                            >
                                Read More
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}