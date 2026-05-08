import Image from "next/image";
import { Provision } from "@/types/clan";
import styles from "../TankModal.module.css";

interface Props {
  consumables: Provision[];
}

export function ConsumablesSection({ consumables }: Props) {
  return (
    <div className={styles.section}>
      <span className={styles.sectionLabel}>Consumables</span>

      {consumables.length > 0 ? (
        <div className={styles.slotGroup}>
          {consumables.map((cons, i) => (
            <div key={cons.provision_id} className={styles.slot}>
              {i > 0 && <div className={styles.slotDivider} />}
              <div className={styles.slotInner}>
                <Image
                  src={cons.image}
                  alt={cons.name}
                  width={60}
                  height={60}
                  className={styles.slotImg}
                />
                <span className={styles.tooltip}>{cons.name}</span>
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
