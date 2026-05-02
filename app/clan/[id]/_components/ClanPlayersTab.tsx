"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "../clan-detail.module.css";
import ClanPlayersPagination from "./ClanPlayersPagination";
import type { ClanMember } from "@/types/clan";
import { getPlayerStrongholdStats } from "@/services/wotService";
import type { WotStrongholdStats } from "@/types/wot";

interface ClanPlayersTabProps {
  members: ClanMember[];
}

const PAGE_SIZE = 10;
const PAGE_LOAD_DELAY = 120;
const PREFETCH_DELAY = 500;
const MAX_CONCURRENT_REQUESTS = 3;

type StrongholdStatsMap = Record<number, WotStrongholdStats | null>;
type LoadingMap = Record<number, boolean>;

function formatNumber(value: number): string {
  return value.toLocaleString("ru-RU");
}

async function runBatchedRequests<T>(
  items: T[],
  batchSize: number,
  handler: (item: T) => Promise<void>,
) {
  for (let i = 0; i < items.length; i += batchSize) {
    const chunk = items.slice(i, i + batchSize);
    await Promise.all(chunk.map(handler));
  }
}

export default function ClanPlayersTab({ members }: ClanPlayersTabProps) {
  const [page, setPage] = useState(0);
  const [stats, setStats] = useState<StrongholdStatsMap>({});
  const [loading, setLoading] = useState<LoadingMap>({});
  const [isMobile, setIsMobile] = useState(false);
  const [isCurrentPageLoading, setIsCurrentPageLoading] = useState(false);
  const [isPrefetchingNextPage, setIsPrefetchingNextPage] = useState(false);

  const statsRef = useRef<StrongholdStatsMap>({});
  const inFlightRef = useRef<Set<number>>(new Set());

  useEffect(() => {
    statsRef.current = stats;
  }, [stats]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 700px)");
    const update = () => setIsMobile(media.matches);

    update();
    media.addEventListener("change", update);

    return () => media.removeEventListener("change", update);
  }, []);

  const sortedMembers = useMemo(
    () =>
      [...members].sort((a, b) =>
        a.account_name.localeCompare(b.account_name, "ru"),
      ),
    [members],
  );

  const pageCount = Math.ceil(sortedMembers.length / PAGE_SIZE);

  const currentItems = useMemo(
    () => sortedMembers.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE),
    [sortedMembers, page],
  );

  const nextPageItems = useMemo(() => {
    const nextPage = page + 1;
    if (nextPage >= pageCount) return [];

    return sortedMembers.slice(
      nextPage * PAGE_SIZE,
      nextPage * PAGE_SIZE + PAGE_SIZE,
    );
  }, [sortedMembers, page, pageCount]);

  const loadMembersStats = async (
    membersToLoad: ClanMember[],
    mode: "current" | "prefetch",
  ) => {
    const uniqueMembers = membersToLoad.filter((member) => {
      const id = member.account_id;
      return statsRef.current[id] === undefined && !inFlightRef.current.has(id);
    });

    if (uniqueMembers.length === 0) {
      if (mode === "current") setIsCurrentPageLoading(false);
      if (mode === "prefetch") setIsPrefetchingNextPage(false);
      return;
    }

    if (mode === "current") setIsCurrentPageLoading(true);
    if (mode === "prefetch") setIsPrefetchingNextPage(true);

    uniqueMembers.forEach((member) => {
      inFlightRef.current.add(member.account_id);
    });

    setLoading((prev) => ({
      ...prev,
      ...Object.fromEntries(uniqueMembers.map((m) => [m.account_id, true])),
    }));

    await runBatchedRequests(
      uniqueMembers,
      MAX_CONCURRENT_REQUESTS,
      async (member) => {
        const id = member.account_id;

        try {
          const strongholdStats = await getPlayerStrongholdStats(id);

          setStats((prev) => {
            const next = { ...prev, [id]: strongholdStats };
            statsRef.current = next;
            return next;
          });
        } catch {
          setStats((prev) => {
            const next = { ...prev, [id]: null };
            statsRef.current = next;
            return next;
          });
        } finally {
          inFlightRef.current.delete(id);

          setLoading((prev) => ({
            ...prev,
            [id]: false,
          }));
        }
      },
    );

    if (mode === "current") setIsCurrentPageLoading(false);
    if (mode === "prefetch") setIsPrefetchingNextPage(false);
  };

  useEffect(() => {
    let cancelled = false;

    const hasUnloadedPlayers = currentItems.some(
      (member) => statsRef.current[member.account_id] === undefined,
    );

    if (!hasUnloadedPlayers) {
      setIsCurrentPageLoading(false);
      return;
    }

    const timer = window.setTimeout(async () => {
      if (cancelled) return;
      await loadMembersStats(currentItems, "current");
    }, PAGE_LOAD_DELAY);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [currentItems]);

  useEffect(() => {
    if (isCurrentPageLoading) return;
    if (nextPageItems.length === 0) return;

    let cancelled = false;

    const timer = window.setTimeout(async () => {
      if (cancelled) return;
      await loadMembersStats(nextPageItems, "prefetch");
    }, PREFETCH_DELAY);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
    };
  }, [nextPageItems, isCurrentPageLoading]);

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionAccentBar} />
        <span className={styles.sectionTitle}>👥 Игроки</span>
      </div>

      {sortedMembers.length === 0 ? (
        <div className={styles.descriptionCard}>
          <p className={styles.descriptionText}>
            В клане пока нет игроков или данные недоступны.
          </p>
        </div>
      ) : (
        <>
          {isCurrentPageLoading ? (
            <div className={styles.playersLoadingNote}>
              <span className={styles.playersLoadingDot} />
              <span>Загружаем текущую страницу игроков...</span>
            </div>
          ) : null}

          {!isCurrentPageLoading && isPrefetchingNextPage ? (
            <div className={styles.playersLoadingNote}>
              <span className={styles.playersLoadingDot} />
              <span>Подготавливаем следующую страницу...</span>
            </div>
          ) : null}

          <div className={styles.playersTable}>
            <div className={styles.playersHead}>
              <span>Никнейм</span>
              <span>Роль</span>
              <span className={styles.playersHeadRight}>Клановые бои</span>
              <span className={styles.playersHeadRight}>WN8</span>
            </div>

            {currentItems.map((member, index) => {
              const globalIndex = page * PAGE_SIZE + index + 1;
              const strongholdStats = stats[member.account_id];
              const isLoading = loading[member.account_id];
              const battles =
                strongholdStats?.battles != null ? strongholdStats.battles : 0;

              return (
                <div
                  key={member.account_id}
                  className={`${styles.playerRow} ${
                    isLoading ? styles.playerRowLoading : ""
                  }`}
                >
                  <div className={styles.playerMain}>
                    <span className={styles.playerIndex}>{globalIndex}</span>
                    <span className={styles.playerDot} />
                    <span className={styles.playerName}>
                      {member.account_name}
                    </span>
                  </div>

                  <div className={styles.playerRole}>
                    {member.role_i18n || member.role}
                  </div>

                  <div className={styles.playerBattles}>
                    {isLoading && strongholdStats === undefined ? (
                      <span className={styles.playerBattlesLoading}>
                        <span className={styles.playerSkeletonText} />
                      </span>
                    ) : battles > 0 ? (
                      formatNumber(battles)
                    ) : (
                      "—"
                    )}
                  </div>

                  <div
                    className={styles.playerWn8}
                    style={{ color: "#4a6852", textShadow: "none" }}
                  >
                    —
                  </div>
                </div>
              );
            })}
          </div>

          <ClanPlayersPagination
            page={page}
            pageCount={pageCount}
            isMobile={isMobile}
            isDisabled={isCurrentPageLoading}
            onPageChange={(selectedPage) => {
              const nextItems = sortedMembers.slice(
                selectedPage * PAGE_SIZE,
                selectedPage * PAGE_SIZE + PAGE_SIZE,
              );

              const hasUnloadedPlayers = nextItems.some(
                (member) => statsRef.current[member.account_id] === undefined,
              );

              if (hasUnloadedPlayers) {
                setIsCurrentPageLoading(true);
              }

              setPage(selectedPage);
            }}
          />
        </>
      )}
    </section>
  );
}
