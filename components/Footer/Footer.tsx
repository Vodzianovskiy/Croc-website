import Link from "next/link";
import { PiDiscordLogoFill } from "react-icons/pi";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.logo}>
            CR<span className={styles.zero}>0</span>C
          </span>
          <p className={styles.desc}>
            European clan. We play hard, we win harder.
          </p>
        </div>

        <nav className={styles.nav} aria-label="Footer navigation">
          <Link href="/" className={styles.link}>
            Главная
          </Link>
          <Link href="/news" className={styles.link}>
            Новости
          </Link>
          <Link href="/mods" className={styles.link}>
            Моды
          </Link>
        </nav>

        <a
          href="https://discord.gg/TrSrudNUXt"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.discord}
          aria-label="Join Discord"
        >
          <PiDiscordLogoFill size={25} />
          <span>Discord</span>
        </a>
      </div>

      <div className={styles.bottom}>
        <span>
          © {new Date().getFullYear()} CR0C Clan. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
