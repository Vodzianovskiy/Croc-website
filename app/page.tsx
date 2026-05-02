import JoinUs from "../components/JoinUs/JoinUs";
import { getClanTanks } from "@/services/clanService";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import HeroCroc from "../components/HeroCroc/HeroCroc";
import { Fragment } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Home | CR0C Clan Portal",
  },
  description:
    "Homepage of the CR0C World of Tanks clan. Learn about the clan, see key vehicles, check activity and requirements, and access mods and recruitment.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Home | CR0C Clan Portal",
    description:
      "Official homepage of the CR0C World of Tanks clan with clan overview, vehicles, recruitment access, and mod resources.",
    url: "/",
    images: [
      {
        url: "/croc.jpg",
        width: 1200,
        height: 630,
        alt: "Home | CR0C Clan Portal",
      },
    ],
    type: "website",
    siteName: "CR0C Clan Portal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Home | CR0C Clan Portal",
    description:
      "CR0C clan homepage with clan overview, vehicles, recruitment access, and mod resources.",
    images: ["/croc.jpg"],
  },
};

export default async function Home() {
  const clanTanks = await getClanTanks();

  return (
    <div className={styles.page}>
      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          {/* Левая часть */}
          <div className={styles.heroContent}>
            <span className={styles.tag}>🌍 European Clan · WoT</span>

            <h1 className={styles.heroTitle}>
              CR<span className={styles.zero}>0</span>C
            </h1>

            <p className={styles.heroSub}>
              Мы не просто клан — мы команда. Дисциплина, тактика и победы на
              всех фронтах. Глобальная карта, турниры, маневры — каждый бой с
              нами.
            </p>

            <div className={styles.heroBtns}>
              <Link href="/mods-preview" className={styles.modsBtn}>
                📥 Скачать моды
              </Link>

              <JoinUs />

              <a
                href="https://discord.gg/ВАШ_ЛИНК"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.discordBtn}
              >
                Discord →
              </a>
            </div>
          </div>

          {/* Правая часть */}
          <div className={styles.heroImageWrap}>
            <HeroCroc />
          </div>
        </div>

        {/* Статы клана */}
        <div className={styles.heroStats}>
          {[
            { num: "100+", label: "Игроков" },
            { num: "3×", label: "в неделю" },
            { num: "X лвл", label: "Техника" },
            { num: "ГК", label: "Глобальная карта" },
            { num: "⚔️", label: "Маневры" },
          ].map(({ num, label }, i, arr) => (
            <Fragment key={label}>
              <div className={styles.heroStat}>
                <span className={styles.heroStatNum}>{num}</span>
                <span className={styles.heroStatLabel}>{label}</span>
              </div>

              {i < arr.length - 1 && <div className={styles.heroStatDivider} />}
            </Fragment>
          ))}
        </div>
      </section>

      {/* ABOUT + TANKS */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {/* О КЛАНЕ */}
            <div className={styles.aboutBlock}>
              <h2 className={styles.sectionTitle}>О клане</h2>

              <p className={styles.text}>
                CR0C — европейский клан с сильным командным духом. Мы объединяем
                игроков, которые хотят не просто играть, а побеждать. У нас нет
                случайных людей — только те, кто готов работать в команде и
                расти вместе.
              </p>

              <p className={styles.text}>
                Мы активно участвуем в маневрах и битвах Глобальной карты,
                выступаем на турнирах и постоянно совершенствуем нашу тактику.
                Каждый бой — это опыт, каждая победа — общая заслуга.
              </p>

              <p className={styles.text}>
                В нашем Discord всегда живо: обсуждаем тактики, разбираем бои,
                помогаем друг другу прокачиваться и просто хорошо проводим
                время. Мы не бросаем своих.
              </p>

              <div className={styles.features}>
                {[
                  { icon: "⚔️", label: "Маневры & ГК" },
                  { icon: "🏆", label: "Турниры" },
                  { icon: "🎙️", label: "Общение в Discord" },
                  { icon: "🤝", label: "Помогаем друг другу" },
                  { icon: "📅", label: "Играем 3 раза в неделю" },
                  { icon: "🌍", label: "Европейский клан" },
                ].map(({ icon, label }) => (
                  <div key={label} className={styles.feature}>
                    <span className={styles.featureIcon}>{icon}</span>
                    <span className={styles.featureLabel}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ТАНКИ С БЕКА */}
            <div className={styles.tanksBlock}>
              <div className={styles.tanksTitleRow}>
                <h2 className={styles.sectionTitle}>На чём играем</h2>

                <Link href="/tanks" className={styles.seeAllBtn}>
                  Увидеть все →
                </Link>
              </div>

              <div className={styles.tanksList}>
                {clanTanks.slice(0, 8).map((tank) => (
                  <div key={tank.tank_id} className={styles.tankCard}>
                    <span className={styles.tier}>Tier X</span>

                    <Image
                      src={tank.images.big_icon}
                      alt={tank.short_name}
                      width={80}
                      height={40}
                      className={styles.tankCardImg}
                    />

                    <div className={styles.tankInfo}>
                      <span className={styles.tankName}>{tank.short_name}</span>
                    </div>

                    <span className={styles.tankDot} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
