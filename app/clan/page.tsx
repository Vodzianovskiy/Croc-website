"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import Image from "next/image";
import { searchClans } from "@/services/clanService";
import type { ClanSearchResult } from "@/types/clan";
import styles from "./clan.module.css";

const RECENT_CLANS_KEY = "recent-clan-searches";
const MAX_RECENT = 5;

function saveRecentClan(clan: ClanSearchResult): ClanSearchResult[] {
  try {
    const raw = localStorage.getItem(RECENT_CLANS_KEY);
    const parsed: ClanSearchResult[] = raw ? JSON.parse(raw) : [];

    const next = [
      clan,
      ...parsed.filter((item) => item.clan_id !== clan.clan_id),
    ].slice(0, MAX_RECENT);

    localStorage.setItem(RECENT_CLANS_KEY, JSON.stringify(next));
    return next;
  } catch {
    return [];
  }
}

function loadRecentClans(): ClanSearchResult[] {
  try {
    const raw = localStorage.getItem(RECENT_CLANS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export default function ClanSearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ClanSearchResult[]>([]);
  const [recentClans, setRecentClans] = useState<ClanSearchResult[]>(() => {
    if (typeof window === "undefined") return [];
    return loadRecentClans();
  });
  const [isPending, startTransition] = useTransition();
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (!query.trim()) return;

    setError("");
    setSearched(false);

    startTransition(async () => {
      try {
        const data = await searchClans(query.trim());
        setResults(data);
        setSearched(true);
      } catch {
        setError("❌ Ошибка подключения к API");
      }
    });
  };

  const handleRecentClick = (clan: ClanSearchResult) => {
    const updated = saveRecentClan(clan);
    setRecentClans(updated);
  };

  return (
    <div className={styles.searchPage}>
      <div className={styles.searchHero}>
        <span className={styles.tag}>🐊 БАЗА ДАННЫХ</span>

        <h1 className={styles.searchTitle}>
          ПОИСК <span className={styles.accent}>КЛАНА</span>
        </h1>

        <p className={styles.searchSub}>
          Введи тег или название клана — получи полную статистику
        </p>

        <div className={styles.searchBar}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder="Например: CR0C"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            autoComplete="off"
            spellCheck={false}
          />

          <button
            className={styles.searchBtn}
            onClick={handleSearch}
            disabled={isPending}
          >
            {isPending ? <span className={styles.spinner} /> : "ПОИСК"}
          </button>
        </div>

        {recentClans.length > 0 ? (
          <div className={styles.recentWrap}>
            <span className={styles.recentTitle}>ПОСЛЕДНИЕ КЛАНЫ</span>

            <div className={styles.recentList}>
              {recentClans.map((clan) => (
                <Link
                  key={clan.clan_id}
                  href={`/clan/${clan.clan_id}`}
                  className={styles.recentChip}
                  onClick={() => handleRecentClick(clan)}
                >
                  [{clan.tag}]
                </Link>
              ))}
            </div>
          </div>
        ) : null}

        {error ? <p className={styles.errorMsg}>{error}</p> : null}
      </div>

      {searched ? (
        <div className={styles.resultsWrap}>
          {results.length === 0 ? (
            <p className={styles.noResults}>😔 Кланы не найдены</p>
          ) : (
            <div className={styles.resultsList}>
              {results.map((clan) => (
                <Link
                  key={clan.clan_id}
                  href={`/clan/${clan.clan_id}`}
                  className={styles.resultCard}
                  onClick={() => handleRecentClick(clan)}
                >
                  {clan.emblems?.x64?.portal ? (
                    <Image
                      src={clan.emblems.x64.portal}
                      alt={clan.tag}
                      width={44}
                      height={44}
                      className={styles.resultEmblem}
                      unoptimized
                    />
                  ) : (
                    <div className={styles.emblemPlaceholder}>🐊</div>
                  )}

                  <div className={styles.resultInfo}>
                    <span className={styles.resultTag}>[{clan.tag}]</span>
                    <span className={styles.resultName}>{clan.name}</span>
                  </div>

                  <span className={styles.resultMembers}>
                    👥 {clan.members_count}
                  </span>

                  <span className={styles.resultArrow}>→</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
