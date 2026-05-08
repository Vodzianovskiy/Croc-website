import styles from "../clan-detail.module.css";
import type { ClanRating, RatingField } from "@/types/clan";

function RatingPill({
  label,
  value,
  field,
}: {
  label: string;
  value: string;
  field?: RatingField;
}) {
  const delta = field?.rank_delta;
  const hasDelta = delta != null && delta !== 0;

  return (
    <div className={styles.ratingPill}>
      <span className={styles.ratingPillLabel}>{label}</span>
      <span className={styles.ratingPillValue}>{value}</span>

      <div className={styles.ratingPillFooter}>
        {field?.rank ? (
          <span className={styles.ratingPillRank}>#{field.rank}</span>
        ) : null}

        {hasDelta ? (
          <span className={delta > 0 ? styles.deltaUp : styles.deltaDown}>
            {delta > 0 ? `▲ ${delta}` : `▼ ${Math.abs(delta)}`}
          </span>
        ) : null}
      </div>
    </div>
  );
}

interface ClanOverviewTabProps {
  rating: ClanRating | null;
  description?: string;
}

export default function ClanOverviewTab({
  rating,
  description,
}: ClanOverviewTabProps) {
  return (
    <>
      {rating ? (
        <>
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionAccentBar} />
              <span className={styles.sectionTitle}>🗺 Global Map</span>
            </div>

            <div className={styles.pillsGrid}>
              <RatingPill
                label="ELO X"
                value={rating.gm_elo_rating_10?.value?.toFixed(0) ?? "—"}
                field={rating.gm_elo_rating_10}
              />
              <RatingPill
                label="ELO VIII"
                value={rating.gm_elo_rating_8?.value?.toFixed(0) ?? "—"}
                field={rating.gm_elo_rating_8}
              />
              <RatingPill
                label="ELO VI"
                value={rating.gm_elo_rating_6?.value?.toFixed(0) ?? "—"}
                field={rating.gm_elo_rating_6}
              />
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionAccentBar} />
              <span className={styles.sectionTitle}>⚔️ Stronghold</span>
            </div>

            <div className={styles.pillsGrid}>
              <RatingPill
                label="ELO X"
                value={rating.fb_elo_rating_10?.value?.toFixed(0) ?? "—"}
                field={rating.fb_elo_rating_10}
              />
              <RatingPill
                label="ELO VIII"
                value={rating.fb_elo_rating_8?.value?.toFixed(0) ?? "—"}
                field={rating.fb_elo_rating_8}
              />
              <RatingPill
                label="ELO VI"
                value={rating.fb_elo_rating_6?.value?.toFixed(0) ?? "—"}
                field={rating.fb_elo_rating_6}
              />
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionAccentBar} />
              <span className={styles.sectionTitle}>📊 Overall Statistics</span>
            </div>

            <div className={styles.pillsGrid}>
              <RatingPill
                label="Win Rate"
                value={
                  rating.wins_ratio_avg?.value !== undefined
                    ? `${rating.wins_ratio_avg.value.toFixed(2)}%`
                    : "—"
                }
                field={rating.wins_ratio_avg}
              />
              <RatingPill
                label="Efficiency"
                value={rating.efficiency?.value?.toFixed(0) ?? "—"}
                field={rating.efficiency}
              />
              <RatingPill
                label="Avg. Battles"
                value={rating.battles_count_avg?.value?.toFixed(0) ?? "—"}
                field={rating.battles_count_avg}
              />
            </div>
          </section>
        </>
      ) : null}

      {description?.trim() ? (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionAccentBar} />
            <span className={styles.sectionTitle}>Clan Description</span>
          </div>

          <div className={styles.descriptionCard}>
            <p className={styles.descriptionText}>{description}</p>
          </div>
        </section>
      ) : null}
    </>
  );
}
