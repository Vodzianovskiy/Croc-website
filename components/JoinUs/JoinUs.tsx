"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import styles from "./JoinUs.module.css";

const JoinUsModal = dynamic(() => import("./JoinUsModal"), {
  ssr: false,
  loading: () => null,
});

export default function JoinUs() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button className={styles.trigger} onClick={() => setIsOpen(true)}>
        Join the clan
      </button>

      {isOpen && <JoinUsModal onClose={() => setIsOpen(false)} />}
    </>
  );
}
