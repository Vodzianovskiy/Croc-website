"use client";

import { useState } from "react";
import styles from "./clan-tabs.module.css";

type TabKey = "overview" | "players" | "stronghold";

interface ClanTabsProps {
  overview: React.ReactNode;
  players: React.ReactNode;
  stronghold: React.ReactNode;
}

export default function ClanTabs({
  overview,
  players,
  stronghold,
}: ClanTabsProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  return (
    <div>
      <div className={styles.tabs}>
        <button
          type="button"
          className={`${styles.tabButton} ${
            activeTab === "overview" ? styles.tabButtonActive : ""
          }`}
          onClick={() => setActiveTab("overview")}
        >
          🏆 Обзор
        </button>

        <button
          type="button"
          className={`${styles.tabButton} ${
            activeTab === "players" ? styles.tabButtonActive : ""
          }`}
          onClick={() => setActiveTab("players")}
        >
          👥 Игроки
        </button>

        <button
          type="button"
          className={`${styles.tabButton} ${
            activeTab === "stronghold" ? styles.tabButtonActive : ""
          }`}
          onClick={() => setActiveTab("stronghold")}
        >
          🏰 Укрепрайон
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === "overview" ? overview : null}
        {activeTab === "players" ? players : null}
        {activeTab === "stronghold" ? stronghold : null}
      </div>
    </div>
  );
}
