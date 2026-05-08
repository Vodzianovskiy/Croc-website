import Link from "next/link";
import type { ModItem } from "@/types/mod";
import styles from "./mods.module.css";

type Props = {
  mod: ModItem;
};

function renderStars(rating: number) {
  if (rating >= 9) return "⭐⭐⭐⭐⭐";
  if (rating >= 8) return "⭐⭐⭐⭐☆";
  if (rating >= 7) return "⭐⭐⭐⭐☆";
  return "⭐⭐⭐☆☆";
}

export default function ModCard({ mod }: Props) {
  return (
    <article className={styles.card}>
      <Link href={`/mods/${mod.id}`} className={styles.cardMain}>
        <div className={styles.cardTop}>
          <div className={styles.cardIcon}>{mod.icon}</div>

          <div className={styles.cardInfo}>
            <h2 className={styles.cardTitle}>{mod.name}</h2>

            <div className={styles.ratingRow}>
              <span className={styles.stars}>{renderStars(mod.rating)}</span>
              <span className={styles.ratingValue}>{mod.rating}</span>
            </div>
          </div>
        </div>

        {mod.description ? (
          <p className={styles.cardDescription}>{mod.description}</p>
        ) : null}
      </Link>

      <div className={styles.cardActions}>
        <a
          href={mod.downloadUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.downloadBtn}
        >
          📥 Download
        </a>
      </div>
    </article>
  );
}
