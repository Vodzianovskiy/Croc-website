"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MODS_CONFIG } from "@/config/mods";
import styles from "@/app/mods/mods.module.css";

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating / 2);
  const half = rating % 2 >= 1 ? 1 : 0;
  const empty = 5 - full - half;

  return (
    <div className={styles.ratingRow}>
      <span className={styles.stars}>
        {"⭐".repeat(full)}
        {half ? "✨" : ""}
        {"☆".repeat(empty)}
      </span>
      <span className={styles.ratingValue}>{rating}</span>
    </div>
  );
}

export default function ModsPreviewModal() {
  const router = useRouter();

  return (
    <div
      className={styles.overlay}
      onClick={() => router.back()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="mods-modal-title"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div>
            <h1 id="mods-modal-title" className={styles.modalTitle}>
              🎮 World of Tanks Mods
            </h1>
          </div>

          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => router.back()}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.modsGrid}>
            {MODS_CONFIG.map((mod) => (
              <div key={mod.id} className={styles.modItem}>
                <div className={styles.modTop}>
                  <span className={styles.modIcon}>{mod.icon}</span>

                  <div className={styles.modInfo}>
                    <h3 className={styles.modName}>{mod.name}</h3>
                    <StarRating rating={mod.rating} />
                  </div>
                </div>

                <div className={styles.modActions}>
                  <a
                    href={mod.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.downloadBtn}
                  >
                    📥 Download
                  </a>

                  <Link href={`/mods/${mod.id}`} className={styles.backBtn}>
                    Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.disclaimer}>
            <span className={styles.disclaimerIcon}>⚠️</span>
            <p className={styles.disclaimerText}>
              All mods are sourced from open sources. We are not the developers
              of these mods and are not responsible for their functionality.
              Install mods at your own risk!
            </p>
          </div>

          <div className={styles.detailsBottom}>
            <Link href="/mods" className={styles.backBtn}>
              Open all mods as a page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
