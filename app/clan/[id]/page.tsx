import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getClanInfo,
  getClanRating,
  getClanWgUrl,
  getClanStrongholdInfo,
} from "@/services/clanService";
import styles from "./clan-detail.module.css";
import type { ClanMember } from "@/types/clan";

import ClanTabs from "./_components/ClanTabs";
import ClanOverviewTab from "./_components/ClanOverviewTab";
import ClanPlayersTab from "./_components/ClanPlayersTab";
import ClanStrongholdTab from "./_components/ClanStrongholdTab";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const clanId = Number(id);

  if (!Number.isInteger(clanId) || clanId <= 0) {
    return {
      title: "Clan not found | CR0C Clan Portal",
      description:
        "Requested World of Tanks clan was not found. Check the clan ID or search again in the CR0C Clan Portal.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const clan = await getClanInfo(clanId).catch(() => null);

  if (!clan) {
    return {
      title: "Clan not found | CR0C Clan Portal",
      description:
        "Requested World of Tanks clan was not found or WG API returned an error.",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const baseTitle = `[${clan.tag}] ${clan.name}`;
  const description =
    clan.description?.trim() ||
    `Statistics and overview for World of Tanks clan [${clan.tag}] ${clan.name}: members, activity, stronghold data and more.`;

  return {
    title: baseTitle,
    description,
    alternates: {
      canonical: `/clan/${clanId}`,
    },
    openGraph: {
      title: baseTitle,
      description,
      url: `/clan/${clanId}`,
      type: "website",
      siteName: "CR0C Clan Portal",
      images: [
        {
          url: "/croc.jpg",
          width: 1200,
          height: 630,
          alt: `${baseTitle} | CR0C Clan Portal`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${baseTitle} | CR0C Clan Portal`,
      description,
      images: ["/croc.jpg"],
    },
  };
}

function formatDate(unix: number) {
  return new Date(unix * 1000).toLocaleDateString("ru-RU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function ClanDetailPage({ params }: Props) {
  const { id } = await params;
  const clanId = Number(id);

  if (!Number.isInteger(clanId) || clanId <= 0) {
    notFound();
  }

  const clan = await getClanInfo(clanId).catch(() => null);

  if (!clan) {
    notFound();
  }

  const [rating, stronghold] = await Promise.all([
    getClanRating(clanId),
    getClanStrongholdInfo(clanId),
  ]);

  const membersArray: ClanMember[] = Object.values(clan.members ?? {});
  const emblem = clan.emblems?.x195?.portal ?? clan.emblems?.x64?.portal;
  const wgUrl = getClanWgUrl(clanId);

  return (
    <div className={styles.page}>
      <div className={styles.pageInner}>
        <div className={styles.cardHeaderRow}>
          <Link href="/clan" className={styles.backChip}>
            ← Back to list
          </Link>
        </div>

        <div className={styles.headerCard}>
          {emblem ? (
            <Image
              src={emblem}
              alt={clan.tag}
              width={80}
              height={80}
              className={styles.emblem}
              unoptimized
            />
          ) : (
            <div className={styles.emblemPlaceholder}>🐊</div>
          )}

          <div className={styles.headerInfo}>
            <div className={styles.nameRow}>
              <span className={styles.cardTag}>[{clan.tag}]</span>
              <h1 className={styles.name}>{clan.name}</h1>
            </div>

            <div className={styles.metaRow}>
              <span>👑 {clan.leader_name}</span>
              <span className={styles.metaSep} />
              <span>👥 {clan.members_count} members</span>

              <span className={styles.metaSep} />
              <span>📅 {formatDate(clan.created_at)}</span>
            </div>

            <div>
              <span
                className={`${styles.recruitStatus} ${
                  clan.accepts_join_requests
                    ? styles.recruitOpen
                    : styles.recruitClosed
                }`}
              >
                {clan.accepts_join_requests
                  ? "✅ Recruitment open"
                  : "🔒 Recruitment closed"}
              </span>
            </div>

            {clan.motto ? (
              <p className={styles.motto}>&ldquo;{clan.motto}&rdquo;</p>
            ) : null}
          </div>

          <a
            href={wgUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.wgBtnTop}
          >
            🌐 WG Profile
          </a>
        </div>

        <ClanTabs
          overview={
            <ClanOverviewTab rating={rating} description={clan.description} />
          }
          players={<ClanPlayersTab members={membersArray} />}
          stronghold={<ClanStrongholdTab stronghold={stronghold} />}
        />
      </div>
    </div>
  );
}
