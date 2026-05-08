"use client";

import { useState } from "react";
import styles from "./ClanStatsClick.module.css";
import ClanStatsModal from "../ClanStatsModal/ClanStatsModal";
import {
  features,
  clanStatsContent,
  ClanStatsKey,
} from "@/config/clanStatsContent";

export default function ClanStatsClick() {
  const [selectedItem, setSelectedItem] = useState<ClanStatsKey | null>(null);

  const handleOpen = (label: ClanStatsKey) => {
    setSelectedItem(label);
  };

  const handleClose = () => {
    setSelectedItem(null);
  };

  return (
    <>
      <div className={styles.features}>
        {features.map(({ icon, label }) => (
          <div
            key={label}
            className={styles.feature}
            onClick={() => handleOpen(label)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleOpen(label);
              }
            }}
          >
            <span className={styles.featureIcon}>{icon}</span>
            <span className={styles.featureLabel}>{label}</span>
          </div>
        ))}
      </div>

      <ClanStatsModal
        isOpen={selectedItem !== null}
        onClose={handleClose}
        icon={selectedItem ? clanStatsContent[selectedItem].icon : ""}
        title={selectedItem ? clanStatsContent[selectedItem].title : ""}
        description={
          selectedItem ? clanStatsContent[selectedItem].description : ""
        }
        details={selectedItem ? clanStatsContent[selectedItem].details : []}
      />
    </>
  );
}
