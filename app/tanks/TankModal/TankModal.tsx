"use client";

import Image from "next/image";
import { ClanTank, Provision, CrewSkill } from "@/types/clan";
import type { CrewBuild } from "@/types/crewBuild";

import styles from "./TankModal.module.css";
import { EquipmentSection } from "./sections/EquipmentTab";
import { ConsumablesSection } from "./sections/ConsumablesTab";
import { SkillsSection } from "./sections/SkillsTab";

interface Props {
  tank: ClanTank;
  provisions: Provision[];
  consumables: Provision[];
  allSkills: Record<string, CrewSkill>;
  crewBuilds: CrewBuild[];
  onClose: () => void;
}

export function TankModal({
  tank,
  provisions,
  consumables,
  allSkills,
  crewBuilds,
  onClose,
}: Props) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTankInfo}>
            <div className={styles.modalTankImgWrap}>
              <Image
                src={tank.images.big_icon}
                alt={tank.short_name}
                fill
                className={styles.modalTankImg}
                priority
              />
            </div>
            <div>
              <span className={styles.modalTier}>Tier X</span>
              <h2 className={styles.modalTitle}>{tank.short_name}</h2>
            </div>
          </div>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Закрыть"
          >
            ✕
          </button>
        </div>

        <div className={styles.modalBody}>
          <EquipmentSection provisions={provisions} />
          <ConsumablesSection consumables={consumables} />
          <SkillsSection
            allSkills={allSkills}
            crewBuilds={crewBuilds}
            tankId={tank.tank_id}
            tankCrew={tank.crew ?? []}
          />
        </div>
      </div>
    </div>
  );
}
