import Link from "next/link";
import {
  getClanTanks,
  getProvisions,
  getCrewSkills,
} from "@/services/clanService";
import { TANK_EQUIPMENT, TANK_CONSUMABLES } from "@/config/tankEquipment";
import styles from "./tanks.module.css";
import { TankCard } from "./TankCard";
import { crewBuilds } from "../../config/crewBuilds";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Clan Tanks",
  description:
    "Explore all vehicles used by the CR0C clan in World of Tanks, including tank setups, consumables, provisions, and crew builds.",
  alternates: {
    canonical: "/tanks",
  },
  openGraph: {
    title: "Clan Tanks | CR0C Clan Portal",
    description:
      "Browse all tanks played by the CR0C clan, with vehicle setups, consumables, provisions, and crew builds.",
    url: "/tanks",
    type: "website",
    siteName: "CR0C Clan Portal",
    images: [
      {
        url: "/croc.jpg",
        width: 1200,
        height: 630,
        alt: "Clan Tanks | CR0C Clan Portal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Clan Tanks | CR0C Clan Portal",
    description:
      "All tanks used by the CR0C clan in World of Tanks, including builds and equipment.",
    images: ["/croc.jpg"],
  },
};

export default async function TanksPage() {
  const [tanks, provisions, allSkills] = await Promise.all([
    getClanTanks(),
    getProvisions(),
    getCrewSkills(),
  ]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <Link href="/" className={styles.back}>
            ← Назад
          </Link>
          <div className={styles.titleBlock}>
            <h1 className={styles.title}>Техника клана</h1>
            <p className={styles.sub}>
              Вся техника на которой играет CR
              <span className={styles.zero}>0</span>C
            </p>
          </div>
        </div>

        <div className={styles.grid}>
          {tanks.map((tank) => {
            const tankProvisionIds = TANK_EQUIPMENT[tank.tank_id] ?? [];
            const tankConsumableIds = TANK_CONSUMABLES[tank.tank_id] ?? [];

            const tankProvisions = provisions.filter((p) =>
              tankProvisionIds.includes(p.provision_id),
            );

            const tankConsumables = provisions.filter((p) =>
              tankConsumableIds.includes(p.provision_id),
            );

            return (
              <TankCard
                key={tank.tank_id}
                tank={tank}
                provisions={tankProvisions}
                consumables={tankConsumables}
                crewBuilds={crewBuilds}
                allSkills={allSkills}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
