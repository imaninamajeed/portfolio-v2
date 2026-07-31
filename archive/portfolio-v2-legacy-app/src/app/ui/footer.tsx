import Link from 'next/link';
import { FaLinkedin, FaGithub } from "react-icons/fa";
import { HiDocument } from 'react-icons/hi';

const Footer = () => {
    return (
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center mt-auto p-4">
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
    );
};

export default Footer;