"use client";

import dynamic from "next/dynamic";

const HeroCrocScene = dynamic(() => import("./HeroCrocScene"), {
  ssr: false,
  loading: () => null,
});

export default function HeroCroc() {
  return <HeroCrocScene />;
}
