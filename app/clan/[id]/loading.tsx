import styles from "./clan-loading.module.css";

export default function ClanDetailLoading() {
  return (
    <div className={styles.page} aria-busy="true" aria-live="polite">
      <div className={styles.pageInner}>
        <div className={styles.cardHeaderRow}>
          <div className={styles.backChip}>
            <span className={styles.backArrow}>←</span>
            <span>Загрузка клана...</span>
          </div>
        </div>

        <div className={styles.headerCard}>
          <div className={styles.emblemSkeleton} />

          <div className={styles.headerInfo}>
            <div className={styles.nameRow}>
              <div className={styles.tagSkeleton} />
              <div className={styles.nameSkeleton} />
            </div>

            <div className={styles.metaRow}>
              <div className={styles.metaSkeleton} />
              <div className={styles.metaSep} />
              <div className={styles.metaSkeleton} />
              <div className={styles.metaSep} />
              <div className={styles.metaSkeleton} />
            </div>

            <div className={styles.statusSkeleton} />
            <div className={styles.mottoSkeleton} />
          </div>

          <div className={styles.wgBtnSkeleton} />
        </div>

        <div className={styles.tabs}>
          <div className={`${styles.tabButton} ${styles.tabButtonActive}`}>
            🏆 Обзор
          </div>
          <div className={styles.tabButton}>👥 Игроки</div>
          <div className={styles.tabButton}>🏰 Укрепрайон</div>
        </div>

        <div className={styles.tabContent}>
          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionAccentBar} />
              <div className={styles.sectionTitleSkeleton} />
            </div>

            <div className={styles.pillsGrid}>
              <div className={styles.ratingPill}>
                <div className={styles.pillLabelSkeleton} />
                <div className={styles.pillValueSkeleton} />
                <div className={styles.pillFooterSkeleton} />
              </div>

              <div className={styles.ratingPill}>
                <div className={styles.pillLabelSkeleton} />
                <div className={styles.pillValueSkeleton} />
                <div className={styles.pillFooterSkeleton} />
              </div>

              <div className={styles.ratingPill}>
                <div className={styles.pillLabelSkeleton} />
                <div className={styles.pillValueSkeleton} />
                <div className={styles.pillFooterSkeleton} />
              </div>
            </div>
          </section>

          <section className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionAccentBar} />
              <div className={styles.sectionTitleSkeleton} />
            </div>

            <div className={styles.descriptionCard}>
              <div className={styles.descriptionLine} />
              <div className={styles.descriptionLine} />
              <div
                className={`${styles.descriptionLine} ${styles.descriptionLineShort}`}
              />
            </div>
          </section>
        </div>

        <p className={styles.loadingText}>
          Подожди немного, загружаем данные из WG API...
        </p>
      </div>
    </div>
  );
}
