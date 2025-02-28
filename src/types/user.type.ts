export type UserDetailsType = {
  birthDate: string;
  currentWeight: number;
  height: number;
  sex: "male" | "female" | "other" | "prefer not to say";
  id?: string;
  nickname?: string;
};
