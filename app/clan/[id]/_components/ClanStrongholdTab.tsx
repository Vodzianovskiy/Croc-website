import styles from "../clan-detail.module.css";
import type { ClanStrongholdInfo } from "@/types/clan";

function formatDateShort(unix?: number) {
  if (!unix) return "—";

  return new Date(unix * 1000).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function calcWinrate(wins?: number, total?: number) {
  if (!wins || !total) return 0;
  return Number(((wins / total) * 100).toFixed(1));
}

function getWrColor(winrate: number) {
  if (winrate >= 55) return "#00ff88";
  if (winrate >= 50) return "#f5f504";
  return "#ff4d4d";
}

function StrongholdTierCard({
  tierLabel,
  total,
  wins,
  loses,
  lastTime,
}: {
  tierLabel: string;
  total: number;
  wins: number;
  loses: number;
  lastTime: number;
}) {
  const winrate = calcWinrate(wins, total);
  const wrColor = getWrColor(winrate);

  return (
    <div className={styles.tierCard}>
      <div className={styles.tierHeader}>
        <span className={styles.tierTitle}>{tierLabel}</span>
        <span className={styles.tierSubLabel}>Всего боёв</span>
      </div>

      <span className={styles.tierBattles}>{total}</span>

      <div>
        <div className={styles.wrRow}>
          <span className={styles.wrLabel}>WR</span>
          <span className={styles.wrValue} style={{ color: wrColor }}>
            {winrate}%
          </span>
        </div>

        <div className={styles.wrBarTrack}>
          <div
            className={styles.wrBarFill}
            style={{
              width: `${winrate}%`,
              background: wrColor,
              boxShadow: `0 0 6px ${wrColor}88`,
            }}
          />
        </div>
      </div>

      <div className={styles.tierStatsRow}>
        <div className={`${styles.tierMini} ${styles.tierMiniWins}`}>
          <div className={styles.tierMiniLabel}>Победы</div>
          <div className={styles.tierMiniValue}>{wins}</div>
        </div>

        <div className={`${styles.tierMini} ${styles.tierMiniLoses}`}>
          <div className={styles.tierMiniLabel}>Поражения</div>
          <div className={styles.tierMiniValue}>{loses}</div>
        </div>
      </div>

      <div className={styles.tierLastBattle}>
        Последний бой: {formatDateShort(lastTime)}
      </div>
    </div>
  );
}

function pickStrongholdBuildings(stronghold: ClanStrongholdInfo | null) {
  if (!stronghold) {
    return { financial: null, freeXp: null };
  }

  const financial =
    stronghold.building_slots.find(
      (building) =>
        building.reserve_title === "BATTLE_PAYMENTS" ||
        building.building_title === "Financial Unit",
    ) ?? null;

  const freeXp =
    stronghold.building_slots.find(
      (building) =>
        building.reserve_title === "MILITARY_MANEUVERS" ||
        building.building_title === "Military School",
    ) ?? null;

  return { financial, freeXp };
}

interface ClanStrongholdTabProps {
  stronghold: ClanStrongholdInfo | null;
}

export default function ClanStrongholdTab({
  stronghold,
}: ClanStrongholdTabProps) {
  if (!stronghold) {
    return (
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionAccentBar} />
          <span className={styles.sectionTitle}>🏰 Укрепрайон</span>
        </div>

        <div className={styles.descriptionCard}>
          <p className={styles.descriptionText}>
            Данные по укрепрайону отсутствуют.
          </p>
        </div>
      </section>
    );
  }

  const { financial, freeXp } = pickStrongholdBuildings(stronghold);

  return (
    <>
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionAccentBar} />
          <span className={styles.sectionTitle}>🏰 Укрепрайон</span>
        </div>

        <div className={styles.strongholdPills}>
          <div className={styles.ratingPill}>
            <span className={styles.ratingPillLabel}>Уровень укрепа</span>
            <span className={styles.ratingPillValue}>
              LVL {stronghold.stronghold_level}
            </span>
          </div>

          <div className={styles.ratingPill}>
            <span className={styles.ratingPillLabel}>Фин. резерв</span>
            <span className={styles.ratingPillValue}>
              {financial ? `Lvl ${financial.building_level}` : "—"}
            </span>
          </div>

          <div className={styles.ratingPill}>
            <span className={styles.ratingPillLabel}>
              Резерв на свободный опыт
            </span>
            <span className={styles.ratingPillValue}>
              {freeXp ? `Lvl ${freeXp.building_level}` : "—"}
            </span>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionAccentBar} />
          <span className={styles.sectionTitle}>⚔️ Вылазки по уровням</span>
        </div>

        <div className={styles.tierGrid}>
          <StrongholdTierCard
            tierLabel="VI уровень"
            total={stronghold.skirmish_statistics.total_6}
            wins={stronghold.skirmish_statistics.win_6}
            loses={stronghold.skirmish_statistics.lose_6}
            lastTime={stronghold.skirmish_statistics.last_time_6}
          />

          <StrongholdTierCard
            tierLabel="VIII уровень"
            total={stronghold.skirmish_statistics.total_8}
            wins={stronghold.skirmish_statistics.win_8}
            loses={stronghold.skirmish_statistics.lose_8}
            lastTime={stronghold.skirmish_statistics.last_time_8}
          />

          <StrongholdTierCard
            tierLabel="X уровень"
            total={stronghold.skirmish_statistics.total_10}
            wins={stronghold.skirmish_statistics.win_10}
            loses={stronghold.skirmish_statistics.lose_10}
            lastTime={stronghold.skirmish_statistics.last_time_10}
          />
        </div>
      </section>
    </>
  );
}
