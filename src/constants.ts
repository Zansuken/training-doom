import { UserDetailsType } from "@/types/user.type";

export type DaysOfWeek =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export const daysOfWeek: DaysOfWeek[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const defaultProfileValues: UserDetailsType = {
  birthDate: "",
  currentWeight: 0,
  height: 0,
  sex: "prefer not to say",
};
