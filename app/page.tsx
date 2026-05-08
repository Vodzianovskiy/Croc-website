import JoinUs from "../components/JoinUs/JoinUs";
import { getClanTanks } from "@/services/clanService";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import HeroCroc from "../components/HeroCroc/HeroCroc";
import { Fragment } from "react";
import type { Metadata } from "next";
import { LINKS } from "@/config/links";
import ClanStatsClick from "../components/ClanStatsClick/ClanStatsClick";

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
          {/* Left side */}
          <div className={styles.heroContent}>
            <span className={styles.tag}>🌍 European Clan · WoT</span>

            <h1 className={styles.heroTitle}>
              CR<span className={styles.zero}>0</span>C
            </h1>

            <p className={styles.heroSub}>
              We&apos;re not just a clan — we&apos;re a team. Discipline,
              tactics, and victories on all fronts. Global Map, tournaments,
              Maneuvers — every battle with us.
            </p>

            <div className={styles.heroBtns}>
              <Link href="/mods-preview" className={styles.modsBtn}>
                📥 Download mods
              </Link>

              <JoinUs />

              <a
                href={LINKS.discord}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.discordBtn}
              >
                Discord →
              </a>
            </div>
          </div>

          {/* Right side */}
          <div className={styles.heroImageWrap}>
            <HeroCroc />
          </div>
        </div>

        {/* Clan stats */}
        <div className={styles.heroStats}>
          {[
            { num: "100+", label: "Players" },
            { num: "3×", label: "Sessions per week" },
            { num: "X lvl", label: "Vehicles" },
            { num: "GM", label: "Global Map" },
            { num: "⚔️", label: "Maneuvers" },
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
            {/* ABOUT */}
            <div className={styles.aboutBlock}>
              <h2 className={styles.sectionTitle}>About the clan</h2>

              <p className={styles.text}>
                CR0C is a European clan with a strong team spirit. We bring
                together players who don&apos;t just want to play — they want to
                win. We have no randoms — only those ready to work as a team and
                grow together.
              </p>

              <p className={styles.text}>
                We actively participate in Maneuvers and Global Map battles,
                compete in tournaments, and constantly improve our tactics.
                Every battle is experience, every victory is a shared
                achievement.
              </p>

              <p className={styles.text}>
                Our Discord is always lively: we discuss tactics, analyze
                battles, help each other improve, and just have a good time. We
                don&apos;t abandon our own.
              </p>

              <ClanStatsClick />
            </div>

            {/* TANKS */}
            <div className={styles.tanksBlock}>
              <div className={styles.tanksTitleRow}>
                <h2 className={styles.sectionTitle}>What we play on</h2>

                <Link href="/tanks" className={styles.seeAllBtn}>
                  See all →
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
