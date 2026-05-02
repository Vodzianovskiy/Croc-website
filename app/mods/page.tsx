import { MODS_CONFIG } from "@/config/mods";
import ModCard from "./ModCard";
import styles from "./mods.module.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clan Mods",
  description:
    "Browse popular World of Tanks mods used by the CR0C clan, including mod packs and useful gameplay builds.",
  alternates: {
    canonical: "/mods",
  },
  openGraph: {
    title: "Clan Mods | CR0C Clan Portal",
    description:
      "Browse popular World of Tanks mods used by the CR0C clan, including mod packs and useful gameplay builds.",
    url: "/mods",
    type: "website",
    siteName: "CR0C Clan Portal",
    images: [
      {
        url: "/croc.jpg",
        width: 1200,
        height: 630,
        alt: "Clan Mods | CR0C Clan Portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clan Mods | CR0C Clan Portal",
    description:
      "Popular World of Tanks mods, mod packs, and useful gameplay builds used by the CR0C clan.",
    images: ["/croc.jpg"],
  },
};

export default function ModsPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>🎮 Моды для World of Tanks</h1>
          <p className={styles.subtitle}>
            Подборка популярных модпаков и полезных сборок для игры
          </p>
        </header>

        <section className={styles.grid}>
          {MODS_CONFIG.map((mod) => (
            <ModCard key={mod.id} mod={mod} />
          ))}
        </section>

        <div className={styles.disclaimer}>
          <span className={styles.disclaimerIcon}>⚠️</span>
          <p className={styles.disclaimerText}>
            Все моды взяты из открытых источников. Мы не являемся разработчиками
            этих модов и не несем ответственности за их работу. Устанавливайте
            моды на свой риск.
          </p>
        </div>
      </div>
    </main>
  );
}
