"use client";

import { useEffect } from "react";
import styles from "./ClanStatsModal.module.css";

type ClanStatsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  icon: string;
  title: string;
  description: string;
  details: readonly string[];
};

export default function ClanStatsModal({
  isOpen,
  onClose,
  icon,
  title,
  description,
  details,
}: ClanStatsModalProps) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="clan-stats-modal-title"
      >
        {/* Decorative glow */}
        <div className={styles.glow} aria-hidden="true" />

        {/* Close button */}
        <button
          type="button"
          className={styles.close}
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 4L4 12M4 4L12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Icon */}
        <div className={styles.iconWrap}>
          <span className={styles.icon}>{icon}</span>
        </div>

        {/* Title */}
        <h3 id="clan-stats-modal-title" className={styles.title}>
          {title}
        </h3>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Description */}
        <p className={styles.description}>{description}</p>

        {/* Details list */}
        {details.length > 0 && (
          <ul className={styles.details}>
            {details.map((detail, index) => (
              <li key={index} className={styles.detailItem}>
                <span className={styles.detailDot} aria-hidden="true" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
