"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";

const navLinks = [
  { href: "/", label: "Главная" },
  { href: "/player", label: "Игрок" },
  { href: "/mods", label: "Моды" },
  { href: "/clan", label: "Кланы" },
];

function DiscordIcon({ size = 25 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.317 4.369A19.791 19.791 0 0 0 15.885 3c-.191.328-.403.77-.552 1.116a18.27 18.27 0 0 0-5.666 0A12.64 12.64 0 0 0 9.115 3a19.736 19.736 0 0 0-4.433 1.369C1.88 8.58 1.12 12.686 1.5 16.737a19.9 19.9 0 0 0 5.43 2.763c.438-.6.828-1.235 1.164-1.904-.64-.241-1.25-.538-1.823-.885.153-.112.302-.23.447-.351 3.514 1.65 7.327 1.65 10.8 0 .146.121.295.239.447.351-.574.347-1.186.645-1.827.887.336.668.726 1.303 1.164 1.902a19.875 19.875 0 0 0 5.432-2.763c.446-4.698-.762-8.767-3.417-12.368ZM9.049 14.322c-1.057 0-1.924-.968-1.924-2.159 0-1.19.847-2.159 1.924-2.159 1.084 0 1.94.977 1.924 2.159 0 1.19-.848 2.159-1.924 2.159Zm5.902 0c-1.057 0-1.924-.968-1.924-2.159 0-1.19.847-2.159 1.924-2.159 1.084 0 1.94.977 1.924 2.159 0 1.19-.84 2.159-1.924 2.159Z" />
    </svg>
  );
}

function MenuIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </svg>
  );
}

function CloseIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link
          href="/"
          prefetch={false}
          className={styles.logo}
          onClick={handleCloseMenu}
        >
          CR<span className={styles.zero}>0</span>C
        </Link>

        <nav className={styles.nav} aria-label="Main navigation">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              prefetch={false}
              className={`${styles.link} ${pathname === href ? styles.active : ""}`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <a
          href="https://discord.gg/TrSrudNUXt"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.discord}
          aria-label="Join Discord"
        >
          <DiscordIcon size={25} />
          <span>Discord</span>
        </a>

        <button
          type="button"
          className={styles.burger}
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          {isOpen ? <CloseIcon size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      <div
        className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ""}`}
        id="mobile-menu"
      >
        <nav className={styles.mobileNav} aria-label="Mobile navigation">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              prefetch={false}
              onClick={handleCloseMenu}
              className={`${styles.mobileLink} ${pathname === href ? styles.activeMobile : ""}`}
            >
              {label}
            </Link>
          ))}

          <a
            href="https://discord.gg/TrSrudNUXt"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.mobileDiscord}
            onClick={handleCloseMenu}
          >
            <DiscordIcon size={22} />
            <span>Discord</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
