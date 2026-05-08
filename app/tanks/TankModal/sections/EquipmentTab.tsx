import Image from "next/image";
import { Provision } from "@/types/clan";
import styles from "../TankModal.module.css";

interface Props {
  provisions: Provision[];
}

export function EquipmentSection({ provisions }: Props) {
  return (
    <div className={styles.section}>
      <span className={styles.sectionLabel}>Equipment</span>

      {provisions.length > 0 ? (
        <div className={styles.slotGroup}>
          {provisions.map((prov, i) => (
            <div key={prov.provision_id} className={styles.slot}>
              {i > 0 && <div className={styles.slotDivider} />}
              <div className={styles.slotInner}>
                <Image
                  src={prov.image}
                  alt={prov.name}
                  width={60}
                  height={60}
                  className={styles.slotImg}
                />
                <span className={styles.tooltip}>{prov.name}</span>{" "}
                {/* ← ВНУТРИ slotInner! */}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Wip />
      )}
    </div>
  );
}

function Wip() {
  return (
    <div className={styles.wip}>
      <span className={styles.wipIcon}>🚧</span>
      <span className={styles.wipText}>Coming soon</span>
    </div>
  );
}
