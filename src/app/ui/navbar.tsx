import Link from 'next/link';
import styles from '@/app/styles/navbar.module.css';
import NavLinks from '@/app/ui/nav-links';
import PortfolioLogo from '@/app/ui/portfolio-logo';
// import { PowerIcon } from '@heroicons/react/24/outline';
// import { signOut } from "@/auth";

export default function Navbar() {

    return (
        <header className="bg-black text-white">
            <div className="container mx-auto flex items-center justify-between p-4">
                <Link href="/" className="flex items-center">
                    <PortfolioLogo />
                </Link>
                <nav className="flex space-x-4">
                    <NavLinks />
                </nav>
            </div>
        </header>
        // <header className="bg-black text-white">
        //     <div className="container mx-auto flex items-center justify-between p-4">
        //         <Link href="/" className="flex items-center">
        //             <PortfolioLogo />
        //         </Link>
        //         <nav className="flex space-x-4">
        //             <NavLinks />
        //         </nav>
        //     </div>
        // </header>
        // <header className="header">
        //     <nav>
        //         <ul className={styles.navList}>
        //             <li><Link href="/">Home</Link></li>
        //             <li><Link href="/about">About</Link></li>
        //             <li><Link href="/projects">Projects</Link></li>
        //             <li><Link href="/contact">Contact</Link></li>
        //         </ul>
        //     </nav>
        // </header>

        // <div className="flex h-full flex-col px-3 py-4 md:px-2">
        //     <Link
        //         className="mb-2 flex h-20 items-end justify-start rounded-md bg-black p-4 md:h-40"
        //         href="/">
        //         <div className="w-32 text-white md:w-40">
        //             <PortfolioLogo />
        //         </div>
        //     </Link>
        //     <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        //         <NavLinks />
        //         <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        //         {/* <form
        //             action={async () => {
        //                 "use server";
        //                 await signOut();
        //             }}>
        //             <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
        //                 <PowerIcon className="w-6" />
        //                 <div className="hidden md:block">Sign Out</div>
        //             </button>
        //         </form> */}
        //     </div>
        // </div>
    );
}