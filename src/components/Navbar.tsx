"use client";

import * as React from "react";
import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { cn } from "@/lib/utils";

import Image from "next/image";
import logo from "../../logo.png";

export function Navbar() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 py-4 md:py-6 transition-all duration-300">
      <div className="max-w-6xl mx-auto rounded-2xl bg-glass border border-glass-border backdrop-blur-xl shadow-lg flex items-center justify-between px-6 py-3">
        <Link href="/" className="flex items-center space-x-2">
          <Image src={logo} alt="IETECH Logo" width={32} height={32} className="object-contain drop-shadow-md" />
          <span className="font-bold text-lg tracking-tight">IETECH</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <Link href="/about" className="hover:text-primary transition-colors">About</Link>
          <Link href="/events" className="hover:text-primary transition-colors">Events</Link>
          <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <Link href="/team" className="hover:text-primary transition-colors">Team</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Link
            href="/join"
            className="hidden md:inline-flex bg-foreground text-background px-4 py-2 rounded-full font-medium text-sm hover:opacity-90 transition-opacity"
          >
            Join Us
          </Link>
        </div>
      </div>
    </header>
  );
}
