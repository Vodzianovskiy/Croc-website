"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  const router = useRouter();
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (count === 0) {
      router.push("/");
      return;
    }
    const timer = setTimeout(() => setCount((c) => c - 1), 1000);
    return () => clearTimeout(timer);
  }, [count, router]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.glitch} data-text="404">
        404
      </div>
      <h1 className={styles.title}>Страница не найдена</h1>
      <p className={styles.desc}>
        Этот сектор не существует или был уничтожен.
      </p>
      <p className={styles.countdown}>
        Возврат на базу через <span className={styles.countNum}>{count}</span>
        ...
      </p>
      <Link href="/" className={styles.btn}>
        ← Вернуться на базу
      </Link>
    </div>
  );
}
