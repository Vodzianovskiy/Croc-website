export interface CrewBuildSkill {
  skill: string;
}

export interface CrewBuildMember {
  role: "commander" | "gunner" | "driver" | "loader" | "radioman";
  skills: string[];
}

export interface CrewBuild {
  tank_id: number;
  crew: CrewBuildMember[];
}
