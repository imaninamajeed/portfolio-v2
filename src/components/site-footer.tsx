import Link from "next/link";
import { FileText } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex min-h-20.5 w-full max-w-290 flex-col items-start justify-between gap-4 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center">
        <p>&copy; {new Date().getFullYear()} Imanina Majeed.</p>
        <div className="flex flex-wrap items-center gap-5">
          <Link
            href="https://linkedin.com/in/imaninamajeed"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            LinkedIn
          </Link>
          <Link
            href="https://github.com/imaninamajeed"
            target="_blank"
            rel="noreferrer"
            className="hover:text-foreground"
          >
            GitHub
          </Link>
          <Link
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-foreground"
          >
            <FileText className="size-4" aria-hidden="true" />
            Resume
          </Link>
        </div>
      </div>
    </footer>
  );
}
