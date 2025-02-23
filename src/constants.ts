import { UserDetailsType } from "./types";

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
};
