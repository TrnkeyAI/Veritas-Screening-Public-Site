"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site";
import logo from "../../public/logo.png";
import logoMark from "../../public/logo-mark.png";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Focus trap + Esc-to-close for the mobile menu.
  useEffect(() => {
    if (!open) return;

    const menu = menuRef.current;
    const focusables = menu
      ? Array.from(menu.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
      : [];
    focusables[0]?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (e.key === "Tab" && focusables.length > 0) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" aria-label={siteConfig.logo.alt} className="flex items-center">
          <Image
            src={logo}
            alt=""
            preload
            className="hidden h-10 w-auto sm:block"
          />
          <Image src={logoMark} alt="" className="h-9 w-auto sm:hidden" />
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 md:flex"
        >
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-content transition-colors hover:text-content-strong"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href={siteConfig.LOGIN_URL}
            rel="noopener"
            className="rounded-control border border-content-strong px-4 py-2 text-sm font-medium text-content-strong transition-colors hover:bg-surface-inverted hover:text-content-inverted"
          >
            Log In
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          ref={toggleRef}
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-control text-content-strong md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            {open ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="border-t border-border bg-surface px-4 pb-6 pt-2 md:hidden"
        >
          <nav aria-label="Primary" className="flex flex-col">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-border-subtle py-3 text-base font-medium text-content hover:text-content-strong"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={siteConfig.LOGIN_URL}
              rel="noopener"
              className="mt-4 rounded-control border border-content-strong px-4 py-3 text-center text-base font-medium text-content-strong hover:bg-surface-inverted hover:text-content-inverted"
              onClick={() => setOpen(false)}
            >
              Log In
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
