import Link from 'next/link';

import Card from '../Card';

export default function Home() {
    const cards = [
        {
            image: '/hero_section.png',
            title: 'maxmalamut.com',
            content: 'GitHub repo containing the code for my website, and the codepen inspiration.',
            buttonLabel: 'GitHub',
            buttonLink: "https://github.com/maxmal1/website"
            },
    ];

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
        <header>
            <div className="p-4">
                <h1 className="text-5xl font-bold mb-6 ">Projects</h1>
            </div>
        </header>
        <div className="page-content">
      {cards.map((card, index) => (
        <Card
          key={index}
          image={card.image}
          title={card.title}
          content={card.content}
          buttonLabel={card.buttonLabel}
          buttonLink={card.buttonLink}
        />
      ))}
    </div>
      </main>
    );
}