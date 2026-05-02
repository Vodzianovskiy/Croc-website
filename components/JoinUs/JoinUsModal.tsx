"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import {
  searchPlayer,
  getPlayerStats,
  getPlayerTanks,
  getTanksByTier,
} from "@/services/wotService";
import { WotPlayer, WotPlayerStats, PlayerTankWithInfo } from "@/types/wot";
import styles from "./JoinUs.module.css";

const MIN_WINRATE = 48;
const MIN_BATTLES = 2500;

type TierTab = 10 | 8;

type JoinUsModalProps = {
  onClose: () => void;
};

const validationSchema = Yup.object({
  nickname: Yup.string()
    .min(3, "Минимум 3 символа")
    .max(24, "Максимум 24 символа")
    .required("Введи никнейм"),
});

export default function JoinUsModal({ onClose }: JoinUsModalProps) {
  const [players, setPlayers] = useState<WotPlayer[]>([]);
  const [searchError, setSearchError] = useState("");
  const [selected, setSelected] = useState<WotPlayer | null>(null);
  const [stats, setStats] = useState<WotPlayerStats | null>(null);
  const [tanks10, setTanks10] = useState<PlayerTankWithInfo[]>([]);
  const [tanks8, setTanks8] = useState<PlayerTankWithInfo[]>([]);
  const [activeTier, setActiveTier] = useState<TierTab>(10);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const winRate = stats
    ? parseFloat(((stats.wins / stats.battles) * 100).toFixed(2))
    : 0;

  const isWinRateOk = winRate >= MIN_WINRATE;
  const isBattlesOk = stats ? stats.battles >= MIN_BATTLES : false;

  const formik = useFormik({
    initialValues: { nickname: "" },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSearchError("");
      setPlayers([]);
      setSelected(null);
      setStats(null);
      setTanks10([]);
      setTanks8([]);

      try {
        const result = await searchPlayer(values.nickname.trim());
        if (result.length === 0) {
          setSearchError("Игрок не найден. Проверь никнейм.");
        } else {
          setPlayers(result);
        }
      } catch {
        setSearchError("Ошибка при поиске. Попробуй позже.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleSelectPlayer = async (player: WotPlayer) => {
    setSelected(player);
    setPlayers([]);
    setLoadingProfile(true);

    try {
      const [playerStats, playerTanks] = await Promise.all([
        getPlayerStats(player.account_id),
        getPlayerTanks(player.account_id),
      ]);

      setStats(playerStats);

      const tankIds = playerTanks.map((t) => t.tank_id);

      const [tier10, tier8] = await Promise.all([
        getTanksByTier(tankIds, 10),
        getTanksByTier(tankIds, 8),
      ]);

      setTanks10(tier10.map((t) => ({ ...t, selected: false })));
      setTanks8(tier8.map((t) => ({ ...t, selected: false })));
    } catch {
      setSearchError("Ошибка загрузки профиля. Попробуй позже.");
    } finally {
      setLoadingProfile(false);
    }
  };

  const toggleTank = (tank_id: number, tier: TierTab) => {
    if (tier === 10) {
      setTanks10((prev) =>
        prev.map((t) =>
          t.tank_id === tank_id ? { ...t, selected: !t.selected } : t,
        ),
      );
    } else {
      setTanks8((prev) =>
        prev.map((t) =>
          t.tank_id === tank_id ? { ...t, selected: !t.selected } : t,
        ),
      );
    }
  };

  const handleClose = () => {
    setSearchError("");
    setPlayers([]);
    setSelected(null);
    setStats(null);
    setTanks10([]);
    setTanks8([]);
    setActiveTier(10);
    setSent(false);
    formik.resetForm();
    onClose();
  };

  const activeTanks = activeTier === 10 ? tanks10 : tanks8;

  const handleApply = async () => {
    if (!selected || !stats) return;

    setSending(true);
    try {
      const res = await fetch("/api/discord", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickname: selected.nickname,
          account_id: selected.account_id,
          winRate,
          battles: stats.battles,
          tanks10,
          tanks8,
        }),
      });

      if (res.status === 429) {
        setSearchError("Лимит заявок: максимум 3 в день. Попробуй завтра.");
        return;
      }

      if (!res.ok) {
        setSearchError("Ошибка отправки заявки. Попробуй позже.");
        return;
      }

      setSent(true);
    } catch {
      setSearchError("Ошибка отправки заявки. Попробуй позже.");
    } finally {
      setSending(false);
    }
  };

  const selectedCount =
    tanks10.filter((t) => t.selected).length +
    tanks8.filter((t) => t.selected).length;

  const canApply = isWinRateOk && isBattlesOk && selectedCount > 0;

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div
        className={`${styles.modal} ${selected && stats && !loadingProfile ? styles.modalWide : ""}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Вступить в CR0C"
      >
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>
            Вступить в CR<span className={styles.zero}>0</span>C
          </h2>
          <button
            className={styles.closeBtn}
            onClick={handleClose}
            aria-label="Закрыть"
          >
            ✕
          </button>
        </div>

        <p className={styles.modalDesc}>
          Введи свой никнейм в World of Tanks — мы проверим твои stats.
        </p>

        <form className={styles.form} onSubmit={formik.handleSubmit}>
          <div className={styles.inputWrapper}>
            <input
              className={`${styles.input} ${
                formik.touched.nickname && formik.errors.nickname
                  ? styles.inputError
                  : ""
              }`}
              type="text"
              name="nickname"
              placeholder="Твой никнейм..."
              value={formik.values.nickname}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              autoFocus
            />
            {formik.touched.nickname && formik.errors.nickname && (
              <span className={styles.fieldError}>
                {formik.errors.nickname}
              </span>
            )}
          </div>
          <button
            className={styles.searchBtn}
            type="submit"
            disabled={formik.isSubmitting}
          >
            {formik.isSubmitting ? "Поиск..." : "Найти"}
          </button>
        </form>

        {searchError && <p className={styles.error}>{searchError}</p>}

        {players.length > 0 && (
          <div className={styles.results}>
            <p className={styles.resultsLabel}>Выбери аккаунт:</p>
            {players.map((player) => (
              <button
                key={player.account_id}
                className={styles.playerCard}
                onClick={() => handleSelectPlayer(player)}
              >
                <span className={styles.playerName}>{player.nickname}</span>
                <span className={styles.playerId}>ID: {player.account_id}</span>
              </button>
            ))}
          </div>
        )}

        {loadingProfile && (
          <div className={styles.loading}>
            <span className={styles.spinner} />
            Загружаем профиль...
          </div>
        )}

        {selected && stats && !loadingProfile && (
          <div className={styles.profile}>
            <p className={styles.profileName}>{selected.nickname}</p>

            <div className={styles.statsTable}>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Процент побед</span>
                <span className={styles.statMin}>мин. {MIN_WINRATE}%</span>
                <span
                  className={`${styles.statValue} ${isWinRateOk ? styles.statOk : styles.statFail}`}
                >
                  {winRate}%
                </span>
              </div>
              <div className={styles.statRow}>
                <span className={styles.statLabel}>Количество боёв</span>
                <span className={styles.statMin}>
                  мин. {MIN_BATTLES.toLocaleString()}
                </span>
                <span
                  className={`${styles.statValue} ${isBattlesOk ? styles.statOk : styles.statFail}`}
                >
                  {stats.battles.toLocaleString()}
                </span>
              </div>
            </div>

            <div className={styles.tanksSection}>
              <p className={styles.tanksLabel}>
                Отметь технику которая у тебя есть:
              </p>

              <div className={styles.tierTabs}>
                <button
                  type="button"
                  className={`${styles.tierTab} ${activeTier === 10 ? styles.tierTabActive : ""}`}
                  onClick={() => setActiveTier(10)}
                >
                  X уровень
                  <span className={styles.tierCount}>{tanks10.length}</span>
                </button>
                <button
                  type="button"
                  className={`${styles.tierTab} ${activeTier === 8 ? styles.tierTabActive : ""}`}
                  onClick={() => setActiveTier(8)}
                >
                  VIII уровень
                  <span className={styles.tierCount}>{tanks8.length}</span>
                </button>
              </div>

              {activeTanks.length > 0 ? (
                <div className={styles.tanksGrid}>
                  {activeTanks.map((tank) => (
                    <button
                      key={tank.tank_id}
                      type="button"
                      className={`${styles.tankItem} ${tank.selected ? styles.tankSelected : ""}`}
                      onClick={() => toggleTank(tank.tank_id, activeTier)}
                      title={tank.name}
                    >
                      <Image
                        src={tank.images.big_icon}
                        alt={tank.name}
                        width={100}
                        height={50}
                        className={styles.tankImg}
                        loading="lazy"
                      />
                      <span className={styles.tankName}>{tank.name}</span>
                      {tank.selected && (
                        <span className={styles.tankCheck}>✓</span>
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <p className={styles.noTanks}>
                  Нет танков {activeTier === 10 ? "X" : "VIII"} уровня
                </p>
              )}
            </div>

            {sent ? (
              <div className={styles.sentMsg}>
                ✅ Заявка отправлена! Ожидай ответа в Discord.
              </div>
            ) : (
              <button
                className={styles.applyBtn}
                disabled={!canApply || sending}
                onClick={handleApply}
                title={
                  !canApply
                    ? selectedCount === 0
                      ? "Выбери хотя бы один танк"
                      : "Не соответствуешь требованиям"
                    : ""
                }
              >
                {sending
                  ? "Отправляем..."
                  : !isWinRateOk || !isBattlesOk
                    ? "Не соответствуешь требованиям"
                    : selectedCount === 0
                      ? "Выбери хотя бы один танк"
                      : "Отправить заявку"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
