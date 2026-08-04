"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";

const SECTION_LINKS = [
  { id: "top", href: "/", label: "Home" },
  { id: "about", href: "/#about", label: "About" },
  { id: "experience", href: "/#experience", label: "Experience" },
] as const;

const SECTION_IDS = SECTION_LINKS.map((link) => link.id);

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const onHomepage = pathname === "/";
  const onProjects = pathname === "/projects" || pathname.startsWith("/projects/");
  const [activeSection, setActiveSection] = useState<string>("top");

  useEffect(() => {
    if (!onHomepage) return;

    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-15% 0px -70% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [onHomepage]);

  function isActive(id: string) {
    return onHomepage && activeSection === id;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/75 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex min-h-17 w-full max-w-290 items-center justify-between gap-6 px-4">
        <Link
          href="/"
          aria-label="Imanina home"
          className="flex items-center gap-2.5 font-semibold tracking-tight"
        >
          <span className="grid size-8.5 place-items-center rounded-[9px] bg-primary text-[0.74rem] tracking-wide text-primary-foreground">
            IM
          </span>
          <span className="text-[0.96rem]">Imanina Majeed</span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden items-center gap-1 md:flex">
          {SECTION_LINKS.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              aria-current={isActive(link.id) ? "location" : undefined}
              className={cn(
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                isActive(link.id)
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/projects"
            aria-current={onProjects ? "page" : undefined}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              onProjects ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            Projects
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link href="/#contact">Let&rsquo;s Talk</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open navigation"
              >
                <Menu className="size-4.5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" aria-describedby={undefined}>
              <SheetHeader>
                <SheetTitle>Navigation</SheetTitle>
              </SheetHeader>
              <nav aria-label="Mobile navigation" className="flex flex-col gap-1 px-4">
                {SECTION_LINKS.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive(link.id) ? "location" : undefined}
                    className={cn(
                      "rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-accent hover:text-foreground",
                      isActive(link.id) ? "font-semibold text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/projects"
                  onClick={() => setOpen(false)}
                  aria-current={onProjects ? "page" : undefined}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-accent hover:text-foreground",
                    onProjects ? "font-semibold text-foreground" : "text-muted-foreground"
                  )}
                >
                  Projects
                </Link>
                <Link
                  href="/#contact"
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  Contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
