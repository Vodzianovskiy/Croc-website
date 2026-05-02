import type { CrewBuild } from "@/types/crewBuild";

// Шаблони по 6 перків для кожної ролі (загальні для всіх танків)
const COMMANDER_SKILLS = [
  "commander_sixthSense", // 1. Sixth Sense — обов'язковий
  "commander_eagleEye", // 2. Recon — збільшує обзор
  "brotherhood", // 3. Brothers in Arms — буст всьому екіпажу
  "repair", // 4. Repairs — швидкий ремонт
  "commander_coordination", // 5. Coordination — швидше наводка
  "commander_emergency", // 6. Emergency — буст ефективності екіпажу
];

const GUNNER_SKILLS = [
  "gunner_armorer", // 1. Armorer — зменшує пошкодження гармати
  "gunner_sniper", // 2. Deadeye — шанс критів в модулі
  "brotherhood", // 3. Brothers in Arms
  "repair", // 4. Repairs
  "gunner_smoothTurret", // 5. Snap Shot — менша дисперсія при повороті башти
  "gunner_quickAiming", // 6. Quick Aiming — швидше зведення
];

const DRIVER_SKILLS = [
  "driver_virtuoso", // 1. Clutch Braking — краще повороти
  "driver_smoothDriving", // 2. Smooth Ride — точність в русі
  "brotherhood", // 3. Brothers in Arms
  "repair", // 4. Repairs
  "driver_badRoadsKing", // 5. Off-Road Driving — бездоріжжя
  "driver_motorExpert", // 6. Engineer — менший штраф пошкодженого двигуна
];

const LOADER_SKILLS = [
  "loader_desperado", // 1. Adrenaline Rush — швидше заряджання при HP < 25%
  "loader_intuition", // 2. Intuition — швидка зміна типу снаряда
  "brotherhood", // 3. Brothers in Arms
  "repair", // 4. Repairs
  "loader_pedant", // 5. Safe Stowage — захист боєукладки
  "loader_ammunitionImprove", // 6. Ammo Tuning — більше дамагу і пробиття
];

const RADIOMAN_SKILLS = [
  "radioman_finder", // 1. Situational Awareness — збільшує обзор
  "radioman_interference", // 2. Jamming — зменшує час видимості
  "brotherhood", // 3. Brothers in Arms
  "repair", // 4. Repairs
  "radioman_sideBySide", // 5. Side By Side — покращена робота екіпажу
  "radioman_expert", // 6. Communications Expert — покращена робота екіпажу
];

export const crewBuilds: CrewBuild[] = [
  {
    tank_id: 7169, // ИС-7 — cmd, gun, drv, ldr(+radio), ldr
    crew: [
      { role: "commander", skills: COMMANDER_SKILLS },
      { role: "gunner", skills: GUNNER_SKILLS },
      { role: "driver", skills: DRIVER_SKILLS },
      { role: "loader", skills: LOADER_SKILLS }, // виконує роль radioman
      { role: "loader", skills: LOADER_SKILLS },
    ],
  },
  {
    tank_id: 6209, // cmd, gun(+ldr), drv, radio
    crew: [
      { role: "commander", skills: COMMANDER_SKILLS },
      { role: "gunner", skills: GUNNER_SKILLS },
      { role: "driver", skills: DRIVER_SKILLS },
      { role: "radioman", skills: RADIOMAN_SKILLS },
    ],
  },
  {
    tank_id: 22017, // cmd(+radio), drv, gun, ldr
    crew: [
      { role: "commander", skills: COMMANDER_SKILLS },
      { role: "driver", skills: DRIVER_SKILLS },
      { role: "gunner", skills: GUNNER_SKILLS },
      { role: "loader", skills: LOADER_SKILLS },
    ],
  },
  {
    tank_id: 5265, // cmd(+radio), gun, drv, ldr
    crew: [
      { role: "commander", skills: COMMANDER_SKILLS },
      { role: "gunner", skills: GUNNER_SKILLS },
      { role: "driver", skills: DRIVER_SKILLS },
      { role: "loader", skills: LOADER_SKILLS },
    ],
  },
  {
    tank_id: 9489, // cmd, gun, drv, radio, ldr, ldr
    crew: [
      { role: "commander", skills: COMMANDER_SKILLS },
      { role: "gunner", skills: GUNNER_SKILLS },
      { role: "driver", skills: DRIVER_SKILLS },
      { role: "radioman", skills: RADIOMAN_SKILLS },
      { role: "loader", skills: LOADER_SKILLS },
      { role: "loader", skills: LOADER_SKILLS },
    ],
  },
  {
    tank_id: 3937, // cmd, gun, drv, radio, ldr, ldr
    crew: [
      { role: "commander", skills: COMMANDER_SKILLS },
      { role: "gunner", skills: GUNNER_SKILLS },
      { role: "driver", skills: DRIVER_SKILLS },
      { role: "radioman", skills: RADIOMAN_SKILLS },
      { role: "loader", skills: LOADER_SKILLS },
      { role: "loader", skills: LOADER_SKILLS },
    ],
  },
  {
    tank_id: 58641, // cmd, gun, drv, radio, ldr
    crew: [
      { role: "commander", skills: COMMANDER_SKILLS },
      { role: "gunner", skills: GUNNER_SKILLS },
      { role: "driver", skills: DRIVER_SKILLS },
      { role: "radioman", skills: RADIOMAN_SKILLS },
      { role: "loader", skills: LOADER_SKILLS },
    ],
  },
  {
    tank_id: 7281, // cmd(+radio), gun, drv, ldr
    crew: [
      { role: "commander", skills: COMMANDER_SKILLS },
      { role: "gunner", skills: GUNNER_SKILLS },
      { role: "driver", skills: DRIVER_SKILLS },
      { role: "loader", skills: LOADER_SKILLS },
    ],
  },
  {
    tank_id: 57937, // cmd, drv, gun, ldr(+radio)
    crew: [
      { role: "commander", skills: COMMANDER_SKILLS },
      { role: "driver", skills: DRIVER_SKILLS },
      { role: "gunner", skills: GUNNER_SKILLS },
      { role: "loader", skills: LOADER_SKILLS },
    ],
  },
  {
    tank_id: 4737, // cmd, drv(+gun), radio(+ldr) — ТІЛЬКИ 3 ЧЛЕНИ
    crew: [
      { role: "commander", skills: COMMANDER_SKILLS },
      { role: "driver", skills: DRIVER_SKILLS },
      { role: "radioman", skills: RADIOMAN_SKILLS },
    ],
  },
  {
    tank_id: 46849, // cmd(+radio), gun, drv, ldr
    crew: [
      { role: "commander", skills: COMMANDER_SKILLS },
      { role: "gunner", skills: GUNNER_SKILLS },
      { role: "driver", skills: DRIVER_SKILLS },
      { role: "loader", skills: LOADER_SKILLS },
    ],
  },
  {
    tank_id: 9009, // cmd(+radio), drv, gun, ldr
    crew: [
      { role: "commander", skills: COMMANDER_SKILLS },
      { role: "driver", skills: DRIVER_SKILLS },
      { role: "gunner", skills: GUNNER_SKILLS },
      { role: "loader", skills: LOADER_SKILLS },
    ],
  },
  {
    tank_id: 19009, // cmd(+ldr), gun, drv, radio
    crew: [
      { role: "commander", skills: COMMANDER_SKILLS },
      { role: "gunner", skills: GUNNER_SKILLS },
      { role: "driver", skills: DRIVER_SKILLS },
      { role: "radioman", skills: RADIOMAN_SKILLS },
    ],
  },
];
