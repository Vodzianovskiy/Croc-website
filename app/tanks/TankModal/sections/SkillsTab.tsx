import { CrewSkill } from "@/types/clan";
import type { CrewBuild } from "@/types/crewBuild";
import styles from "../TankModal.module.css";
import Image from "next/image";

interface Props {
  allSkills: Record<string, CrewSkill>;
  crewBuilds: CrewBuild[];
  tankId: number;
  tankCrew: { member_id: string }[];
}

const ROLE_LABELS: Record<string, string> = {
  commander: "Командир",
  gunner: "Наводчик",
  driver: "Механик-водитель",
  loader: "Заряжающий",
  radioman: "Радист",
};

export function SkillsSection({
  allSkills,
  crewBuilds,
  tankId,
  tankCrew,
}: Props) {
  const build = crewBuilds.find((b) => b.tank_id === tankId);
  const roles = (tankCrew ?? []).map((m) => m.member_id);

  if (roles.length === 0) {
    return (
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Перки экипажа</span>
        <div className={styles.wip}>
          <span className={styles.wipIcon}>🚧</span>
          <span className={styles.wipText}>В скором времени добавим</span>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.section}>
      <span className={styles.sectionLabel}>Перки экипажа</span>
      <div className={styles.crewList}>
        {roles.map((role, index) => {
          const roleCountBefore = roles
            .slice(0, index)
            .filter((r) => r === role).length;
          const membersWithRole =
            build?.crew.filter((c) => c.role === role) ?? [];
          const member = membersWithRole[roleCountBefore];
          const skillList = (member?.skills ?? [])
            .map((key) => allSkills[key])
            .filter(Boolean);

          const uniqueKey = `${role}-${roleCountBefore}`;
          const roleLabel =
            role === "loader" && roleCountBefore > 0
              ? "Заряжающий 2"
              : (ROLE_LABELS[role] ?? role);

          return (
            <div key={uniqueKey} className={styles.crewMember}>
              <span className={styles.crewRole}>{roleLabel}</span>
              {skillList.length > 0 ? (
                <div className={styles.skillsSlotGroup}>
                  {skillList.map((skill, i) => (
                    <div key={skill.skill} className={styles.skillsSlot}>
                      {i > 0 && <div className={styles.skillsSlotDivider} />}
                      <div className={styles.skillsSlotInner}>
                        <Image
                          src={skill.image_url.big_icon}
                          alt={skill.name}
                          width={24}
                          height={24}
                          className={styles.skillsSlotImg}
                        />
                        <span className={styles.tooltip}>{skill.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.wip}>
                  <span className={styles.wipIcon}>🚧</span>
                  <span className={styles.wipText}>скоро</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
