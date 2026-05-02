"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { MODS_CONFIG } from "@/config/mods";
import styles from "./mods.module.css";

type Props = {
  id: string;
};

export default function ModModalContent({ id }: Props) {
  const router = useRouter();
  const mod = MODS_CONFIG.find((item) => item.id === id);

  if (!mod) return null;

  return (
    <div
      className={styles.overlay}
      onClick={() => router.back()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="mod-modal-title"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTankInfo}>
            <div className={styles.detailsIcon}>{mod.icon}</div>

            <div>
              <span className={styles.modalTier}>MODPACK</span>
              <h1 id="mod-modal-title" className={styles.modalTitle}>
                {mod.name}
              </h1>
            </div>
          </div>

          <button
            type="button"
            className={styles.closeBtn}
            onClick={() => router.back()}
            aria-label="Закрыть"
          >
            ✕
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.section}>
            <span className={styles.sectionLabel}>Рейтинг</span>
            <div className={styles.wip}>
              <span className={styles.wipIcon}>⭐</span>
              <span className={styles.wipText}>{mod.rating} / 10</span>
            </div>
          </div>

          {mod.description ? (
            <div className={styles.section}>
              <span className={styles.sectionLabel}>Описание</span>
              <p className={styles.detailsDescription}>{mod.description}</p>
            </div>
          ) : null}

          <div className={styles.section}>
            <span className={styles.sectionLabel}>Действия</span>

            <div className={styles.detailsActions}>
              <a
                href={mod.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.downloadBtn}
              >
                📥 Завантажити
              </a>
            </div>
          </div>

          <div className={styles.disclaimer}>
            <span className={styles.disclaimerIcon}>⚠️</span>
            <p className={styles.disclaimerText}>
              Все моды взяты из открытых источников. Устанавливайте на свой
              риск.
            </p>
          </div>

          <div className={styles.detailsBottom}>
            <Link href="/mods" className={styles.backBtn}>
              ← Назад до всіх модів
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
