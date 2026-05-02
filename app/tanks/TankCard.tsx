"use client";

import { useState } from "react";
import Image from "next/image";
import { ClanTank, Provision, CrewSkill } from "@/types/clan";
import type { CrewBuild } from "@/types/crewBuild";
import { TankModal } from "./TankModal/TankModal";
import styles from "./tanks.module.css";

interface Props {
  tank: ClanTank;
  provisions: Provision[];
  consumables: Provision[];
  allSkills: Record<string, CrewSkill>;
  crewBuilds: CrewBuild[];
}

export function TankCard({
  tank,
  provisions,
  consumables,
  allSkills,
  crewBuilds,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={styles.card} onClick={() => setOpen(true)}>
        <div className={styles.cardImgWrap}>
          <Image
            src={tank.images.big_icon}
            alt={tank.short_name}
            width={200}
            height={100}
            className={styles.cardImg}
          />
        </div>
        <div className={styles.cardInfo}>
          <span className={styles.cardTier}>Tier X</span>
          <span className={styles.cardName}>{tank.short_name}</span>
        </div>
      </div>

      {open && (
        <TankModal
          tank={tank}
          provisions={provisions}
          consumables={consumables}
          allSkills={allSkills}
          crewBuilds={crewBuilds}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
}
