"use client";
import {
    UserGroupIcon,
    HomeIcon,
    DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

// Map of links to display in the navigation bar.
const links = [
    { name: "Home", href: "/", icon: HomeIcon },
    { name: "Projects", href: "/projects", icon: DocumentDuplicateIcon },
    { name: "About", href: "/about", icon: UserGroupIcon },
    { name: "Contact", href: "/contact", icon: UserGroupIcon },
];

export default function NavLinks() {
    const pathname = usePathname();
    return (
        <>
            {links.map((link) => {
                const LinkIcon = link.icon;
                return (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={clsx(
                            "flex items-center gap-2 rounded-md p-2 text-sm font-medium transition-colors duration-200",
                            {
                                "bg-gray-800 text-white": pathname === link.href,
                                "text-gray-400 hover:bg-gray-700 hover:text-white": pathname !== link.href,
                            }
                        )}>
                        <LinkIcon className="w-6" />
                        <p>{link.name}</p>
                    </Link>
                );
            })}
        </>
    );
}