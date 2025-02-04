"use client";
import { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { FaGithub } from 'react-icons/fa';
import Link from 'next/link';
import Image from "next/image";

export default function WordleComponent() {
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [wordsList, setWordsList] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gridState, setGridState] = useState(Array(30).fill({
    letter: '',
    color: 'default'
  }));
  const [currentGuessRow, setCurrentGuessRow] = useState(0);

  useEffect(() => {
    const loadWords = async () => {
      try {
        const response = await fetch('/five_letter_words.json');
        const data = await response.json();
        setWordsList(data);
      } catch (error) {
        console.error('Error loading word list:', error);
        setError('Error loading word list');
      }
    };

    loadWords();
  }, []);

  const processChunk = (data) => {
  
    // Get the last 32 characters
    const lastChunk = data.slice(-32);
  
    // Remove all tags and extract just the word and colors
    const cleaned = lastChunk
      .replace(/<START>|<END>|[<>]/g, '')
      .toLowerCase();
    
    if (cleaned.length >= 10) {
      const word = cleaned.slice(0, 5);
      const colors = cleaned.slice(-5);
  
      setCurrentGuessRow((prevGuessRow) => {
        // Check if the game should end

  
        setGridState((prevGrid) => {
          const newGrid = [...prevGrid];
          const startIdx = prevGuessRow * 5;
  
          for (let i = 0; i < 5; i++) {
            newGrid[startIdx + i] = {
              letter: word[i],
              color: colors[i],
            };
          }
  
          return newGrid;
        });
        if (colors === 'ggggg' || prevGuessRow === 5) {
          setIsGameOver(true);
          return prevGuessRow; // Do not update guess row
        }
        return prevGuessRow + 1; // Increment guess row

      });
    }
    if (isGameOver) {
      
      return;
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    let isValidWord;
    
    // Word validation
    // @ts-ignore
    if (wordsList.includes(input.toLowerCase())) {
      isValidWord = true;
    } else {
      isValidWord = false;
    }

    if (!isValidWord) {
      setShowAlert(true);
      setInput('');
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
      setIsLoading(false);
      return;
    }

    // Clear the board for new submission
    setGridState(Array(30).fill({
      letter: '',
      color: 'default'
    }));
    setCurrentGuessRow(0);
    setIsGameOver(false);

    try {
      console.log('Submitting word:', input);
      const response = await fetch('/api/gradio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ word: input }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API error: ${JSON.stringify(errorData)}`);
      }
      // @ts-ignore
      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        console.log('Received chunk__:', chunk);
        
        const lines = chunk.split('\n').filter(Boolean);
        console.log('Lines:', lines);
        for (const line of lines) {
          try {
            
            const jsonStr = line.startsWith('data: ') ? line.slice(6) : line;
            console.log('jsonstr:', jsonStr);
            const event = JSON.parse(jsonStr);
            console.log('event:', event);
            if (event) {
              console.log('event data:', event[0]);
              processChunk(event[0]);
            }
          } catch (error) {
            console.error('Error processing line:', line, error);
          }
        }
      }

      setInput('');
    } catch (error) {
      console.error('Detailed error:', error);
      // @ts-ignore
      setError(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="pt-[20vh] flex flex-col">
       <nav className="w-full flex items-center p-4 fixed top-0 left-0 z-10 bg-[#111111]">
        <div className="ml-auto flex space-x-4">
          <Link href="../" className="hover:underline">Home</Link>
          <Link href="../about_me" className="hover:underline">About Me</Link>
          <Link href="../projects" className="hover:underline">Projects</Link>
          <Link href="../cv" className="hover:underline">CV</Link>
        </div>
      </nav> 
      
      {/* Add padding top to account for fixed nav */}
      <div className=" pt-16 flex-1 flex flex-col items-center p-4">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-4 text-center">WordRLe</h1>
          <div className="flex flex-col space-y-4 text-black p-4">
            <input
              type="text"
              placeholder="Submit a five letter word"
              value={input}
              onChange={(e) => setInput(e.target.value.toLowerCase())}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
              maxLength={5}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>

          {showAlert && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>
                Invalid word
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <div className="mt-4 p-4 border border-red-500 rounded bg-red-50 text-red-700">
              {error}
            </div>
          )}

          <div className="grid grid-rows-6 grid-cols-5 gap-2 mb-4">
            {gridState.map((cell, i) => (
              <div
                key={i}
                className={`w-12 h-12 border border-gray-700 rounded flex items-center justify-center text-lg font-bold transition-colors bg-gray-800 duration-300 ${
                  cell.color === 'g' ? 'bg-green-500 text-white' :
                  cell.color === 'y' ? 'bg-yellow-500 text-white' :
                  'bg-gray-100'
                }`}
              >
                {cell.letter.toUpperCase()}
              </div>
            ))}
          </div>

          {isLoading && (
            // @ts-ignore
            <Alert variant="info" className="mt-4">
              <AlertDescription>
                Thinking
              </AlertDescription>
            </Alert>
          )}
        </div>

         <div className="max-w-xl space-y-4 mt-6 p-4">
         <p className="text-lg leading-6 italic p-2">
            Please be patient, the model is hosted on the free tier of huggingface spaces,
            and only given CPU access.
          </p>
            <a href="https://github.com/maxmal1/wordRLe" className=" hover:text-gray-300">
              <FaGithub className="text-4xl" />
            </a>
            <p className="text-lg leading-6">
              I wanted to see if I could teach a transformer model to play the popular game of
              Wordle. Wordle is a word-guessing game, where the objective is to guess a hidden
              five-letter word in six attempts or fewer. The user takes turns guessing valid
              five-letter words until they either run out of guesses or find the correct word.
              To help guide the player, the game provides feedback in the form of colors. Each
              character in a guess gets assigned a color based on the target word. Characters in
              the right position, that is, in the same index as the target word, are green.
              Characters present in the target word but in the wrong index are colored yellow,
              and characters that are not present in the target word remain black.
            </p>
            <p className="text-lg leading-6">
              This poses an interesting problem space for reinforcement learning, especially on the
              character level. The model not only needs to be able to form valid English words, but it must also
              leverage learned rules of the game in order to complete it.
            </p>
            <p className="text-lg leading-6">
              I initially wanted to use Proximal Policy Optimization to teach the agent how to play
              the game. However, after spending some time on this approach, I realized it was very
              difficult for the model to learn. Even on a simplified game of only a single word,
              the model still struggled. It would often collapse to guessing a single letter or
              a few random letters.
            </p>
            <p className="text-lg leading-6">
              The reward structure was relatively simple: a positive reward for getting a green,
              a smaller positive reward for guessing a yellow, and a negative reward for guessing
              a letter not in the target word. I tweaked this over time, trying to find some combination
              that worked. But the simplest reward structure often performed the "best" (even if the best
              wasn't very good).
            </p>
            <p className="text-lg leading-6">
              I decided to move to an "offline" reinforcement learning approach. I created synthetic games
              based on a somewhat optimal playing of Wordle. The first guess was randomly selected from
              the pool of valid words. The game provides feedback in the form of greens, yellows, and blacks.
              The possible words were filtered based on the feedback, such that the next guessed word needed
              to have a green letter in previously found positions, yellow letters needed to be present (but not
              in the same spot), and black letters couldn't be present. Then, on guesses from 3 to 6, the correct
              word would be inserted in the final spot.
            </p>
            <p className="text-lg leading-6">
              This created a lot of possible data for the model to learn. Using causal attention and cross-entropy loss,
              the model learned which letter to predict based on the previous state space. Through training, I
              tracked the model's loss and, as validation, the number of games it won.
            </p>

        <Image
          src="/metrics/wordle_loss.png"
          alt="Loss"
          width={1000} 
          height={1000} 
        />
        <Image
          src="/metrics/wordle_gamewon.png"
          alt="Games Won"
          width={1000} 
          height={1000} 
        />
          <p className="text-lg leading-6">
            The model trained for a maximum of 1,000 epochs, with an early stopping criterion of 20 epochs with no loss improvement.
            Each epoch, the model would play 100 synthetic games. After the epoch was complete, the model would play 15 games of
            Wordle to track its performance over time.
          </p>
          <p className="text-lg leading-6">
            Using a purely greedy approach, the model can properly guess the final word 80% of the time. Even after improved training
            and larger model sizes, the model was not able to beat this benchmark. So I introduced beam searching. Beam searching is
            a decoding method used by LLMs to approximate the most optimal sequence of tokens. Unlike the greedy approach, which
            selects the highest probability token each time, beam search keeps a number of sequences (or beams) and tracks the
            cumulative log probability of the sequence, pruning out less probable sequences.
          </p>
          <p className="text-lg leading-6">
            With a beam search width of 4, the model can solve 90% of games. As a final improvement, and as a way to make the model play
            more like a human, I added a random value (between 1 beam and 8 beams) for the beam width at each word generation, which 
            brought the number of games solved to 95%. The improvement likely comes from the trade-off between exploration and exploitation. 
            A fixed beam width of 4 may sometimes prune out optimal sequences too early, while wider beams (5-8) increase the chances of finding 
            better solutions. On the other hand, occasionally using a smaller beam width (1-3) encourages diversity in predictions, preventing 
            the model from always converging to the same strategies. By allowing the beam width to vary, the model benefits from a mix of quick 
            approximate solutions and deeper searches, leading to a higher overall success rate. While my evaluation showed a 95% success rate, 
            I suspect the true performance may be slightly higher, though further testing would be needed.
          </p>
          <p className="text-lg leading-6">
            In the future, I'd like to use PPO for reinforcement learning as a baseline. Right now, the model does a lot of things
            well. While it's not perfect, it will keep green characters in place and guess yellow ones in different locations. Additionally,
            one of the model's most frequent starting words is "salep," which is very close to one of the optimal starting words, "salet," which was
            found by 3Blue1Brown during his investigation into solving Wordle with entropy.
          </p>
        </div> 
      </div>
    </main>
  );
};