"use client";

import { Canvas } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import styles from "./HeroCroc.module.css";

type ScreenType = "mobile" | "tablet" | "desktop" | "wide" | "ultra";

function getScreenType(width: number): ScreenType {
  if (width < 768) return "mobile";
  if (width < 1024) return "tablet";
  if (width < 1600) return "desktop";
  if (width < 2300) return "wide";
  return "ultra";
}

function getSettings(screen: ScreenType) {
  switch (screen) {
    case "mobile":
      return {
        scale: 1.22,
        position: [0, -1.02, 0] as [number, number, number],
        rotation: [0, Math.PI / 10, 0] as [number, number, number],
        camera: [0, 1.08, 7.2] as [number, number, number],
        fov: 36,
      };
    case "tablet":
      return {
        scale: 1.3,
        position: [0, -1.05, 0] as [number, number, number],
        rotation: [0, Math.PI / 14, 0] as [number, number, number],
        camera: [0, 1.12, 7.35] as [number, number, number],
        fov: 34,
      };
    case "desktop":
      return {
        scale: 1.42,
        position: [0, -1.08, 0] as [number, number, number],
        rotation: [0, -Math.PI / 18, 0] as [number, number, number],
        camera: [0, 1.18, 7.25] as [number, number, number],
        fov: 31,
      };
    case "wide":
      return {
        scale: 1.2,
        position: [0, -1.08, 0] as [number, number, number],
        rotation: [0, -Math.PI / 22, 0] as [number, number, number],
        camera: [0, 1.2, 7.6] as [number, number, number],
        fov: 30,
      };
    case "ultra":
      return {
        scale: 1.35,
        position: [0, -1.1, 0] as [number, number, number],
        rotation: [0, -Math.PI / 24, 0] as [number, number, number],
        camera: [0, 1.25, 7.8] as [number, number, number],
        fov: 30,
      };
  }
}

function CrocModel({ screen }: { screen: ScreenType }) {
  const group = useRef<THREE.Group>(null);
  const currentActionRef = useRef<THREE.AnimationAction | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const actionsRef = useRef<Record<string, THREE.AnimationAction | null>>({});

  const { scene, animations } = useGLTF("/croc_Animations.glb");
  const { actions } = useAnimations(animations, group);
  const settings = getSettings(screen);

  useEffect(() => {
    const normalized: Record<string, THREE.AnimationAction | null> = {};
    Object.entries(actions ?? {}).forEach(([key, value]) => {
      normalized[key] = value ?? null;
    });
    actionsRef.current = normalized;
  }, [actions]);

  useEffect(() => {
    scene.traverse((obj) => {
      if (!(obj instanceof THREE.Mesh)) return;
      obj.castShadow = true;
      obj.receiveShadow = true;
      obj.frustumCulled = false;
    });
  }, [scene]);

  useEffect(() => {
    if (!animations.length) return;

    const getAction = (name: string) => actionsRef.current[name] ?? null;

    const playAction = (
      name: string,
      options?: {
        fade?: number;
        loop?: THREE.AnimationActionLoopStyles;
        repetitions?: number;
        clampWhenFinished?: boolean;
      },
    ) => {
      const action = getAction(name);
      if (!action) return null;

      const fade = options?.fade ?? 0.45;
      const loop = options?.loop ?? THREE.LoopRepeat;
      const repetitions = options?.repetitions ?? Infinity;
      const clampWhenFinished = options?.clampWhenFinished ?? false;

      action.reset();
      action.enabled = true;
      action.setEffectiveTimeScale(1);
      action.setEffectiveWeight(1);
      action.setLoop(loop, repetitions);
      action.clampWhenFinished = clampWhenFinished;

      const current = currentActionRef.current;

      if (current && current !== action) {
        current.crossFadeTo(action, fade, true);
      } else {
        action.fadeIn(fade);
      }

      action.play();
      currentActionRef.current = action;
      return action;
    };

    const walkClips = ["Slow_Orc_Walk", "Unsteady_Walk"];
    const moveClips = ["Running", "RunFast"];
    const funClips = ["All_Night_Dance", "Skill_01", "Boxing_Practice"];

    const randomFrom = (list: string[]) =>
      list[Math.floor(Math.random() * list.length)];

    const queueNext = (delayMs: number, cb: () => void) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(cb, delayMs);
    };

    const playIdleCycle = () => {
      const next =
        Math.random() < 0.7 ? randomFrom(walkClips) : randomFrom(moveClips);

      const action = playAction(next, {
        fade: 0.5,
        loop: THREE.LoopRepeat,
        repetitions: Infinity,
        clampWhenFinished: false,
      });

      if (!action) return;

      const stayTime = next === "RunFast" || next === "Running" ? 3200 : 4200;

      queueNext(stayTime, () => {
        if (Math.random() < 0.4) {
          playSpecial();
        } else {
          playIdleCycle();
        }
      });
    };

    const playSpecial = () => {
      const next = randomFrom(funClips);

      const action = playAction(next, {
        fade: 0.55,
        loop: THREE.LoopOnce,
        repetitions: 1,
        clampWhenFinished: true,
      });

      if (!action) {
        playIdleCycle();
        return;
      }

      const clip = animations.find((a) => a.name === next);
      const duration = clip ? clip.duration : 2.5;

      queueNext(Math.max(1500, duration * 1000 - 150), () => {
        playIdleCycle();
      });
    };

    if (getAction("Waking")) {
      const wakeAction = playAction("Waking", {
        fade: 0.35,
        loop: THREE.LoopOnce,
        repetitions: 1,
        clampWhenFinished: true,
      });

      const wakeClip = animations.find((a) => a.name === "Waking");
      const wakeDuration = wakeClip ? wakeClip.duration : 2.5;

      if (wakeAction) {
        queueNext(Math.max(1200, wakeDuration * 1000 - 150), () => {
          playIdleCycle();
        });
      } else {
        playIdleCycle();
      }
    } else {
      playIdleCycle();
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      Object.values(actionsRef.current).forEach((action) => {
        action?.fadeOut(0.2);
      });
    };
  }, [animations]);

  return (
    <group
      ref={group}
      scale={settings.scale}
      position={settings.position}
      rotation={settings.rotation}
      dispose={null}
    >
      <primitive object={scene} />
    </group>
  );
}

useGLTF.preload("/croc_Animations.glb");

export default function HeroCrocScene() {
  const [screen, setScreen] = useState<ScreenType>("desktop");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const update = () => {
      setScreen(getScreenType(window.innerWidth));
      setReady(true);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const settings = getSettings(screen);

  if (!ready) return null;
  if (screen === "mobile") return null;

  return (
    <div className={styles.crocStage}>
      <div className={styles.crocBox}>
        <Canvas
          className={styles.canvas}
          dpr={[1, 1.5]}
          gl={{
            alpha: true,
            antialias: true,
            outputColorSpace: THREE.SRGBColorSpace,
            powerPreference: "high-performance",
          }}
          camera={{
            position: settings.camera,
            fov: settings.fov,
            near: 0.01,
            far: 100,
          }}
          onCreated={({ gl }) => {
            gl.outputColorSpace = THREE.SRGBColorSpace;
            gl.toneMapping = THREE.NoToneMapping;
          }}
        >
          <ambientLight intensity={1.5} color="#ffffff" />
          <directionalLight
            intensity={2}
            position={[5, 10, 7.5]}
            color="#ffffff"
          />
          <Suspense fallback={null}>
            <CrocModel screen={screen} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
