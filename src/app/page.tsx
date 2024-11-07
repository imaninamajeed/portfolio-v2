import Image from "next/image";
import Link from 'next/link';
import { FolderIcon, EnvelopeIcon } from '@heroicons/react/24/outline'; // Importing icons from Heroicons
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { HiDocument } from "react-icons/hi";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_0fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex items-center gap-4">
          <Image
            src="/profile.png"
            alt="Profile Picture"
            width={480}
            height={38}
            priority
          />
          <div className="flex flex-col items-center sm:items-start space-y-4">
            <p className="text-6xl md:text-8xl font-light text-center">
              Hi, my name is <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-pulse">Ima.</span>
            </p>
            <p className="text-2xl text-center sm:text-left max-w-4xl leading-relaxed">
              I am a <span className="font-bold text-purple-600">front-end developer</span> based in Malaysia. Welcome to my space!
            </p>
          </div>
        </div>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            href="/projects"
            className="rounded-full border border-transparent transition-all transform hover:scale-105 flex items-center justify-center bg-purple-600 text-white text-lg h-12 px-8 shadow-md hover:shadow-lg"
          >
            <FolderIcon className="h-6 w-6 mr-2" />
            View Projects
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-all transform hover:scale-105 flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-lg h-12 px-8 shadow-md hover:shadow-lg"
          >
            <EnvelopeIcon className="h-6 w-6 mr-2" />
            Contact Me
          </Link>
        </div>

        <ol className="list-inside list-decimal text-base sm:text-lg font-[var(--font-geist-mono)] leading-relaxed text-center sm:text-left space-y-3">
          <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <span className="flex-shrink-0 text-purple-600">
              <FolderIcon className="h-5 w-5" />
            </span>
            <span>
              Dive into my <strong>Projects</strong> section to see a showcase of my latest work, where I bring creative ideas to life through innovative design and code.
            </span>
          </li>
          <li className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
            <span className="flex-shrink-0 text-purple-600">
              <EnvelopeIcon className="h-5 w-5" />
            </span>
            <span>
              Want to connect? Head over to the <strong>Contact</strong> section to get in touch! I’m open to discussing projects, collaborations, or just a friendly chat.
            </span>
          </li>
        </ol>
      </main>

      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://linkedin.com/in/imaninamajeed"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin className="h-6 w-6 text-blue-600" aria-hidden />
          LinkedIn
        </Link>
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/imaninamajeed"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub className="h-6 w-6 text-gray-800 dark:text-white" aria-hidden />
          GitHub
        </Link>
        <Link
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <HiDocument className="h-6 w-6 text-gray-800 dark:text-white" aria-hidden />
          Resume
        </Link>

      </footer>
    </div>
  );
}
